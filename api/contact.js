// Vercel Serverless Function: /api/contact
// Handles contact form submissions and sends them directly to Gmail via Resend

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }

  try {
    const { name, email, subject, message } = req.body || {};

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Please fill in all required fields (Name, Email, Message).' });
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Please provide a valid email address.' });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("Missing RESEND_API_KEY environment variable.");
      return res.status(500).json({ error: "Server configuration error: RESEND_API_KEY is not set in Vercel environment variables." });
    }

    const targetEmail = 'zahidudd0.in@gmail.com';
    const cleanSubject = subject ? String(subject).trim() : 'New Portfolio Project Inquiry';

    // Build modern styled HTML email
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #140E0A; color: #DAC5A7; margin: 0; padding: 24px; }
          .container { max-width: 580px; margin: 0 auto; background: #1C1713; border: 1px solid rgba(232, 141, 74, 0.25); border-radius: 12px; overflow: hidden; }
          .header { background: #140E0A; padding: 24px; border-bottom: 1px solid rgba(232, 141, 74, 0.2); }
          .brand { font-size: 20px; font-weight: bold; color: #DAC5A7; text-decoration: none; }
          .brand-dot { color: #E88D4A; }
          .title { font-size: 14px; color: rgba(218, 197, 167, 0.6); text-transform: uppercase; letter-spacing: 1px; margin-top: 4px; }
          .content { padding: 28px 24px; }
          .field-group { margin-bottom: 20px; }
          .label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: #E88D4A; font-weight: 600; margin-bottom: 6px; }
          .value { font-size: 15px; color: #F6F1E9; line-height: 1.6; }
          .message-box { background: #140E0A; border-left: 3px solid #E88D4A; padding: 16px 18px; border-radius: 0 8px 8px 0; color: #F6F1E9; font-size: 15px; line-height: 1.7; white-space: pre-wrap; word-break: break-word; }
          .footer { background: #140E0A; padding: 18px 24px; font-size: 12px; color: rgba(218, 197, 167, 0.5); border-top: 1px solid rgba(232, 141, 74, 0.15); }
          .reply-btn { display: inline-block; background: #E88D4A; color: #140E0A; font-weight: 600; padding: 10px 20px; border-radius: 6px; text-decoration: none; margin-top: 10px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="brand">zuddin<span class="brand-dot">.</span></div>
            <div class="title">New Client Contact Form Submission</div>
          </div>
          <div class="content">
            <div class="field-group">
              <div class="label">From</div>
              <div class="value"><strong>${escapeHtml(name)}</strong> &lt;<a href="mailto:${escapeHtml(email)}" style="color:#E88D4A;">${escapeHtml(email)}</a>&gt;</div>
            </div>
            <div class="field-group">
              <div class="label">Subject / Project Scope</div>
              <div class="value">${escapeHtml(cleanSubject)}</div>
            </div>
            <div class="field-group">
              <div class="label">Message</div>
              <div class="message-box">${escapeHtml(message)}</div>
            </div>
            <a href="mailto:${escapeHtml(email)}?subject=${encodeURIComponent('Re: ' + cleanSubject)}" class="reply-btn">Reply to ${escapeHtml(name)} &rarr;</a>
          </div>
          <div class="footer">
            Sent from portfolio site contact form &bull; Received at ${new Date().toUTCString()}
          </div>
        </div>
      </body>
      </html>
    `;

    // Send email via Resend REST API
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'onboarding@resend.dev',
        to: targetEmail,
        reply_to: email,
        subject: `[Portfolio Inquiry] ${cleanSubject} - from ${name}`,
        html: htmlContent
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Resend API Error:', data);
      return res.status(response.status).json({
        error: data.message || 'Failed to send email through Resend API.'
      });
    }

    return res.status(200).json({
      success: true,
      id: data.id,
      message: 'Message delivered to Zahid Uddin successfully.'
    });

  } catch (error) {
    console.error('Serverless function error:', error);
    return res.status(500).json({ error: 'Internal server error while processing message.' });
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
