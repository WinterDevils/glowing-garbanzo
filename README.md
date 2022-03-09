# Technical challenge

This project is created using a combination of React, node, and Firebase.

### Background throughts

I used Firebase as the requirement was to create a HTTP GET interface along with a DB, and a combination of Cloud functions and Firestore was a decent candidate rather than setting up a local database, which is something I haven't done in a while.

## Important note!

> After cloning this repo, you will need to download my Firebase credentials and place it in:
> /root_dir/creds/<file.json>

I am not uploading my credentials onto a public github.. :D

## Prerequisites
This projects require you to have firebase-tools, node 16, and npm installed
Link to install firebase-tools here: https://firebase.google.com/docs/cli#install-cli-mac-linux
Instructions are provided with the assumption that you are running a linux/OSX environment


## How to start Firebase local environment
Run firebase functions locally, connected to my firestore using the credentials above
~~~
cd /root_dir
firebase emulators:start
~~~
This will start firebase functions and firestore locally. You may access firestore locally via instructions on the CLI


## How to start pi-generator
~~~
cd /root_dir/pi-gen/docker
docker-compose up 
~~~
> I've already configured docker to connect to firestore local emulators


## How to run the UI
~~~
cd /root_dir
npm start
~~~


# Discussion points
- A better way to build the UI is actually to connect React to Firestore via the SDK's snapshot method. That way there's no need to refresh the UI for new values of PI. I made it this way specifically to answer the question of serving via a HTTP request
- I didn't bother handling decimal points when multiplying the circumference of the sun, and rounded the circumference of the sun up to the nearest KM. At the scale of 4+ million kilometers, the decimal point shouldn't make much of a difference realistically
- Made some extra cloud animation just for fun
- I used firebase over local mongoDB implementation as it's just easier to setup
- There's a limitation on documentsize for firestore, so it definitely needs improvement should I want to support a really big number of decimals for Pi
- I definitely shouldn't be writing into firestore or any DB 1 by 1 without any form of chunking in a typical scenario
- 
