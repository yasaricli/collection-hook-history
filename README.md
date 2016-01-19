# collection-hook-history
Meteor package Collection (Insert, Remove, Update) Histories.


## Installation

```sh
$ meteor add yasaricli:collection-hook-history
```

## Usage Example

```js
Books = new Mongo.Collection('books');

// attachCollection
CollectionHookHistory.attachCollection(Books); // insert, remove and update($set, $push, $pull)
```

Allow users to write directly to this Histories collection from client code, subject to limitations you define.

```js
  CollectionHookHistory.allow({
    insert() {},
    update() {},
    remove() {}
  });
```
