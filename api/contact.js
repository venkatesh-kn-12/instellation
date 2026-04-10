import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  let { name, email, phone, college, message } = req.body;
  email = email ? email.trim() : "";
  console.log(`[RECV] Contact attempt: ${name} (${email}) from ${college}`);

  if (!name || !email || !message) {
    console.log('[WARN] Missing required contact fields');
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  const EMAIL_USER = process.env.EMAIL_USER;
  const EMAIL_PASS = process.env.EMAIL_PASS;

  if (!EMAIL_USER || !EMAIL_PASS) {
    console.error('[ERROR] EMAIL_USER or EMAIL_PASS environment variables not set');
    return res.status(500).json({ error: 'Server email configuration missing.' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS
    }
  });

  // --- ADMIN EMAIL OPTIONS ---
  const adminMailOptions = {
    from: EMAIL_USER,
    to: EMAIL_USER,
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
    console.log('[MAIL] Attempting admin notification for contact...');
    const adminInfo = await transporter.sendMail(adminMailOptions);
    console.log('[SUCCESS] Admin notification sent: ' + adminInfo.response);
    return res.status(200).json({ message: 'Transmission successful!' });
  } catch (adminErr) {
    console.error('[ERROR] Admin notification failed:', adminErr.message);
    return res.status(500).json({ error: 'Failed to send the message. Please try again.' });
  }
}
