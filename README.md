# perfecto-webinar-protractor
This repo holds the protractor project that is used during the webinar of the 27th of July 2017

The master branch will hold the default setup

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
To run the tests local execute `npm run test.local`

## Run on the perfecto cloud
Before you are able to run against the Perfecto cloud add a file to your project called `perfecto.config.json` and add the following data to it

```javascript
    {
        "password": "yourPassword",
        "user": "yourUsername",
        "seleniumAddress": "yourCloudSeleniumAddress"
    }
```

If added you can run the tests with `npom run test.perfecto`
