# Among.js
## Data Center of Website
## Features

- Mange data in LocalStorage or SessionStorage like Database
- Supply very easy APIs to mange your data
- Protect Data in Storage, encryption using with Base64 or AES/CES technology
- Saving Object/Array without JSON.stringify API, You can get your data without JSON.parse API automatically As well, 
- Lock important data with a custom password

## Installing

Using npm:

```bash
$ npm install among-store --save
```

Using yarn:

```bash
$ yarn add among-store
```

Using cdn:

```html
<script src="https://unpkg.com/among-store@1.3.0/build/bundle.js"></script>
```

## Example
4 APIs are very easy to handle

```js
import among from 'among-store';

// storage data format as key-value with set API
among.set('name', 'judas');

// load data by key with get API
among.get('name');  // judas

// change value by key with update API
among.update('name', 'kevin');
among.get('name'); // kevin

// delete data by key with remove API
among.remove('name');
among.get('name'); // undefined
```

## Further more
```js
// not only can among save key-value, it can also save object-object
among.save({ type: 'special' }, { list: [{ name: 'book', cost: 12 }, { name: 'phone', cost: 4000 }]});
among.get({ type: 'special' }); 
// ensure your key is the same object-string, now you can get the object saved before;
// { list: [{ name: 'book', cost: 12 }, { name: 'phone', cost: 4000 }]}
```

## Advanced

```js
import among from 'among-store';

// switch localStorage or sessionStorage to mange data
among.changeDefaultStorager('sessionStorage');
// now using sessionStorage to mange your data

among.changeDefaultStorager('localStorage');
// now using localStorage to mange your data

// set a key to lock data, prevent remove operation
among.setAmongKey('1087967');
among.clear(); // error: supply a among key to clear all data
among.clear('1087967'); // true, and all data has been removed

// get all data in storage
among.getAll(); // ... all data show here

// please notice that your data is storaged with base64 encryption by default,
// so if you do not want to save data with encryption, using the closeEncoding API

among.closeEncoding();
among.set('example', 'hello');
among.get('example'); // 'hello'
```

## Origin
And why did this library called Among.js? Because the data has encrypted in storage, any one or program cannot 
get data easily, like hide among them, so it is the origin for this library...