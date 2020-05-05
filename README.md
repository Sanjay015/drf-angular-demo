# Fullstack Django and Angular
Created by Rudolf Olah <rudolf.olah.to@gmail.com>

## Setup Django
Get started with Django:

```sh
# Set up the environment and install packages
pip3 install virtualenv
virtualenv --python=python3 env
source env/bin/activate
pip install -r requirements.txt

# Django app
cd demo
# Run model and data migrations
python manage.py migrate

# Create admin user (Already created as part of the migrations)
# python manage.py createsuperuser --username admin

# Run tests
python manage.py test

# Run the server
python manage.py runserver
```

## Setup Angular
Source code for Angular is in `frontend` directory.

Getting started with Angular:

```sh
sudo npm install -g @angular/cli

# Angular
cd frontend
npm install

# Run tests
ng test

ng serve
# for ES5 and compatibility with more browsers use this:
ng serve -c es5
ng build -c es5
```

### End2End Testing
To run e2e (end2end) tests you will need the Django backend server running first:

```sh
source env/bin/activate
cd demo
./manage.py runserver &
cd ../frontend
ng e2e
```

## Users and Data and Logging In
There is some data loaded into the database after you run `python manage.py migrate` and a few users are created.

**Use the username as the password to login**:
- `admin`
- `user_a`
- `user_b`
- `user_c`

You can login with these users through the frontend application `http://localhost:4200` and through the Django admin `http://localhost:8000/admin/`

## Issues You May Encounter with Angular
### Tests will not run on GNU/Linux distributions such as Ubuntu
If using GNU/Linux and the Chromium browser, you may need to run the following so that Karma and Selenium/Protractor can run the browser properly:

```sh
export CHROME_BIN=/usr/bin/chromium-browser
ng test

sudo ln -s /usr/bin/chrome /usr/bin/chromium-browser`
ng e2e
```
### `ng e2e` error: "session not created: This version of ChromeDriver only supports Chrome version 74"
You can check the current version of Chrome/Chromium that you are using like this:

    chrome --version

It should output something like this:

    Chromium 76.0.3809.100 Built on Ubuntu , running on Ubuntu 16.04

On Mac OS X you can view the Chrome version by launching Google Chrome and going to the Chrome > About Chrome in the menu. Then you should see something like this:

    Version 77.0.3865.90 (Official Build) (64-bit)

If the version you are running is 76, then you will need ChromeDriver 76 to be installed.

Look on this website for the version that matches your Chrome/Chromium version: https://chromedriver.chromium.org/downloads

In the case of Chrome 76, the version that matched was `76.0.3809.126`.

You will need to download it using the webdriver-manager:

```sh
cd frontend
node_modules/protractor/bin/webdriver-manager update --versions.chrome 76.0.3809.126
```

Then you will need to update the protractor configuration, `frontend/e2e/protractor.conf.js` to point to the path:

```javascript
export.config = {
  chromeDriver: '../node_modules/protractor/node_modules/webdriver-manager/selenium/chromedriver_76.0.3809.126',
  // ...
}
```

Whenever you upgrade your version of Chrome you will need to follow the above steps.

### Updating with `ng update --all` fails because of "Incompatible peer dependencies"
When you run `ng update --all`, it may fail with something like the following:

```sh
rudolfo:~/Code/django-angular-course/frontend$ ng update --all
                  Package "@angular/compiler-cli" has an incompatible peer dependency to "typescript" (requires ">=3.4 <3.5", would install "3.5.3")
                  Package "@angular-devkit/build-angular" has an incompatible peer dependency to "typescript" (requires ">=3.1 < 3.5", would install "3.5.3")
                  Package "@angular/compiler-cli" has an incompatible peer dependency to "typescript" (requires ">=3.4 <3.5", would install "3.5.3").
Incompatible peer dependencies found. See above.
```

This can be because your version of Angular needs to be updated. You can do that with the following commands:

    ng update @angular/core
    ng update @angular/material

If @angular/cli fails to update, you may have to adjust the `package.json` to a higher version:

```javascript
{
  /* ... */
  "devDependencies": {
    /* ... */
    "@angular/cli": "^8.1.1"
  }
}
```

And then update it:

    ng update @angular/cli

### Production Compilation of Angular Does Not Work In "Legacy" or "Older" Web Browsers
Starting from Angular 8, the default production configuration will compile for the latest browsers like Chrome and will not work on most other browsers.

We have already fixed this by providing alternative configuration files that use ES5 which ensures that the production compiled code will work in all web browsers.

Just remember to run `ng build -c es5` instead of `ng build`.

Specifically, we have updated and added the following files for ES5 support:
- [browserslist](./frontend/src/browserslist)
- [tsconfig-es5.json](./frontend/tsconfig-es5.json)
- [angular.json](./frontend/angular.json)

### Security Updates and NPM Audits
This is not specific to Angular and applies to any projects using NPM. NPM will give you details on packages that have security vulnerabilities, use `npm audit` for details and `npm audit fix` to update the packages.

### `ng serve` does not work, fails with "Could not find implementation for builder @angular-devkit/build-angular:dev-server"
That means the version of `@angular-devkit/build-angular` needs to be updated in [frontend/package.json](./frontend/package.json) to a later version:

```javascript
{
  /* ... */
  "devDependencies": {
    /* ... */
    "@angular-devkit/build-angular": "^0.801.1"
  }
}
```
