import Realm from 'realm';

export const HEART_QUEUE_SCHEMA = 'HeartQueue';

export const HeartQueueSchema = {
  name: HEART_QUEUE_SCHEMA,
  primaryKey: 'id',
  properties: {
    id: 'int', // primary key
    requestTime: {type: 'string', indexed: true},
  },
};

const databaseOptions = {
  path: 'mizWord.realm',
  schema: [HeartQueueSchema],
  schemaVersion: 0,
};

export const insertToHeartQueue = item =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          realm.create(HEART_QUEUE_SCHEMA, item);
        });
        resolve(item);
      })
      .catch(error => reject(error));
  });

export const updateHeartQueue = item =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          let updatingRow = realm.objectForPrimaryKey(
            HEART_QUEUE_SCHEMA,
            item.id,
          );
          updatingRow.requestTime = 'hello world';
        });
        resolve();
      })
      .catch(error => reject(error));
  });

export const deleteHeartQueue = itemID =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          let updatingRow = realm.objectForPrimaryKey(
            HEART_QUEUE_SCHEMA,
            itemID,
          );
          realm.delete(updatingRow);
        });
        resolve();
      })
      .catch(error => reject(error));
  });

export const deleteAllHeartQueue = () =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          let updatingRows = realm.objects(HEART_QUEUE_SCHEMA);
          realm.delete(updatingRows);
        });
        resolve();
      })
      .catch(error => reject(error));
  });

export const getAllHeartQueue = () =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        let allHeartsList = realm.objects(HEART_QUEUE_SCHEMA);
        resolve(allHeartsList);
      })
      .catch(error => reject(error));
  });

export default new Realm(databaseOptions);
