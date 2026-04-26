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
  let { name, email, college, phone, events, eventName, team, year, department, upi, teamMembers } = req.body;
  email = email ? email.trim() : "";
  const eventNameLog = eventName || (events && events.length > 0 ? events.join(',') : 'Unknown');
  console.log(`[RECV] Registration attempt: ${name} (${email}) for ${eventNameLog}`);

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
    subject: `New Registration: ${name} — ${eventDisplayName}`,
    html: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; background: #0d1117; color: #c9d1d9; border: 1px solid #30363d; border-radius: 8px;">
        <h2 style="color: #c9a84c; margin-top: 0;">🚀 New Cadet Registered!</h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
          <tr><td style="padding: 8px 12px; color: #8b949e; border-bottom: 1px solid #21262d;">Name</td><td style="padding: 8px 12px; color: #f0f6fc; border-bottom: 1px solid #21262d;"><strong>${name}</strong></td></tr>
          <tr><td style="padding: 8px 12px; color: #8b949e; border-bottom: 1px solid #21262d;">Email</td><td style="padding: 8px 12px; color: #f0f6fc; border-bottom: 1px solid #21262d;">${email}</td></tr>
          <tr><td style="padding: 8px 12px; color: #8b949e; border-bottom: 1px solid #21262d;">College</td><td style="padding: 8px 12px; color: #f0f6fc; border-bottom: 1px solid #21262d;">${college}</td></tr>
          <tr><td style="padding: 8px 12px; color: #8b949e; border-bottom: 1px solid #21262d;">Phone</td><td style="padding: 8px 12px; color: #f0f6fc; border-bottom: 1px solid #21262d;">${phone}</td></tr>
          <tr><td style="padding: 8px 12px; color: #8b949e; border-bottom: 1px solid #21262d;">Year/Dept</td><td style="padding: 8px 12px; color: #f0f6fc; border-bottom: 1px solid #21262d;">${year} / ${department}</td></tr>
          <tr><td style="padding: 8px 12px; color: #8b949e; border-bottom: 1px solid #21262d;">Event</td><td style="padding: 8px 12px; color: #c9a84c;"><strong>${eventDisplayName}</strong></td></tr>
          <tr><td style="padding: 8px 12px; color: #8b949e; border-bottom: 1px solid #21262d;">Team Name</td><td style="padding: 8px 12px; color: #f0f6fc; border-bottom: 1px solid #21262d;">${team || 'N/A'}</td></tr>
          ${teamMembers && teamMembers.length > 0 ? `<tr><td style="padding: 8px 12px; color: #8b949e; border-bottom: 1px solid #21262d;">Team Members</td><td style="padding: 8px 12px; color: #f0f6fc; border-bottom: 1px solid #21262d;">${teamMembers.filter(m => m.trim() !== '').join(', ')}</td></tr>` : ''}
          <tr><td style="padding: 8px 12px; color: #8b949e;">UTR ID</td><td style="padding: 8px 12px; color: #f0f6fc;"><code>${upi}</code></td></tr>
        </table>
      </div>
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
      const sheetData = {
        name,
        email,
        college,
        phone,
        events: events ? events.join(', ') : '',
        eventName,
        team: team || 'N/A',
        teamMembers: teamMembers ? teamMembers.filter(m => m.trim() !== '').join(', ') : 'None',
        year,
        department,
        upi
      };
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
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; background: #0d1117; color: #c9d1d9; border: 1px solid #30363d; border-radius: 8px;">
        <h2 style="color: #c9a84c; margin-top: 0;">🛰️ Incoming Transmission Received!</h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
          <tr><td style="padding: 8px 12px; color: #8b949e; border-bottom: 1px solid #21262d; width: 120px;">Name</td><td style="padding: 8px 12px; color: #f0f6fc; border-bottom: 1px solid #21262d;"><strong>${name}</strong></td></tr>
          <tr><td style="padding: 8px 12px; color: #8b949e; border-bottom: 1px solid #21262d;">Email</td><td style="padding: 8px 12px; color: #f0f6fc; border-bottom: 1px solid #21262d;"><a href="mailto:${email}" style="color: #58a6ff;">${email}</a></td></tr>
          <tr><td style="padding: 8px 12px; color: #8b949e; border-bottom: 1px solid #21262d;">Phone</td><td style="padding: 8px 12px; color: #f0f6fc; border-bottom: 1px solid #21262d;">${phone || 'N/A'}</td></tr>
          <tr><td style="padding: 8px 12px; color: #8b949e; border-bottom: 1px solid #21262d;">College</td><td style="padding: 8px 12px; color: #f0f6fc; border-bottom: 1px solid #21262d;">${college || 'N/A'}</td></tr>
        </table>
        <div style="margin-top: 25px; padding: 20px; background: rgba(2, 4, 8, 0.6); border-left: 3px solid #c9a84c; border-radius: 4px;">
          <h3 style="margin-top: 0; color: #8b949e; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Message Payload:</h3>
          <p style="color: #f0f6fc; line-height: 1.6; white-space: pre-wrap; margin-bottom: 0;">${message}</p>
        </div>
      </div>
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

export default app;
