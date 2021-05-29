const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
var passport = require('./config/passport');
const authJwt = require('./middlewares/jwt');

require('dotenv/config');

app.use(cors());
app.options('*', cors())

//middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(authJwt());

//Routes
const clientRoutes = require('./routes/client');
const vendorRoutes = require('./routes/vendor');
const serviceRoutes = require('./routes/service');
const commentRoutes = require('./routes/comment');
const categoryRoutes = require('./routes/category');
const cancelledOrderRoutes = require('./routes/cancelledOrder');
const acceptedOrderRoutes = require('./routes/acceptedOrder');
const addressRoutes = require('./routes/address');
const ordersRoutes = require('./routes/orders');


/*const categoriesRoutes = require('./routes/categories');
const productsRoutes = require('./routes/products');
const vendorRoutes = require('./routes/vendor');
const ordersRoutes = require('./routes/orders');*/

const api = process.env.API_URL;
app.use(`${api}/client`, clientRoutes);

app.use(`${api}/vendor`, vendorRoutes);
app.use(`${api}/service`, serviceRoutes);
app.use(`${api}/comment`, commentRoutes);
app.use(`${api}/category`, categoryRoutes);
app.use(`${api}/cancelledOrder`, cancelledOrderRoutes);
app.use(`${api}/acceptedOrder`, acceptedOrderRoutes);
app.use(`${api}/address`, addressRoutes);
app.use(`${api}/orders`, ordersRoutes);


/*
app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRoutes);

app.use(`${api}/orders`, ordersRoutes); */


//Database
mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'myFirstDatabase'
})
.then(()=>{
    console.log('Database Connection is ready...')
})
.catch((err)=> {
    console.log(err);
})

//Server
app.listen(3000, ()=>{

    console.log('server is running http://localhost:3000');
})