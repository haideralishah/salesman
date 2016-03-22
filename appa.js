/// <reference path="./typings/tsd.d.ts" />
var dataModel_1 = require("./dataModel");
var express = require("express");
var logger = require("morgan");
var bodyParser = require("body-parser");
var path = require("path");
var http = require("http");
var app = express();
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
var publicPath = path.resolve(__dirname + "/Web");
app.use("/", express.static(publicPath));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
dataModel_1.initializeModels(app);
// app.get("/", (request:express.Request, response:express.Response) => { 
// 	response.sendFile("/index.html");
// });
// app.post("/signup", (request:express.Request, response:express.Response) => { 
// 	console.log(request.body);
// 	response.end();
// })
app.listen(app.get("port"), function () {
    console.log("App started on port " + app.get("port"));
});
