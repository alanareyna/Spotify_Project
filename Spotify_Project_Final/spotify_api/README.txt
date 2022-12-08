SPOTIFY JOURNEY PROJECT

FULL PROJECT MEMBERS: Alana Reyna, Joseph Henderson, Karston Steinhorst 

CS355 API PROJECT 2: Alana Reyna

IMPORTANT NOTES:
- This project was initially created and ran on local host. All of the associated curl commands 
    given in the project report work when ran on blue. However, if you try to run the react 
    UI on local host while the database is still using blue, it will not run and will get stuck
    on the login page, since it cannot authenticate a user from the blue database if we are running
    on local. For this reason, I have also included the database connection file that works to run 
    on my local database. To run this, simply go to the .env file and replace it with this:

        // to run on local database 
        APP_ENV=local
        APP_PORT=8443
        APP_DOMAIN=your_hostname_here

        JWT_KEY=GqqRpRmu9_yxo_sEIxVNYLedFXLw3zf_G_zbMIl9VMc1234

        DB_HOST=localhost
        DB_PORT=3306
        DB_USER=areyna
        DB_PASS=alanareyna
        DB_DATABASE=spotify_api 

        // to run on blue
        APP_ENV=local
        APP_PORT=8064
        APP_DOMAIN=your_hostname_here

        JWT_KEY=GqqRpRmu9_yxo_sEIxVNYLedFXLw3zf_G_zbMIl9VMc1234

        DB_HOST=127.0.0.1
        DB_PORT=3306
        DB_USER=areyna_cs355fa22
        DB_PASS=re5790400
        DB_DATABASE=areyna_cs355fa22

        You would also want to change the mySQLconnect.js file found in the database 
        folder. Since there are many calls to this file, I recommend just copying and pasting
        the code in the myLOCALSQLconnect.js into the mySQLconnect.js file.

        You would also want to change the base URL in the API_Interface.js file in the src 
        folder under the API_Interface folder. 
