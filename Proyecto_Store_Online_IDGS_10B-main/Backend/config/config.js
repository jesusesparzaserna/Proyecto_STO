//PUERTO
process.env.PORT = process.env.PORT || 3001;

//Entorno (ENV)
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//Connection to data base
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/Store_online';

}
process.env.URLDB = urlDB; 