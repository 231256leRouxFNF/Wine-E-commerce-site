const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('./models/Product'); // adjust the path as needed

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Connected to DB');

    await Product.deleteMany(); // clear existing data (optional)

    await Product.insertMany([
      {
        title: 'Red Wine',
        description: 'A smooth red wine with fruity notes',
        price: 25.99,
        image: 'https://your-image-url.com/red.jpg',
        category: 'Wine',
        inStock: true
      },
      {
        title: 'White Wine',
        description: 'Crisp and refreshing with citrus flavors',
        price: 22.50,
        image: 'https://your-image-url.com/white.jpg',
        category: 'Wine',
        inStock: true
      }
    ]);

    console.log('Seeded products!');
    process.exit();
  })
  .catch(err => console.error('Failed to connect:', err));
