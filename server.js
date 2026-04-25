/* global process */
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

app.post('/api/register', async (req, res) => {
  let { name, email, college, phone, events, eventName } = req.body;
  email = email ? email.trim() : "";
  console.log(`[RECV] Registration attempt: ${name} (${email}) for ${eventName || events.join(',')}`);

  if (!name || !email) {
    console.log('[WARN] Missing name or email');
    return res.status(400).json({ error: 'Name and email are required.' });
  }

  const websiteLink = 'https://instellation.vercel.app/';
  const brochureLink = `${websiteLink}INSTELLATION BROUCHER.pdf`;
  const eventDisplayName = eventName || (events && events.length > 0 ? events.join(', ') : 'Your Event');

  // --- STUDENT EMAIL OPTIONS ---
  const studentMailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    replyTo: process.env.EMAIL_USER,
    subject: `Registration Confirmed: ${eventDisplayName} — Instellation 2026`,
    text: `Hi ${name},\n\nThank you for registering for ${eventDisplayName} in Instellation 2026 from DSATM. Your mission coordinates have been secured.\n\nWebsite: ${websiteLink}\nBrochure: ${brochureLink}\n\nBest regards,\nInstellation Team`,
    html: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #ffffff; background: #070b14; padding: 40px; border: 1px solid rgba(200, 170, 70, 0.2); border-radius: 12px; box-shadow: 0 10px 40px rgba(0,0,0,0.5);">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #c9a84c; text-transform: uppercase; letter-spacing: 4px; font-weight: 800; margin: 0; font-size: 32px;">Instellation</h1>
          <p style="color: rgba(255,255,255,0.6); margin-top: 5px; font-size: 14px;">Celestial Technical Fest • DSATM MCA</p>
        </div>
        
        <div style="background: rgba(255,255,255,0.03); padding: 30px; border-radius: 8px; border-left: 4px solid #c9a84c;">
          <h2 style="color: #ffffff; margin-top: 0;">Welcome to the Galaxy, Cadet ${name}!</h2>
          <p style="line-height: 1.8; color: #dfe3e8; font-size: 16px;">
            Thank you for registering for <strong>${eventDisplayName}</strong> in <strong>Instellation 2026</strong> from DSATM. 
            Your mission coordinates have been secured, and you are now part of our interstellar journey of logic, creativity, and skill.
          </p>
        </div>

        <div style="margin: 30px 0;">
          <p style="color: rgba(255,255,255,0.7); font-size: 14px; line-height: 1.6;">
            Please ensure you have entered your <strong>12-digit UTR ID</strong> accurately in the registration form to finalize your slots. 
            Our team will verify your payment and details soon.
          </p>
        </div>

        <div style="display: flex; gap: 15px; margin-top: 40px; text-align: center;">
          <a href="${websiteLink}" style="flex: 1; background: #c9a84c; color: #000; text-decoration: none; padding: 15px 25px; border-radius: 6px; font-weight: 700; font-size: 14px; letter-spacing: 1px; display: inline-block;">Official Website</a>
          <a href="${brochureLink}" style="flex: 1; border: 1px solid #c9a84c; color: #c9a84c; text-decoration: none; padding: 15px 25px; border-radius: 6px; font-weight: 600; font-size: 14px; letter-spacing: 1px; display: inline-block; margin-left: 10px;">Download Brochure</a>
        </div>

        <div style="margin-top: 40px; text-align: center; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 30px;">
          <p style="color: rgba(255,255,255,0.4); font-size: 12px;">
            Department of Computer Applications (MCA) <br/>
            Dayananda Sagar Academy of Technology and Management <br/>
            &copy; 2026 Instellation. All rights reserved.
          </p>
        </div>
      </div>
    `
  };

  // --- ADMIN EMAIL OPTIONS ---
  const adminMailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    replyTo: email,
    subject: `New Registration: ${name}`,
    html: `
      <h2>New Cadet Registered!</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>College:</strong> ${college}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Event:</strong> ${eventDisplayName}</p>
    `
  };

  // 1. ATTEMPT STUDENT CONFIRMATION (Prioritized)
  try {
    console.log(`[MAIL] Attempting student confirmation to: ${email}`);
    const studentInfo = await transporter.sendMail(studentMailOptions);
    console.log(`[SUCCESS] Student confirmation sent: ${studentInfo.accepted[0]} - ${studentInfo.response}`);
  } catch (studentErr) {
    console.error('[ERROR] Student confirmation failed:', studentErr.message);
  }

  // 2. ATTEMPT ADMIN NOTIFICATION
  try {
    console.log('[MAIL] Attempting admin notification...');
    const adminInfo = await transporter.sendMail(adminMailOptions);
    console.log('[SUCCESS] Admin notification sent: ' + adminInfo.response);
  } catch (adminErr) {
    console.error('[ERROR] Admin notification failed:', adminErr.message);
  }

  // 3. Attempt Google Sheets Webhook
  const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK;
  if (webhookUrl) {
    try {
      console.log('[SHEET] Attempting webhook...');
      const sheetData = { name, email, college, phone, events: events.join(', '), eventName: eventDisplayName };
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sheetData)
      });
      console.log('[SUCCESS] Data appended to Google Sheets.');
    } catch (sheetError) {
      console.error('[ERROR] Google Sheets forwarding failed:', sheetError);
    }
  }

  res.status(200).json({ message: 'Transmission successful!' });
});

app.post('/api/contact', async (req, res) => {
  let { name, email, phone, college, message } = req.body;
  email = email ? email.trim() : "";
  console.log(`[RECV] Contact attempt: ${name} (${email}) from ${college}`);

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  const adminMailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    replyTo: email,
    subject: `New Contact Query: ${name} — Instellation 2026`,
    html: `
      <h2>🚀 Incoming Transmission Received!</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
      <p><strong>College:</strong> ${college || 'N/A'}</p>
      <hr />
      <h3>Message Payload:</h3>
      <p style="white-space: pre-wrap;">${message}</p>
    `
  };

  try {
    const adminInfo = await transporter.sendMail(adminMailOptions);
    console.log('[SUCCESS] Contact notification sent: ' + adminInfo.response);
    return res.status(200).json({ message: 'Transmission successful!' });
  } catch (adminErr) {
    console.error('[ERROR] Contact notification failed:', adminErr.message);
    return res.status(500).json({ error: 'Failed to send the message.' });
  }
});

app.listen(PORT, () => console.log(`Backend server listening at http://localhost:${PORT}`));
