import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendResetEmail(email, resetLink) {
  try {
    const { data, error } = await resend.emails.send({
      from: `SecureExam <${process.env.FROM_EMAIL}>`,
      to: [email],
      subject: "Reset Your Password - SecureExam",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Reset Password</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1f2937; background: #f9fafb; margin: 0; padding: 20px; }
            .container { max-width: 500px; margin: 0 auto; background: white; border-radius: 24px; padding: 32px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); border: 1px solid #e5e7eb; }
            .header { text-align: center; margin-bottom: 24px; }
            .logo { background: #0D7C66; width: 56px; height: 56px; border-radius: 16px; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 16px; }
            .logo span { font-size: 28px; color: white; }
            h2 { color: #0D7C66; margin: 0 0 8px; font-size: 24px; }
            .button { display: inline-block; background: #0D7C66; color: white; padding: 14px 28px; text-decoration: none; border-radius: 12px; font-weight: 500; margin: 24px 0; transition: background 0.2s; }
            .button:hover { background: #41B3A2; }
            .warning { background: #fef3c7; padding: 12px; border-radius: 12px; font-size: 13px; color: #92400e; margin: 20px 0; }
            .footer { margin-top: 24px; padding-top: 16px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280; text-align: center; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo"><span>🔐</span></div>
              <h2>SecureExam</h2>
              <p style="color: #6b7280; margin: 0;">Password Reset Request</p>
            </div>
            <p>Hello,</p>
            <p>We received a request to reset your password for your SecureExam account.</p>
            <div style="text-align: center;">
              <a href="${resetLink}" class="button">Reset Password</a>
            </div>
            <div class="warning">
              <strong>⚠️ This link will expire in 1 hour.</strong>
            </div>
            <p>If you didn't request this, please ignore this email.</p>
            <div class="footer">
              <p>SecureExam - Secure Online Examination System</p>
              <p>© ${new Date().getFullYear()} SecureExam. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return { success: false };
    }

    console.log(`Reset email sent to ${email}`);
    return { success: true };
  } catch (error) {
    console.error("Email error:", error);
    return { success: false };
  }
}
