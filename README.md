# Fullstack Django and Angular
Created by Rudolf Olah <rudolf.olah.to@gmail.com>

## Setup Django
Get started with Django:

```sh
# Set up the environment and install packages
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
Source code for Angular is in `ui` directory.

Getting started with Angular:

```sh
sudo npm install -g @angular/cli

# Angular
cd ui
npm install

# Run tests
ng test
ng serve
```
