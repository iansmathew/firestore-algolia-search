The `fs-algolia-import-collection` script is for use with the official Firebase Extension [**Search with Algolia**](https://github.com/firebase/extensions/tree/master/algolia-firebase-extension).

### Overview

The import script (`fs-algolia-import-collection`) can read all existing documents in a Cloud Firestore collection and insert them into your Algolia `${param.ALGOLIA_INDEX_NAME}` index.

#### Important notes

- You must run the import script over the entire collection **_after_** installing the Search with Algolia extension; otherwise you will having missing records in your Algolia `${param.ALGOLIA_INDEX_NAME}` index.

- The import script can take up to _O(collection size)_ time to finish.

### Run the script

The import script uses several values from your installation of the extension:
- Cloud Functions Location: Where do you want to deploy the functions created for this extension? You usually want a location close to your database. For help selecting a location, refer to the [location selection guide](https://firebase.google.com/docs/functions/locations).

- Collection Path: What is the path to the collection that you want to index?

- Fields: What fields in the document do you want to index to Algolia?

**NOTE:** This configuration can be left empty if you want to index all the fields in this document.

- Algolia Application ID: What is the application id in Algolia that contains the index?

- Algolia API Key: What is the API key with addObject, deleteObject, listIndexes, deleteIndex, editSettings, and settings permissions.

- Algolia Index Name: What is the index that will store the index records for the collection documents.
  
- `${PROJECT_ID}`: the project ID for the Firebase project in which you installed the extension
- `${COLLECTION_PATH}`: the collection path that you specified during extension installation
- `${FIELDS}`: the fields to send to the index.  If no fields are defined, all the document fields will be sent to Algolia.
- `${ALGOLIA_APP_ID}`: the Algolia Application Id
- `${ALGOLIA_API_KEY}`: the API key to use to manage your index records
- `${ALGOLIA_INDEX_NAME}`: the index to send the collection documents.

Run the import script using [`npx` (the Node Package Runner)](https://www.npmjs.com/package/npx) via `npm` (the Node Package Manager).

1.  Make sure that you've installed the required tools to run the import script:

    - To access the `npm` command tools, you need to install [Node.js](https://www.nodejs.org/).
    - If you use `npm` v5.1 or earlier, you need to explicitly install `npx`. Run `npm install --global npx`.

1.  Set up credentials. The import script uses Application Default Credentials to communicate with Firebase.

    One way to set up these credentials is to run the following command using the [gcloud CLI](https://cloud.google.com/sdk/gcloud/):

    ```shell
    gcloud auth application-default login
    ```
    
1.  Run the import script interactively via `npx` by running the following command:

    ```
    npx @firebaseextensions/fs-algolia-import-collection
    ```

    **Note**: The script can be run non-interactively. To see its usage, run the above command with `--help`.