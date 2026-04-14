import nodemailer from "nodemailer";

const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "saishj2903@gmail.com",
      pass: "swnb pqcw bfte rmwl",
    },
  });
};

export const sendMail = async (to, subject, html, text) => {
  const transporter = createTransporter();
  const mailOptions = {
    from: "saishj2903@gmail.com",
    to,
    subject,
    text: text || undefined,
    html: html || undefined,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info);
    return info;
  } catch (error) {
    console.log("Email send error:", error);
    throw error;
  }
};
