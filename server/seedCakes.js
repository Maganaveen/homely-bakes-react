require('dotenv').config();
const mongoose = require('mongoose');
const Cake = require('./models/Cake');

const cakes = [
  // Cakes
  { name: "Chocolate Cake", price: "₹899", image: "/images/chocolate-cake.jpg", description: "Rich chocolate cake with cocoa frosting", category: "Cakes" },
  { name: "Red Velvet", price: "₹1299", image: "/images/red-velvet-cake.jpg", description: "Classic red velvet with cream cheese frosting", category: "Cakes" },
  { name: "Black Forest", price: "₹1199", image: "/images/black-forest-cake.jpg", description: "Chocolate cake with cherries and whipped cream", category: "Cakes" },
  { name: "Vanilla Sponge", price: "₹799", image: "/images/vanilla-sponge1.jpg", description: "Light and fluffy vanilla sponge cake", category: "Cakes" },
  { name: "Strawberry Cake", price: "₹999", image: "/images/strawberry-cake.jpg", description: "Fresh strawberry cake with berry frosting", category: "Cakes" },
  { name: "Butterscotch Cake", price: "₹949", image: "/images/cake2.jpg", description: "Butterscotch flavored cake with caramel", category: "Cakes" },
  { name: "Pineapple Cake", price: "₹849", image: "/images/pineapple-cake.jpg", description: "Tropical pineapple cake with cream", category: "Cakes" },
  { name: "Mango Cake", price: "₹1099", image: "/images/mango-cake.jpg", description: "Seasonal mango cake with fresh fruit", category: "Cakes" },
  { name: "Carrot Cake", price: "₹1149", image: "/images/cake1.jpg", description: "Spiced carrot cake with cream cheese frosting", category: "Cakes" },
  { name: "Lemon Cake", price: "₹899", image: "/images/cake21.jpg", description: "Zesty lemon cake with citrus glaze", category: "Cakes" },
  { name: "Coffee Cake", price: "₹1049", image: "/images/coffee-cake.jpg", description: "Rich coffee flavored cake with mocha frosting", category: "Cakes" },
  { name: "Fruit Cake", price: "₹1299", image: "/images/fruit-cake.jpg", description: "Traditional fruit cake with mixed dry fruits", category: "Cakes" },
  
  // Cupcakes
  { name: "Chocolate Cupcakes", price: "₹299", image: "/images/chocolate-cupcakes.jpg", description: "Set of 6 chocolate cupcakes", category: "Cupcakes" },
  { name: "Vanilla Cupcakes", price: "₹249", image: "/images/cup1.jpg", description: "Set of 6 vanilla cupcakes", category: "Cupcakes" },
  { name: "Red Velvet Cupcakes", price: "₹349", image: "/images/red-velvet-cupcakes.jpg", description: "Set of 6 red velvet cupcakes", category: "Cupcakes" },
  { name: "Funfetti Cupcakes", price: "₹299", image: "/images/funfetti-cupcakes.jpg", description: "Colorful sprinkle cupcakes - set of 6", category: "Cupcakes" },
  
  // Cookies
  { name: "Chocolate Chip Cookies", price: "₹199", image: "/images/chocolate-chip-cookies.jpg", description: "Pack of 12 classic chocolate chip cookies", category: "Cookies" },
  { name: "Oatmeal Cookies", price: "₹179", image: "/images/oatmeal-cookies.jpg", description: "Healthy oatmeal cookies - pack of 12", category: "Cookies" },
  { name: "Sugar Cookies", price: "₹159", image: "/images/sugar-cookies.jpg", description: "Sweet sugar cookies - pack of 12", category: "Cookies" },
  { name: "Ginger Cookies", price: "₹189", image: "/images/ginger-cookies.jpg", description: "Spiced ginger cookies - pack of 12", category: "Cookies" },
  
  // Desserts
  { name: "Tiramisu", price: "₹449", image: "/images/tiramisu.jpg", description: "Classic Italian tiramisu dessert", category: "Desserts" },
  { name: "Cheesecake", price: "₹549", image: "/images/cheesecake.jpg", description: "Creamy New York style cheesecake", category: "Desserts" },
  { name: "Chocolate Mousse", price: "₹349", image: "/images/chocolate-mousse.jpg", description: "Rich chocolate mousse dessert", category: "Desserts" },
  { name: "Panna Cotta", price: "₹299", image: "/images/panna-cotta.jpg", description: "Silky smooth vanilla panna cotta", category: "Desserts" },
  { name: "Brownie", price: "₹249", image: "/images/brownie.jpg", description: "Fudgy chocolate brownie", category: "Desserts" },
  
  // Hampers
  { name: "Birthday Hamper", price: "₹1999", image: "/images/birthday-hamper.jpg", description: "Complete birthday celebration package", category: "Hampers" },
  { name: "Anniversary Hamper", price: "₹2499", image: "/images/anniversary-hamper.jpg", description: "Romantic anniversary gift hamper", category: "Hampers" },
  { name: "Festival Hamper", price: "₹1799", image: "/images/festival-hamper.jpg", description: "Traditional festival sweets hamper", category: "Hampers" },
  { name: "Corporate Hamper", price: "₹2999", image: "/images/corporate-hamper.jpg", description: "Professional corporate gift hamper", category: "Hampers" },
];

async function seedCakes() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    await Cake.deleteMany({});
    console.log('Cleared existing cakes');
    
    await Cake.insertMany(cakes);
    console.log('Seeded 28 items successfully');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding cakes:', error);
    process.exit(1);
  }
}

seedCakes();