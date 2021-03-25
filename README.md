# Search with Algolia

**Author**: Algolia (**[https://www.algolia.com](https://www.algolia.com)**)

**Description**: Index documents in Cloud Firestore for Algolia full-text search

---

## 🧩 Install this experimental extension

> ⚠️ **Experimental**: This extension is available for testing as an _experimental_ release. It has not been as thoroughly tested as the officially released extensions, and future updates might introduce breaking changes. If you use this extension, please [report bugs and make feature requests](https://github.com/firebase/experimental-extensions/issues/new/choose) in our GitHub repository.

### Console

[![Install this extension in your Firebase project](../install-extension.png?raw=true "Install this extension in your Firebase project")](https://console.firebase.google.com/project/_/extensions/install?sourceName=projects/firestore-algolia-search/sources/??)

### Firebase CLI

```bash
firebase ext:install firestore-algolia-search --project=<your-project-id>
```

> Learn more about installing extensions in the Firebase Extensions documentation: [console](https://firebase.google.com/docs/extensions/install-extensions?platform=console), [CLI](https://firebase.google.com/docs/extensions/install-extensions?platform=cli)

---

**Details**: 

Use this extension to index your Cloud Firestore collection.  The extension is applied and configured to one collection at a time.

This extension listens to your specified Cloud Firestore collection. If a document is added, updated, deleted in a specified collection, this
extension will:

- Add/Update - document will be indexed into Algolia using the configuration defined for the extension.  The document Id will be used as the object id in Algolia.
- Delete - document will be removed from the index by using the document id.

#### Additional setup

Before installing this extension, make sure that you've
[set up a Cloud Firestore database](https://firebase.google.com/docs/firestore/quickstart)
in your Firebase project.

You must also have an Algolia account set up before installing this
extension. You can do so on the [Algolia][algolia] site.

[algolia]: https://www.algolia.com/

#### Billing

To install an extension, your project must be on the
[Blaze (pay as you go) plan][blaze-pricing].

- You will be charged [around $0.01 per month][pricing-examples] for each
  instance of this extension you install.
- This extension uses other Firebase and Google Cloud Platform services,
  which have associated charges if you exceed the service's free tier:
    - Cloud Functions (Node.js 10+ runtime. [See FAQs][faq].)
    - Cloud Firestore

[blaze-pricing]: https://firebase.google.com/pricing
[pricing-examples]: https://cloud.google.com/functions/pricing#pricing_examples
[faq]: https://firebase.google.com/support/faq#expandable-24

**Configuration Parameters:**

- Cloud Functions Location: Where do you want to deploy the functions created for this extension? You usually want a location close to your database. For help selecting a location, refer to the [location selection guide](https://firebase.google.com/docs/functions/locations).

- Collection Path: What is the path to the collection that you want to index?

- Fields: What fields in the document do you want to index to Algolia?  

**NOTE:** This configuration can be left empty if you want to index all the fields in this document.

- Algolia Application ID: What is the application id in Algolia that contains the index?

- Algolia API Key: What is the API key with addObject, deleteObject, listIndexes, deleteIndex, editSettings, and settings permissions.

- Algolia Index Name: What is the index that will store the index records for the collection documents.

**Cloud Functions:**

- **executeIndexOperation:** Listens for create, update, and delete trigger on documents in your specified Cloud Firestore collection.

