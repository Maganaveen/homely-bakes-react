require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

async function testEmail() {
  try {
    console.log('Testing email configuration...');
    console.log('Email User:', process.env.EMAIL_USER);
    console.log('Email Pass:', process.env.EMAIL_PASS ? 'Set' : 'Not Set');
    
    // Verify transporter
    await transporter.verify();
    console.log('✅ Email server connection successful');
    
    // Send test email
    const result = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'maganaveen3@gmail.com',
      subject: 'Test Email - Homely Bakes',
      text: 'This is a test email to verify email configuration is working.'
    });
    
    console.log('✅ Test email sent successfully:', result.messageId);
    
  } catch (error) {
    console.error('❌ Email test failed:');
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);
    
    if (error.code === 'EAUTH') {
      console.log('\n🔧 Gmail Authentication Fix:');
      console.log('1. Go to https://myaccount.google.com/security');
      console.log('2. Enable 2-Step Verification');
      console.log('3. Go to App Passwords');
      console.log('4. Generate new password for "Mail"');
      console.log('5. Update .env file with new password');
    }
  }
}

testEmail();