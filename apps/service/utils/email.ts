// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
// javascript
// const sgMail = require('@sendgrid/mail');
import sgMail, { MailDataRequired } from '@sendgrid/mail';

export const sendRequestAutoReplyEmail: (
  to: string | Array<string>,
  data: Object
) => void = (to, data) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY ?? '');
  const msg = {
    to: to,
    from: {
      name: 'Optimized Closets',
      email: 'info@optimizedclosets.ca',
    },
    templateId: process.env.SENDGRID_REQUEST_AUTO_REPLY_TEMPLATE_ID,
    dynamicTemplateData: data,
  };
  sgMail
    .send(msg as MailDataRequired)
    .then(() => {
      console.log('Email sent');
    })
    .catch((error: any) => {
      console.error(error);
    });
};
export const sendRequestAlarmEmail: (
  to: string | Array<string>,
  data: Object
) => void = (to, data) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY ?? '');
  const msg = {
    to: to,
    from: {
      name: 'Optimized Closets',
      email: 'info@optimizedclosets.ca',
    },
    templateId: process.env.SENDGRID_REQUEST_ALARM_TEMPLATE_ID,
    dynamicTemplateData: data,
  };
  sgMail
    .send(msg as MailDataRequired)
    .then(() => {
      console.log('Email sent');
    })
    .catch((error: any) => {
      console.error(error);
    });
};
