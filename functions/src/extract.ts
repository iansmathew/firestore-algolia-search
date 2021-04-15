'use strict';
/*
 * Copyright 2021 Algolia
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { logger } from 'firebase-functions';
import { DocumentSnapshot } from 'firebase-functions/lib/providers/firestore';

import config from './config';
import * as logs from './logs';
import { getObjectSizeInBytes } from './util';

const PAYLOAD_TOO_LARGE_ERR_MSG = 'Record is too large.';
const trim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
const getFields = () => config.fields ? config.fields.split(',') : [];

type Payload = {
  [key: string]: boolean | string | number;
};
const getPayload = (snapshot: DocumentSnapshot) => {
  const payload: Payload = {
    objectID: snapshot.id,
  };

  const fields = getFields();
  if (fields.length === 0) {
    return {
      ...snapshot.data(),
      ...payload,
    };
  }

  // Fields have been defined by user.  Start pulling data from the document to create payload
  // to send to Algolia.
  fields.forEach(item => {
    const field = item.replace(trim, '');
    const value = snapshot.get(field);

    if (value !== null) {
      payload[field] = value;
    } else {
      logs.fieldNotExist(field);
    }
  });

  return payload;
};

const splitPayload = (payload: Payload, numTimesToSplitRecord: number) => {
  const value = payload[config.recordPropertyForSplitting];
  logger.info(payload, value);
  if (typeof value === 'string') {
    const splitNumber = value.length / numTimesToSplitRecord;
    const results = [];
    for (let i = 0; i < splitNumber; i++) {
      const start = i * splitNumber;
      let end = splitNumber * (i + 1);
      if (end > value.length) {
        end = value.length;
      }
      logger.info(start, end, value.substr(start,  end));
      results.push({
        ...payload,
        'objectID': `${payload.objectID}-${i}`,
        [config.recordPropertyForSplitting]: value.substr(start, end),
      });
    }
    return results;
  }
  // if (getObjectSizeInBytes(value) < config.recordSizeLimit) {
  //
  // }
  return [payload];
};

export default function extract(snapshot: DocumentSnapshot): object {
  // Check payload size and make sure its within limits before sending for indexing
  const payload = getPayload(snapshot);
  const payloadSize = getObjectSizeInBytes(payload);
  if (payloadSize < config.recordSizeLimit) {
    return payload;
  } else {
    // TODO: Clean out existing record before creating new ones.
    // break the specified property to create multiple records
    const numTimesToSplitRecord = Math.floor(payloadSize / config.recordSizeLimit) + 1;
    return splitPayload(payload, numTimesToSplitRecord);
    // throw new Error(PAYLOAD_TOO_LARGE_ERR_MSG);
  }
}
