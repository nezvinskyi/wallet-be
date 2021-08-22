const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const { swaggerOptions } = require('./config');
const { transactionsRoutes, categoriesRoutes, usersRoutes } = require('./routes');

require('./config/config-passport')

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/api/v1/transactions', transactionsRoutes);
app.use('/api/v1/categories', categoriesRoutes);
app.use('/api/v1/users', usersRoutes)
// app.get('/api/v1/', (req, res) => {
//   res.status(200).json({
//     message: 'all good',
//   });
// });

app.use(notFound);

app.use(errorHandler);

module.exports = app;
