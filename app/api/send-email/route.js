import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/nodemailer';

export async function POST(request) {
  try {
    const { name, email, message } = await request.json();

    if (!email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const result = await sendEmail({
      to: process.env.EMAIL_USER,
      subject: `New Enquiry from ${name || 'User'}`,
      text: message,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #111;">
          <h2 style="color: #EA580C;">New Contact / Enquiry</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p style="background: #F7F8FA; padding: 15px; border-radius: 8px;">${message}</p>
        </div>
      `,
    });

    if (result.success) {
      return NextResponse.json({ message: 'Email sent successfully!' }, { status: 200 });
    } else {
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}