#!/usr/bin/env node

import * as firebase from "firebase-admin";

const FIRESTORE_VALID_CHARACTERS = /^[^\/]+$/;
const FIRESTORE_COLLECTION_NAME_MAX_CHARS = 6144;
const FIRESTORE_DEFAULT_DATABASE = "(default)";


