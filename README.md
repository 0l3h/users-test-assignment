## Running locally

Clone this project, open up the terminal, navigate go to the server folder and run command below:

    npm i

Open up **.env** file, located in the root of the project, and change **POSTGRES_DB_PASSWORD** environment variable to a password of a database user set locally on your machine, and **POSTGRES_DB_USERNAME** to a database user name. By default PostgreSQL uses a **postgres** user. If that's your case, only password needs to be changed.

After setting up user and password, save the file, navigate to the **server** folder with your terminal and run...
    
    npx sequelize-cli db:create

This will create a database based on configuration provided, with a **users_db_dev** name.

The next step is to create **Users** and **Subscriptions** tables. To do that we need to make changes to the database using migration files in **server/src/migrations** directory by running this command:

    npx sequelize-cli db:migrate

When tables are created, you need to populate them with some data via seeder file. To do that, type in your terminal:

    npx sequelize-cli db:seed:all

If all of that is done, run command bellow:

    npm start

This will start the server, which will run on port defined in `process.env.PORT` variable or `5000` by default. Here we'll use the default port but for production stage, we must always set sensitive data like configuration, host, port, credentials, etc in environment variable and include .env file in .gitignore file.

After starting the server, in your terminal, you should see a message like this:

> \> server@1.0.0 start <br/>
> \> nodemon src/app.js
> 
> [nodemon] 2.0.20 <br/>
> [nodemon] to restart at any time, enter \`rs\` <br/>
> [nodemon] watching path(s): \*.\* <br/>
> [nodemon] watching extensions: js,mjs,json <br/>
> [nodemon] starting `node src/app.js` <br/>
> Server is listening on port: 5000

In order to see this project in your browser, open up a browser and type in address bar the following line:

    localhost:5000

After all of that is done, you should be able to see a website.