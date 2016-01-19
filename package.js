Package.describe({
  name: 'yasaricli:collection-hook-history',
  version: '0.0.1',
  summary: 'Meteor package Collection (Insert, Remove, Update) Histories',
  git: 'https://github.com/yasaricli/collection-hook-history.git',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');

  // Meteor-provided packages
  api.use([
    'ecmascript',
    'mongo'
  ]);

  // Third-party package dependencies
  api.use([
    'aldeed:collection2@2.8.0',
    'matb33:collection-hooks@0.8.1',
    'dburles:collection-helpers@1.0.4',
    'dburles:mongo-collection-instances@0.3.5',
    'zimme:collection-timestampable@1.0.9'
  ]);

  // HOOK FILE
  api.addFiles('collection-hook-history.js');

  // EXPORT
  api.export('CollectionHookHistory');
});
