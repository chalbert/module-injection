# Module Injection

Module Injection is a proof-of-concept for a new approach to building Single Page Apps (SPA). SPA are great, but the classic approach creates a disconnect between the server and the client, and introduces huge amount of unnecessary complexity for the client. This approach tries to address this.

## How to run this experiment

### Create ssl keys

```
mkdir keys
openssl genrsa -des3 -out keys/server.orig.key 2048
openssl rsa -in keys/server.orig.key -out keys/server.key
openssl req -new -key keys/server.key -out keys/server.csr
openssl x509 -req -days 365 -in keys/server.csr -signkey keys/server.key -out keys/server.crt
```

More info: https://coderwall.com/p/2gfk4w/your-first-spdy-app

### Install dependencies

```
npm install
bower install
```

### Install iojs

This experiment needs iojs (because ES6 reduces the boilersplate so much).

With [nvm](https://github.com/creationix/nvm): `nvm install iojs`.

### Run

If you've got iojs as main node version, you can do: `node index.js`

Otherwise: `nvm run iojs index.js`

Then navigate to `https://localhost:3333`

You should see something like:

~[setup page](./readme-content/setup-page.png)

## How it works


