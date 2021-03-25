### See it in action

You can test out this extension right away:

1.  Go to the [Cloud Firestore tab](https://console.firebase.google.com/project/${param:PROJECT_ID}/database/firestore/data).

1.  If it doesn't exist already, create a collection called `${param:COLLECTION_PATH}`.

1.  Create, update, or delete a document in the `${param:COLLECTION_PATH}` collection.  Go to Algolia's dashboard and verify in Algolia that a record is created, updated, or deleted in the `${param.ALGOLIA_INDEX_NAME}` index for application id `${param.ALGOLIA_APP_ID}`.

### Backfilling

### Using the extension

This extension listens to the Cloud Firestore collection `${param:COLLECTION_PATH}`. If you create, update, or delete a document within that collection, this extension:

- Indexes the document and send all the fields or fields configured to be indexed in the extension.
- or, removes the record from Algolia index if the document is deleted.

### _(Optional)_ Import existing documents
This extension only sends the content of documents that have been changed -- it does not export your full dataset of existing documents into Algolia. In order to backfill your Algolia `${param.ALGOLIA_INDEX_NAME}` Index with all the documents in your collection, you can run the import script provided by this extension.

The import script can read all existing documents in a Cloud Firestore collection and insert them into your Algolia `${param.ALGOLIA_INDEX_NAME}` index.

**Important:** Run the import script over the entire collection after installing this extension, otherwise all writes to your database during the import might be lost.

Learn more about using the import script to [backfill your existing collection](./guides/IMPORT_EXISTING_DOCUMENTS.md).

### Monitoring

As a best practice, you can [monitor the activity](https://firebase.google.com/docs/extensions/manage-installed-extensions#monitor) of your installed extension, including checks on its health, usage, and logs.