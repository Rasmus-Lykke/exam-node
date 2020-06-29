const nodemailer = require("nodemailer");
const config = require('./config/email.json');

async function main() {
  // create reusable transporter object
  let transporter = nodemailer.createTransport( {
    service: "Gmail",  // Tell nodemailer which server you are using
    auth: {
      user: config.email, // Input you email in the config/email.json file
      pass: config.password // Input you email accounts password in the config/email.json file
    }
  });

  // Send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"YOUR NAME" <YOUR EMAIl>', // sender address
    to: "recipient1@email.com, recipient2@email.com", // list of recipients
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);