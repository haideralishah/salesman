/// <reference path="./typings/tsd.d.ts" />
import {initializeModels} from "./dataModel";


import setUpPassport from "./setuppassport";
import express = require("express");

import logger = require("morgan");


import bodyParser = require("body-parser");
import cookieParser = require("cookie-parser");
import session = require("express-session");
import flash = require("connect-flash");
import mongoose = require("mongoose");
import passport = require("passport");
import path = require("path");


let http = require("http");
let app = express();

app.set("port", process.env.PORT || 3000);

app.use(logger("short"));



// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());

// app.use(session({
//     secret: "LUp$Dg?,I#i&owP3=9su+OB%`JgL4muLF5YJ~{;t",
//     resave: true,
//     saveUninitialized: true
// }));

// app.use(flash());

// app.use(passport.initialize());
// app.use(passport.session());




let publicPath = path.resolve(__dirname + "/Web");
app.use("/", express.static(publicPath));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

initializeModels(app);

// app.get("/", (request:express.Request, response:express.Response) => { 
// 	response.sendFile("/index.html");
	
// });


// app.post("/signup", (request:express.Request, response:express.Response) => { 
	
// 	console.log(request.body);
// 	response.end();
// })

app.listen(app.get("port"), function() {
    console.log("App started on port " + app.get("port"));
});