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

      collection() {
        return Mongo.Collection.get(this.collection);
      }
    });
  }

  allow(options) {
    this.collection.allow(options);
  }

  attachCollection(collection) {
    if (Meteor.isServer) {
      collection.after.insert((userId, doc) => this.insert(collection._name, 'insert', doc));
      collection.after.remove((userId, doc) => this.insert(collection._name, 'remove', doc));
    }
  }

  insert(collection, type, doc) {
    return this.collection.insert({ collection, type, doc });
  }
}

// Package export variable
CollectionHookHistory = new CollectionHistory();
