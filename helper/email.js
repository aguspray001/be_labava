const nodemailer = require("nodemailer");
const dotenv = require("dotenv").config();

module.exports = {
  sendEmail: (mailOptions) => {
    const passApp = process.env.PASS_APP;

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // Use SSL
      auth: {
        user: "aguspray001@gmail.com",
        pass: "lmstgrdewkmkreje",
      },
    });

    transporter.verify(function (error, success) {
      if (error) {
        console.log(error);
        return { status: false, message: error };
      } else {
        console.log("Server is ready to take our messages");
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(error);
            return { status: false, message: error };
          } else {
            console.log(info);
            return { status: true, message: info };
          }
        });
      }
    });

  },
};
