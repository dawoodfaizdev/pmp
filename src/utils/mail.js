import nodemailer from "nodemailer";
import Mailgen from "mailgen";

const emailVeificationTemplate = (name, verificationLink) => {
    return {
        body: {
            name: name,
            intro: `Welcome to ${process.env.APP_NAME}! We're excited to have you on board. Please verify your email address to get started.`,
            action: {
                instructions:
                    "Please click the button below to verify your email address:",
                button: {
                    color: "#22BC66",
                    text: "Verify your email",
                    link: verificationLink,
                },
            },
            outro: "Need help, or have questions? Just reply to this email, we'd love to help.",
        },
    };
};

const passwordResetTemplate = (name, resetLink) => {
    return {
        body: {
            name: name,
            intro: "You have requested to reset your password.",
            action: {
                instructions:
                    "Please click the button below to reset your password:",
                button: {
                    color: "#DC4D2F",
                    text: "Reset your password",
                    link: resetLink,
                },
            },
            outro: "If you did not request a password reset, please ignore this email.",
        },
    };
};

const sendEmail = async (options) => {
    var mailGeneratorOptions = {
        theme: "default",
        product: {
            name: process.env.APP_NAME,
            link: process.env.APP_URL,
        },
    };

    const mailGenerator = new Mailgen(mailGeneratorOptions);
    const emailBodyText = mailGenerator.generatePlaintext(options.contents);
    const emailBodyHtml = mailGenerator.generate(options.contents);

    const transporterOptions = {
        host: process.env.MAILTRAP_SMTP_HOST,
        port: process.env.MAILTRAP_SMTP_PORT,
        secure: true,
        auth: {
            user: process.env.MAILTRAP_SMTP_USER,
            pass: process.env.MAILTRAP_SMTP_PASS,
        },
    };

    const transporter = nodemailer.createTransport(transporterOptions);

    const mailOptions = {
        from: options.from,
        to: options.to,
        subject: options.subject,
        text: emailBodyText,
        html: emailBodyHtml,
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error("Error sending email:", error);
    }
};

export { emailVeificationTemplate, passwordResetTemplate, sendEmail };
