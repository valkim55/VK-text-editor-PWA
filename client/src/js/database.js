import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
    //console.error('putDb not implemented');

    // create a connection to the indexedDB and version you need
    const jateDB = await openDB('jate', 1);
    // create a new transaction and specify the store and data privilege
    const tx = jateDB.transaction('jate', 'readwrite');
    // open the desired object store
    const store = tx.objectStore('jate');
    // use ADD method to add the content
    const request = store.add({content});
    const result = await request;
    console.log('content was added to the database', result);

};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
    //console.error('getDb not implemented')

    // create a connection with database and version you need
    const jateDB = await openDB('jate', 1);
    //create a new transaction with store and data privilege
    const tx = jateDB.transaction('jate', 'readonly');
    // open the object store
    const store = tx.objectStore('jate');
    // use get method to read the content
    const request = store.getAll();
    const result = await request;
    console.log('result.value', result);
    return result;

};

initdb();
