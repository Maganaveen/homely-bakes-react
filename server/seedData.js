require('dotenv').config();
const mongoose = require('mongoose');
const Cake = require('./models/Cake');

const sampleCakes = [
  {
    name: 'Chocolate Cake',
    description: 'Rich and moist chocolate cake with chocolate frosting',
    price: 25.99,
    image: '/images/chocolate-cake.jpg',
    category: 'Chocolate'
  },
  {
    name: 'Red Velvet Cake',
    description: 'Classic red velvet with cream cheese frosting',
    price: 28.99,
    image: '/images/red-velvet-cake.jpg',
    category: 'Special'
  },
  {
    name: 'Black Forest Cake',
    description: 'Chocolate sponge with cherries and whipped cream',
    price: 32.99,
    image: '/images/black-forest-cake.jpg',
    category: 'Premium'
  },
  {
    name: 'Vanilla Sponge',
    description: 'Light and fluffy vanilla cake with buttercream',
    price: 22.99,
    image: '/images/vanilla-sponge1.jpg',
    category: 'Classic'
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    await Cake.deleteMany({});
    await Cake.insertMany(sampleCakes);
    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();