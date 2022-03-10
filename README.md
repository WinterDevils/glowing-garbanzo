# Technical challenge

This project is created using a combination of React, node, and Firebase.

## Important note!

> After cloning this repo, you will need to download my Firebase credentials and place it in:
> /root_dir/pi-gen/creds/hehui-firebase.json
> This step is not required if you're using my zip file

I am not uploading my credentials onto a public github.. :D

## Prerequisites
This projects require you to have already installed:
- firebase-tools
- node 16
- npm
- docker for windows/mac

Link to install firebase-tools here: https://firebase.google.com/docs/cli#install-cli-mac-linux. Instructions are provided with the assumption that you are running a linux/OSX environment


## Step 1 - Starting Firebase local environment
Starting firebase local environment, connection is via credential files in zip. This will start firestore and firebase functions, i.e. the API. Feel free to follow instructions on CLI to access firebase emulator UI.
~~~
cd /root_dir/functions/
npm install
cd /root_dir
firebase emulators:start
~~~


## Step 2 - Starting the Pi-generator
~~~
cd /root_dir/pi-gen/docker
docker-compose up 
~~~
> I've already configured pi.js to connect to firestore local emulators, and npm install is already part of the setup in docker


## Step 3 - Starting the UI
~~~
cd /root_dir/web-app
npm install
npm start
~~~
You can refresh the UI while runinng step 2 to see new pi digits generating on the screen


# Discussion points
- A better way to build the UI is actually to connect React to Firestore via the SDK's snapshot method. That way there's no need to refresh the UI for new values of PI. I made it this way specifically to answer the question of serving via a HTTP request
- I didn't bother handling decimal points when multiplying the circumference of the sun, and rounded the circumference of the sun up to the nearest KM. At the scale of 4+ million kilometers, the decimal point shouldn't make much of a difference realistically
- Made some extra cloud animation just for fun
- I used firebase over local mongoDB implementation as it's just easier to setup
- There's a limitation on documentsize for firestore, so it definitely needs improvement should I want to support a really big number of decimals for Pi
- I definitely shouldn't be writing into firestore or any DB 1 by 1 without any form of chunking in a typical scenario
- I made the assumption to start generating PI from the first digit, primarily for display/testing purposes. 
