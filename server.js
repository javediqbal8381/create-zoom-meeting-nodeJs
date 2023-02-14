const cors = require("cors");
const dotEnv = require("dotenv");
const express = require("express");
const requestPromise = require("request-promise");
const jwt = require("jsonwebtoken");
// require("dotenv").config();

const app = express();

//registering middlewares
dotEnv.config();
app.use(cors());
app.use(express.json());


const payload = {
    iss: process.env.API_KEY, //your API KEY
    exp: new Date().getTime() + 5000,
};
const token = jwt.sign(payload, process.env.API_SECRET); //your API SECRET HERE
//end-point
app.get("/createMeeting", (req, res) => {
    email = "javediqbal8381@gmail.com"; // your zoom developer email account
    var options = {
        method: "POST",
        uri: "https://api.zoom.us/v2/users/" + email + "/meetings",
        body: {
            topic: "Zoom Meeting Using Node JS", //meeting title
            type: 1,
            settings: {
                host_video: "true",
                participant_video: "true",
            },
        },
        auth: {
            bearer: token,
        },
        headers: {
            "User-Agent": "Zoom-api-Jwt-Request",
            "content-type": "application/json",
        },
        json: true, //Parse the JSON string in the response
    };

    requestPromise(options)
        .then(function (response) {
            console.log("response is: ", response);
            res.send("create meeting result: " + JSON.stringify(response.start_url));
        })
        .catch(function (err) {
            // API call failed...
            console.log("API call failed, reason ", err);
        });
});




//listening to port
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});