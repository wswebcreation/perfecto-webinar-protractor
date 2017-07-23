# perfecto-webinar-protractor
This repo holds the protractor project that is used during the webinar of the 27th of July 2017

The master branch will hold the default setup. 

> You can swith between the `master|page-objects|typescript`-branches with your IDE or terminal to get the right examples.

## Checking your environment
Before cloning and installing the project make sure you have NodeJS installed on your machine. This needs to be at least version `6.9.x`.
Execute the following command in a terminal to see the version of NodeJS is running `node -v`. If it is lower than `6.9.x` you should upgrade NodeJS


## Install project
Clone the project to your local machine with 

```bash
    git clone https://github.com/wswebcreation/perfecto-webinar-protractor.git
```

When the project is cloned install all the dependencies with

```bash
    cd perfecto-webinar-protractor
    npm install
```

## Run local
Protractor needs to have a selenium server running locally to connect to the browser. This setup uses `directConnect` and means that no separate selenium server needs to be started. This is all done out of the box.
 
To run the tests local execute `npm run test.local`

## Run on the perfecto cloud
Before you are able to run against the Perfecto cloud add a file to your the root of your project called `perfecto.config.json` and add the following data to it

```javascript
    {
        "password": "yourPassword",
        "user": "yourUsername",
        "seleniumAddress": "yourCloudSeleniumAddress"
    }
```

If added you can run the tests with `npm run test.perfecto`
