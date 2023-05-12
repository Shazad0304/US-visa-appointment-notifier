const nodemailer = require("nodemailer");

const config = require("./config");
const transporter = nodemailer.createTransport({
  host: config.smtp.HOST,
  port: "587",
  auth: { user: config.smtp.USER, pass: config.smtp.PASS },
  secureConnection: false,
  tls: { ciphers: "SSLv3" },
});

const debug = async (page, logName, saveScreenShot) => {
  if (saveScreenShot) {
    await page.screenshot({ path: `${logName}.png` });
  }

  await page.evaluate(() => {
    debugger;
  });
};

const delay = (timeout) =>
  new Promise((resolve) => setTimeout(resolve, timeout));

const logStep = (stepTitle) => {
  console.log("=====>>> Step:", stepTitle);
};

const sendEmail = async (params) => {
  const data = {
    from: "No reply <noreply@visa-schedule-check>",
    to: config.NOTIFY_EMAILS,
    subject: "Hello US VISA schedules",
    ...params,
  };
  await transporter.sendMail(data, function (error, info) {
    if (error) {
      logStep(`sending an email failed ${error}`);
    } else {
      logStep(`sending an email success`);
    }
  });
};

module.exports = {
  debug,
  delay,
  sendEmail,
  logStep,
};
