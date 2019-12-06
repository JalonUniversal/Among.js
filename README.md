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

// save key-value
among.save('name', 'judas');

// get value by key
among.get('name');  // judas

// update value by key
among.update('name', 'kevin');
among.get('name'); // kevin

// remove data by key
among.remove('name');
among.get('name'); // undefined
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
```

## Origin
And why did this library called Among.js? Because the data has encrypted in storage, any one or program cannot 
get data easily, like hide among them, so it is the origin for this library...