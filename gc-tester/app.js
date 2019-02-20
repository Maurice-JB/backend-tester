const express = require('express');
const fs = require('fs');
const https = require('https');
const cors = require('cors');
const app = express();
const port = 4069;

app.use(cors());
app.options('*', cors());
app.use(express.json());

function getDateTime() {
    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour - 1;
    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;
    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;
    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return year + "-" + month + "-" + day + "// " + hour + ":" + min + ":" + sec;
}

app.post('/gc-test', (req, res, next) => {
    console.log(`\n${getDateTime()}:: Request Received: `)
    console.log(req.body);
    // req.body:
    /*
        {
            "query": "9767c207d0b3a7313fad22292c64ba04gd4f"
        }
    */

    const response = {
        is_available: true,
        viiBalance: 5000,
        shopifyGiftCardAmount: 5000,
        gift_card_number: '502904030362250051',
    }
    console.log(`Response Sent: `)
    console.log(`${JSON.stringify(response)}`)
    res.status(200).send(JSON.stringify(response));
})

https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
}, app)
    .listen(port, () => {
        console.log(`HTTPS-enabled app listening on port ${port}`)
    })