// server.js
const mongoose = require('mongoose');
require('dotenv').config();
const path = require('path'); // ✅ needed for swagger.yaml path
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const app = require('./app');

const PORT = process.env.PORT || 3000;

// ✅ Load Swagger doc before starting server
const swaggerDocument = YAML.load(path.join(__dirname, 'swagger.yaml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// ✅ Connect and listen
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
  });



// server.js
// const mongoose = require('mongoose');
// require('dotenv').config(); // Needed to load .env locally, ignored by Render

// const app = require('./app');
// const PORT = process.env.PORT || 3000;

// const mongoUri = process.env.MONGO_URI;

// if (!mongoUri) {
//   console.error('❌ MONGO_URI environment variable is not set');
//   process.exit(1);
// }

// console.log('🔑 Connecting to MongoDB with URI:', mongoUri.replace(/(\/\/.*:)(.*)(@.*)/, '$1****$3'));

// mongoose.connect(mongoUri)
//   .then(() => {
//     console.log('✅ Connected to MongoDB');
//     app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
//   })
//   .catch(err => {
//     console.error('❌ MongoDB connection error:', err);
//     process.exit(1);
//   });
