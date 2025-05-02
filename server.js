require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const PROFANITY_LIST = [
    'merde', 'putain', 'connard', 'con', 'pute', 'enculé', 'salope',
    'fuck', 'shit', 'ass', 'bitch', 'bastard'
];

const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

function containsProfanity(text) {
    if (!text) return false;

    const lowerText = text.toLowerCase();
    return PROFANITY_LIST.some(word => lowerText.includes(word));
}

app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: 'Veuillez fournir un nom, un email et un message.'
            });
        }

        const allText = `${name} ${message}`.toLowerCase();

        if (containsProfanity(allText)) {
            return res.status(400).json({
                success: false,
                message: 'Votre message contient un langage inapproprié. Veuillez reformuler votre message.'
            });
        }

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.DESTINATION_EMAIL || process.env.EMAIL_USER,
            subject: 'Portfolio Contact: Nouveau message de votre portfolio',
            html: `
        <h2>Nouveau message de contact</h2>
        <p><strong>Nom:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({
            success: true,
            message: 'Votre message a été envoyé avec succès. Merci de m\'avoir contacté!'
        });

    } catch (error) {
        console.error('Erreur lors de l\'envoi du message:', error);
        res.status(500).json({
            success: false,
            message: 'Une erreur est survenue lors de l\'envoi de votre message. Veuillez réessayer plus tard.'
        });
    }
});

app.get('/', (req, res) => {
    res.send('API de contact pour portfolio - Fonctionnelle');
});

app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});