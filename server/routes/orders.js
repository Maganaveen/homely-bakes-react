const express = require('express');
const { body, validationResult } = require('express-validator');
const Order = require('../models/Order');
const User = require('../models/User');
const nodemailer = require('nodemailer');

const router = express.Router();

// Email configuration - Always use Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Test email configuration on startup
transporter.verify((error, success) => {
  if (error) {
    console.log('❌ Email configuration error:', error.message);
  } else {
    console.log('✅ Email server is ready to send messages');
  }
});

// POST /orders - create new order with user registration
router.post('/', [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('phone').notEmpty().withMessage('Phone number is required'),
  body('address').notEmpty().withMessage('Address is required'),
  body('cakeName').notEmpty().withMessage('Cake name is required'),
  body('selectedOption').notEmpty().withMessage('Option selection is required'),
  body('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
  body('totalPrice').isNumeric().withMessage('Total price is required')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, email, phone, address, cakeName, selectedOption, quantity, totalPrice, message } = req.body;

    // Check if user exists, if not create new user
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({
        name,
        email,
        phone,
        address
      });
      await user.save();
    }

    // Create order
    const order = new Order({
      userId: user._id,
      cakeName,
      selectedOption,
      quantity,
      totalPrice,
      message: message || ''
    });

    await order.save();

    // Admin notification email template
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'maganaveen3@gmail.com',
      subject: '🎂 New Cake Order - Homely Bakes',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Order - Homely Bakes</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #ec4899, #8b5cf6); padding: 30px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">🎂 Homely Bakes</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">New Order Alert!</p>
            </div>
            
            <!-- Content -->
            <div style="padding: 30px;">
              <div style="background-color: #fff3cd; border: 1px solid #ffeaa7; border-radius: 8px; padding: 20px; margin-bottom: 25px;">
                <h2 style="color: #856404; margin: 0 0 10px 0; font-size: 20px;">🔔 New Order Received!</h2>
                <p style="color: #856404; margin: 0; font-size: 14px;">Order ID: <strong>${order._id}</strong></p>
                <p style="color: #856404; margin: 5px 0 0 0; font-size: 14px;">Date: <strong>${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</strong></p>
              </div>
              
              <!-- Customer Details -->
              <div style="margin-bottom: 25px;">
                <h3 style="color: #333; margin: 0 0 15px 0; font-size: 18px; border-bottom: 2px solid #ec4899; padding-bottom: 5px;">👤 Customer Details</h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr><td style="padding: 8px 0; color: #666; font-weight: bold; width: 30%;">Name:</td><td style="padding: 8px 0; color: #333;">${name}</td></tr>
                  <tr><td style="padding: 8px 0; color: #666; font-weight: bold;">Email:</td><td style="padding: 8px 0; color: #333;">${email}</td></tr>
                  <tr><td style="padding: 8px 0; color: #666; font-weight: bold;">Phone:</td><td style="padding: 8px 0; color: #333;">${phone}</td></tr>
                  <tr><td style="padding: 8px 0; color: #666; font-weight: bold; vertical-align: top;">Address:</td><td style="padding: 8px 0; color: #333;">${address}</td></tr>
                </table>
              </div>
              
              <!-- Order Details -->
              <div style="margin-bottom: 25px;">
                <h3 style="color: #333; margin: 0 0 15px 0; font-size: 18px; border-bottom: 2px solid #ec4899; padding-bottom: 5px;">🎂 Order Details</h3>
                <div style="background-color: #f8f9fa; border-radius: 8px; padding: 20px;">
                  <table style="width: 100%; border-collapse: collapse;">
                    <tr><td style="padding: 8px 0; color: #666; font-weight: bold; width: 30%;">Cake:</td><td style="padding: 8px 0; color: #333; font-weight: bold;">${cakeName}</td></tr>
                    <tr><td style="padding: 8px 0; color: #666; font-weight: bold;">Option:</td><td style="padding: 8px 0; color: #333;">${selectedOption}</td></tr>
                    <tr><td style="padding: 8px 0; color: #666; font-weight: bold;">Quantity:</td><td style="padding: 8px 0; color: #333;">${quantity}</td></tr>
                    <tr><td style="padding: 8px 0; color: #666; font-weight: bold;">Total Price:</td><td style="padding: 8px 0; color: #ec4899; font-weight: bold; font-size: 18px;">₹${totalPrice}</td></tr>
                    ${message ? `<tr><td style="padding: 8px 0; color: #666; font-weight: bold; vertical-align: top;">Message:</td><td style="padding: 8px 0; color: #333; font-style: italic;">${message}</td></tr>` : ''}
                  </table>
                </div>
              </div>
              
              <!-- Action Required -->
              <div style="background-color: #d1ecf1; border: 1px solid #bee5eb; border-radius: 8px; padding: 20px; text-align: center;">
                <h3 style="color: #0c5460; margin: 0 0 10px 0;">📞 Action Required</h3>
                <p style="color: #0c5460; margin: 0; font-size: 16px;">Please contact the customer at <strong>${phone}</strong> to confirm the order details and delivery schedule.</p>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="background-color: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #dee2e6;">
              <p style="color: #6c757d; margin: 0; font-size: 14px;">Homely Bakes - Sweet moments, delivered fresh</p>
              <p style="color: #6c757d; margin: 5px 0 0 0; font-size: 12px;">This is an automated notification from your order management system.</p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    // Send emails (don't fail order if email fails)
    try {
      console.log('Attempting to send admin email...');
      const adminResult = await transporter.sendMail(mailOptions);
      console.log('✅ Admin notification email sent successfully:', adminResult.messageId);
      
      // Show preview URL for development
      if (process.env.NODE_ENV !== 'production' && adminResult.envelope) {
        console.log('📧 Preview admin email:', nodemailer.getTestMessageUrl(adminResult));
      }
    } catch (emailError) {
      console.error('❌ Failed to send admin email:');
      console.error('Error code:', emailError.code);
      console.error('Error message:', emailError.message);
    }

    // Customer confirmation email template
    const customerMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: '🎉 Order Confirmed - Homely Bakes',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Order Confirmation - Homely Bakes</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #10b981, #059669); padding: 30px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">🎂 Homely Bakes</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">Sweet moments, delivered fresh</p>
            </div>
            
            <!-- Success Message -->
            <div style="padding: 30px; text-align: center;">
              <div style="background-color: #d4edda; border: 1px solid #c3e6cb; border-radius: 8px; padding: 25px; margin-bottom: 25px;">
                <h2 style="color: #155724; margin: 0 0 10px 0; font-size: 24px;">🎉 Order Confirmed!</h2>
                <p style="color: #155724; margin: 0; font-size: 16px;">Thank you for choosing Homely Bakes, ${name}!</p>
              </div>
              
              <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 0 0 25px 0;">Your delicious cake order has been received and confirmed. We're excited to create something special for you!</p>
            </div>
            
            <!-- Order Details -->
            <div style="padding: 0 30px 30px 30px;">
              <h3 style="color: #333; margin: 0 0 20px 0; font-size: 20px; text-align: center; border-bottom: 2px solid #10b981; padding-bottom: 10px;">📋 Your Order Details</h3>
              
              <div style="background: linear-gradient(135deg, #f8f9fa, #e9ecef); border-radius: 10px; padding: 25px; margin-bottom: 25px;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr><td style="padding: 10px 0; color: #666; font-weight: bold; width: 35%;">Order ID:</td><td style="padding: 10px 0; color: #333; font-family: monospace; background-color: #fff; padding: 5px 10px; border-radius: 4px;">${order._id}</td></tr>
                  <tr><td style="padding: 10px 0; color: #666; font-weight: bold;">Cake:</td><td style="padding: 10px 0; color: #333; font-weight: bold; font-size: 16px;">${cakeName}</td></tr>
                  <tr><td style="padding: 10px 0; color: #666; font-weight: bold;">Size/Option:</td><td style="padding: 10px 0; color: #333;">${selectedOption}</td></tr>
                  <tr><td style="padding: 10px 0; color: #666; font-weight: bold;">Quantity:</td><td style="padding: 10px 0; color: #333;">${quantity}</td></tr>
                  <tr><td style="padding: 10px 0; color: #666; font-weight: bold;">Total Amount:</td><td style="padding: 10px 0; color: #10b981; font-weight: bold; font-size: 20px;">₹${totalPrice}</td></tr>
                  ${message ? `<tr><td style="padding: 10px 0; color: #666; font-weight: bold; vertical-align: top;">Special Message:</td><td style="padding: 10px 0; color: #333; font-style: italic; background-color: #fff3cd; padding: 10px; border-radius: 4px; border-left: 4px solid #ffc107;">${message}</td></tr>` : ''}
                  <tr><td style="padding: 10px 0; color: #666; font-weight: bold; vertical-align: top;">Delivery Address:</td><td style="padding: 10px 0; color: #333;">${address}</td></tr>
                </table>
              </div>
              
              <!-- Next Steps -->
              <div style="background-color: #e7f3ff; border: 1px solid #b8daff; border-radius: 8px; padding: 20px; margin-bottom: 25px;">
                <h3 style="color: #004085; margin: 0 0 15px 0; font-size: 18px;">📞 What's Next?</h3>
                <ul style="color: #004085; margin: 0; padding-left: 20px; line-height: 1.8;">
                  <li>We'll call you at <strong>${phone}</strong> within 2 hours to confirm your order</li>
                  <li>Our team will discuss delivery timing and any special requirements</li>
                  <li>We'll send you updates as your order is being prepared</li>
                  <li>Enjoy your delicious homemade cake! 🎂</li>
                </ul>
              </div>
              
              <!-- Contact Info -->
              <div style="text-align: center; padding: 20px; background-color: #f8f9fa; border-radius: 8px;">
                <h3 style="color: #333; margin: 0 0 15px 0;">Need Help?</h3>
                <p style="color: #666; margin: 0 0 10px 0;">📧 Email: <a href="mailto:maganaveen3@gmail.com" style="color: #10b981; text-decoration: none;">maganaveen3@gmail.com</a></p>
                <p style="color: #666; margin: 0;">📱 Phone: <a href="tel:+918838142150" style="color: #10b981; text-decoration: none;">+91 88381 42150</a></p>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="background-color: #333; padding: 25px; text-align: center;">
              <p style="color: white; margin: 0 0 10px 0; font-size: 18px; font-weight: bold;">🎂 Homely Bakes</p>
              <p style="color: #ccc; margin: 0 0 10px 0; font-size: 14px;">Sweet moments, delivered fresh</p>
              <p style="color: #999; margin: 0; font-size: 12px;">Thank you for trusting us with your special moments!</p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    try {
      console.log('Attempting to send customer email...');
      const customerResult = await transporter.sendMail(customerMailOptions);
      console.log('✅ Customer confirmation email sent successfully:', customerResult.messageId);
      
      // Show preview URL for development
      if (process.env.NODE_ENV !== 'production' && customerResult.envelope) {
        console.log('📧 Preview customer email:', nodemailer.getTestMessageUrl(customerResult));
      }
    } catch (emailError) {
      console.error('❌ Failed to send customer email:');
      console.error('Error code:', emailError.code);
      console.error('Error message:', emailError.message);
    }

    res.status(201).json({
      message: 'Order placed successfully!',
      orderId: order._id
    });

  } catch (error) {
    console.error('Error creating order:', error);
    console.error('Error details:', error.message);
    res.status(500).json({ 
      message: 'Failed to place order',
      error: error.message 
    });
  }
});

// GET /orders/test - test endpoint
router.get('/test', (req, res) => {
  res.json({ message: 'Orders API is working!' });
});

// GET /orders - get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().populate('userId', 'name email phone');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;