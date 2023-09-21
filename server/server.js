require('dotenv').config();

const express = require("express");
const app = express();
const port = 5000;
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const crypto = require('crypto');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const smskey =  process.env.SMS_SECRET_KEY;
let twilioNum = process.env.TWILIO_PHONE_NUMBER;

const client = require('twilio')(accountSid, authToken);

app.post("/sendOTP", (req, res)=>{
        const { phone } = req.body;
        const otp = Math.floor(100000 + Math.random() * 900000);
        const ttl = 2*60*1000;
        let expires = Date.now();
        expires+=ttl;
        const data = `${phone}.${otp}.${expires}`;
        const hash = crypto.createHmac('sha256', smskey).update(data).digest('hex');
        const fullHash = `${hash}.${expires}`;
});

app.listen(port, ()=>{
    console.log(`listening on ${port}`);
});