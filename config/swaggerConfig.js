const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Wallet API',
      version: '1.0.0',
      description: 'Wallet API information',
      contact: {
        name: 'Blended2-team',
      },
    },
    servers: [
      {
        url: 'https://wallet-app-767team.herokuapp.com/',
      },
    ],
  },
  apis: ['./routes/*.js'],
};

module.exports = swaggerOptions;
