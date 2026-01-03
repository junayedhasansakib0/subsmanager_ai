/**
 * Email Service
 * Handles sending emails via Gmail SMTP using Nodemailer
 * 
 * Features:
 * - Email verification
 * - Password reset (future)
 * - Welcome emails (future)
 */

import nodemailer from 'nodemailer';

/**
 * Create email transporter
 */
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT) || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS // App password, not regular password
    }
  });
};

/**
 * Get frontend URL with proper formatting
 * @returns {string} - Formatted frontend URL
 */
const getFrontendUrl = () => {
  const frontendUrl = process.env.FRONTEND_URL;
  
  if (!frontendUrl) {
    console.warn('⚠️  WARNING: FRONTEND_URL not set in environment variables!');
    // Fallback for development (matches vite.config.ts port)
    return 'http://localhost:8080';
  }
  
  // Remove trailing slash if present
  return frontendUrl.replace(/\/$/, '');
};

/**
 * Send email verification
 * @param {string} email - Recipient email
 * @param {string} name - Recipient name
 * @param {string} token - Verification token
 * @param {string} language - Language preference ('en' or 'bn')
 */
export const sendVerificationEmail = async (email, name, token, language = 'en') => {
  try {
    // Validate token
    if (!token || token.length < 32) {
      throw new Error('Invalid verification token');
    }
    
    // Get properly formatted frontend URL
    const baseUrl = getFrontendUrl();
    const verifyUrl = `${baseUrl}/verify-email?token=${token}`;
    
    // Log the URL in development for debugging (don't log in production for security)
    if (process.env.NODE_ENV === 'development') {
      console.log(`📧 Verification URL: ${verifyUrl}`);
    }

    const translations = {
      en: {
        subject: 'Verify Your Email - SubsManager AI',
        greeting: `Hello ${name},`,
        message: 'Thank you for signing up! Please verify your email address by clicking the button below:',
        button: 'Verify Email',
        alternative: 'Or copy and paste this link into your browser:',
        footer: 'This link will expire in 24 hours. If you did not create an account, please ignore this email.',
        regards: 'Best regards,',
        team: 'SubsManager AI Team'
      },
      bn: {
        subject: 'আপনার ইমেইল যাচাই করুন - SubsManager AI',
        greeting: `হ্যালো ${name},`,
        message: 'সাইন আপ করার জন্য ধন্যবাদ! নীচের বোতামে ক্লিক করে আপনার ইমেইল ঠিকানা যাচাই করুন:',
        button: 'ইমেইল যাচাই করুন',
        alternative: 'অথবা এই লিঙ্কটি কপি করে আপনার ব্রাউজারে পেস্ট করুন:',
        footer: 'এই লিঙ্কটি 24 ঘন্টার মধ্যে মেয়াদ শেষ হবে। আপনি যদি অ্যাকাউন্ট তৈরি না করে থাকেন, অনুগ্রহ করে এই ইমেইলটি উপেক্ষা করুন।',
        regards: 'শুভেচ্ছা সহ,',
        team: 'SubsManager AI টিম'
      }
    };

    const t = translations[language] || translations.en;

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${t.subject}</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0;">SubsManager AI</h1>
        </div>
        <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
          <p style="font-size: 16px;">${t.greeting}</p>
          <p style="font-size: 16px;">${t.message}</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verifyUrl}" 
               style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                      color: white; 
                      padding: 15px 30px; 
                      text-decoration: none; 
                      border-radius: 5px; 
                      display: inline-block; 
                      font-weight: bold;">
              ${t.button}
            </a>
          </div>
          <p style="font-size: 14px; color: #666;">
            ${t.alternative}<br>
            <a href="${verifyUrl}" style="color: #667eea; word-break: break-all;">${verifyUrl}</a>
          </p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
          <p style="font-size: 12px; color: #999;">
            ${t.footer}
          </p>
          <p style="font-size: 11px; color: #bbb; margin-top: 10px;">
            ${language === 'bn' 
              ? 'এই লিঙ্কটি একবার ব্যবহার করা যাবে।' 
              : 'This link can only be used once.'}
          </p>
          <p style="font-size: 14px; margin-top: 20px;">
            ${t.regards}<br>
            <strong>${t.team}</strong>
          </p>
        </div>
      </body>
      </html>
    `;

    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: email,
      subject: t.subject,
      html: htmlContent
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Verification email sent to ${email}: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Error sending verification email:', error);
    throw new Error('Failed to send verification email');
  }
};

/**
 * Test email configuration
 */
export const testEmailConfig = async () => {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    console.log('✅ Email server is ready');
    return true;
  } catch (error) {
    console.error('❌ Email configuration error:', error);
    return false;
  }
};

