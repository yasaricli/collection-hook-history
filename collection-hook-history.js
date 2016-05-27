class Filters {
  today() {
    const date = moment().hour(0).minute(0).second(0).toDate();
    return {
      createdAt: {
        $gt: date
      }
    }
  }
}

class CollectionHistory {
  constructor() {
    this.collection = new Mongo.Collection('collection-hook-history');

    // Attach behaviour with the default options
    this.collection.attachBehaviour('timestampable');

    // SCHEMA
    this.collection.attachSchema(new SimpleSchema({
      collection: { type: String },
            type: { type: String },
             doc: { type: Object, blackbox: true } }));

    // COLLECTION HELPERS
    this.collection.helpers({
      user() {
        return Users.findOne(this.createdBy);
      },

      getCollection() {
        return Mongo.Collection.get(this.collection);
      }
    });

    // Fılters
    this.filters = new Filters();
  }

  allow(options) {
    this.collection.allow(options);
  }

  attachCollection(collection) {
    if (Meteor.isServer) {

      // HOOK INSERT AFTER
      collection.after.insert((userId, doc) => {
        this.insert(collection._name, 'insert', doc, userId);
      });

      // HOOK REMOVE AFTER
      collection.after.remove((userId, doc) => {
        this.insert(collection._name, 'remove', doc, userId);
      });

      // HOOK UPDATE AFTER
      collection.after.update((userId, doc, fieldNames, modifier, options) => {
        this.insert(collection._name, _.first(_.keys(modifier)), doc, userId);
      });
    }
  }

  insert(collection, type, doc, userId) {
    return this.collection.insert({
      userId,
      collection,
      type,
      doc
    });
  }
}

// Package export variable
CollectionHookHistory = new CollectionHistory();
