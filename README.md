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

![setup page](readme-content/setup-page.png)

## What is Module Injection

Right, let's get started.

Let's look at the file structure, focusing on the `www` directory.

```
/www
    /apps
    /platform
```

Already, we introduce 2 concepts: apps and platform. 
- **app** - single purpose web application, accessible by a unique URL
- **platform** - the building block of your apps.

Right, nothing too new for now. Let's dive into one of those app.

```
apps/
    setup/
        setup.html
        setup-ctrl.js
```

Each app is minimally made of 2 files: the base html, and the base js controller.

You've already seen the UI of the setup page in the screenshot above ^. 

The html looks like this:
```
<body ng-controller="SetupCtrl as setupCtrl">
    <vd-nav></vd-nav>
    <vd-main>
        <vd-title>Setup Page</vd-title>
        <form>
            <div><input type="checkbox" ng-model="setupCtrl.settings.taxInclusive"> Tax inclusive</div>
            <div>
                <input type="radio" ng-model="setupCtrl.settings.lang" value="en"> English
                <input type="radio" ng-model="setupCtrl.settings.lang" value="fr"> Français
            </div>
            <vd-submit-button type="submit" ng-click="setupCtrl.submit()">Save</vd-submit-button>
        </form>
    </vd-main>
</body>
```

The js looks like this:
```
angular.module('setup').controller('SetupCtrl', function (settingsResource) {
    this.settings = settingsResource.get();

    this.submit = function () {
        settingsResource.save(this.settings);
    };

});
```

You may notice few things:
- No head. No script tags.
- No CommonJs/AMD
- Html uses some components
- Js uses some custom services

Still, when we load the app, it works. You can save data to the server by clicking save. The ui components display properly. 

Looking at the source code of the html may bring some light:
```
<!DOCTYPE html>
<html ng-app="setup">
<head lang="en">
  <meta charset="UTF-8">
  <title>Setup Page</title>
  <script src="vendor/angular/angular.js"></script>
  <script src="bootstrap/setup.js"></script>
  <script src="apps/setup/setup-ctrl.js"></script>
  <script src="platform/resources/settings-resource/settings-resource.js"></script>
  <script src="platform/components/vd-nav/vd-nav.js"></script>
  <script src="platform/components/vd-main/vd-main.js"></script>
  <script src="platform/components/vd-title/vd-title.js"></script>
  <script src="platform/components/vd-submit-button/vd-submit-button.js"></script>
</head>
```
All the required dependency have been injected into the html file. **This is Module Injection**.

## How it works
