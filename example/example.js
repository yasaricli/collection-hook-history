Books = new Mongo.Collection('books');

// attachCollection
CollectionHookHistory.attachCollection(Books);

if (Meteor.isClient) {
  
  Template.books.helpers({
    books() {
      return Books.find();
    }
  });

  Template.books.events({
    'submit #BookForm'(event, template) {
      event.preventDefault();

      Books.insert({
        name: template.find('#name').value
      });
    },

    'click .remove'(event) {
      event.preventDefault();
      return Books.remove(this._id);
    }
  });

  Template.histories.helpers({
    books() {
      return Books.find();
    },

    histories() {
      return CollectionHookHistory.collection.find();
    }
  });
}
