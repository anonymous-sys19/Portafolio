const express = require('express');
const router = express.Router()
const nodemailer = require("nodemailer");
const { google } = require('googleapis');

router.get('/', (req, res) => res.render('tasks/index'));
router.get('/portafolio', (req, res) => res.render('tasks/index'));


router.post("/json", (req, res) => {
    const { name, email, phone, message } = req.body;
    const contentHTML = `
    <h1>Formulario</h1>
    <ul>
    <li>name: ${name}</li>
    <li>email: ${email}</li>
    <li>phone: ${phone}</li>
    </ul>
    <p>message: ${message}</p>
    `

    const CLIENT_ID = "1074303537600-89m0rjsbh75bfg1m7l9d1hm8p32m0ir4.apps.googleusercontent.com"
    const CLIENT_SECRET = "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"
    const REDIRECT_URI = "https://developers.google.com/oauthplayground"
    const REFRESH_TOKEN = "1//04eG_sYlTk1r_CgYIARAAGAQSNwF-L9IrMW5T-X6WTUzn407Al8onFiTNlM1VnEDqIONpMhEFrY75gSMwNj78b4hQwPUWuBC9vyw"
    //"1//0451CnsstlLVuCgYIARAAGAQSNwF-L9IrxLmSg3pQiAunipNMuLzq1Bg3y824ElJ3aFeDsW_PSNJ_9FgRUSt8oXSAWlQFX9p96dI"

    const oauth2Client = new google.auth.OAuth2(
        CLIENT_ID,
        CLIENT_SECRET,
        REDIRECT_URI
    );
    oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })



    async function sendMail() {
        try {
            const accessToken =await oauth2Client.getAccessToken();
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    type:"OAuth2",
                    user:"estudiosrg5@gmail.com",
                    clientId:CLIENT_ID,
                    clientSecret:CLIENT_SECRET,
                    refreshToken:REFRESH_TOKEN,
                    accessToken: accessToken
                }
            })
            const mailOptions = {
                from: "Pagina-web Portafolio👻 <estudiosrg5@gmail.com>", // sender address
                to: "estudiosrg5@gmail.com", // list of receivers
                subject: "Portafolio Contact ✔", // Subject line
                html: contentHTML // html body
            }
            const result = await transporter.sendMail(mailOptions)
            return result;

        } catch (error) {
            console.log(error);

        }
    }

    sendMail()
        .then(result => res.status(200).redirect('portafolio'))
        .catch(err => res.json({err}))
})
//router.put('/tasks/send', mailSend.mailOptions);

module.exports = router;
