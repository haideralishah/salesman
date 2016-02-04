/// <reference path="./typings/tsd.d.ts" />

import mongoose = require("mongoose");

import Firebase = require("firebase");

let bcrypt = require("bcrypt-nodejs");




let SALT_FACTOR = 10;


let connection = mongoose.connect("mongodb://localhost/salesManApplication");




let userSchema = new mongoose.Schema({
    FirstName: { type: String, required: true },
    LastName: { type: String, required: true },
    Email: { type: String, required: true },
    Password: { type: String, required: true },
    
    firebaseUID: { type: String, required: true },

    CreatedOn: { type: Date, default: Date.now() }
});


let companySchema = new mongoose.Schema({
    CompanyName: { type: String, required: true },
    CompanyEmail: { type: String, required: true },
    CompanyOwnerUID: { type: String, required: true },
    CompanyContact: { type: String, required: true },

    CreatedOn: { type: Date, default: Date.now() }
});


let productSchema = new mongoose.Schema({
    ProductName: { type: String, required: true },
    ProductPrice: { type: Number, required: true },
    CompanyProfileUID: { type: String, required: true },
    CompanyOwnerUID: { type: String, required: true },


    CreatedOn: { type: Date, default: Date.now() }
});

let salesmanSchema = new mongoose.Schema({
    salesmanName: { type: String, required: true },
    salesmanArea: { type: String, required: true },
    CompanyProfileUID: { type: String, required: true },
    CompanyOwnerUID: { type: String, required: true },


    CreatedOn: { type: Date, default: Date.now() }
});




var noop = function() { };

userSchema.pre("save", function(done) {
    var user = this;

    if (!user.isModified("Password")) {
        return done();
    }

    bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
        if (err) { return done(err); }
        bcrypt.hash(user.Password, salt, noop, function(err, hashedPassword) {
            if (err) { return done(err); }
            user.Password = hashedPassword;
            done();
        });
    });
});


userSchema.methods.checkPassword = function(guess, done) {
    bcrypt.compare(guess, this.Password, function(err, isMatch) {
        done(err, isMatch);
    });
};


let UserModel = mongoose.model("users", userSchema);

let CompanyModel = mongoose.model("company", companySchema);

let ProductModel = mongoose.model("product", productSchema);

let SalesmanModel = mongoose.model("Salesman", salesmanSchema);


export function initializeModels(app) {
    app.post("/signup", (req, res) => {


        let ref = new Firebase("https://intense-inferno-4383.firebaseio.com");
        ref.createUser({
            email: req.body.email,
            password: req.body.password
        }, function(error, userData) {
            if (error) {
                console.log("Error creating user:", error);
            } else {
                
                console.log("Successfully created user account with uid:", userData.uid);
                let user = new UserModel({ FirstName: req.body.firstName, LastName: req.body.lastName, Email: req.body.email, Password: req.body.password, firebaseUID :  userData.uid});

                user.save(function(err, success) {
                   // console.log("user.save function")
                    if (err) {
                        console.log(err);
                        res.send(err);
                    } else {
                        console.log(success + "haider")
                        res.send({ message: "Inserted Successfully", data: success });
                    }

                });
                
                
            }
        });

        
        
        
       // console.log("got request")
       

    });



    // var done = function(err, isMatch){
    //     console.log(err, isMatch);
    //     if(isMatch) {
        
    //     }
    // }

    app.post("/signIn", (req, res) => {
        console.log("got request in Signin")
        let user = { Email: req.body.email, Password: req.body.password };


        UserModel
            .findOne({ Email: req.body.email }, (err, success) => {
                if (err) {
                    console.log(err + "signin error");
                    res.send(err);
                } else {

                    bcrypt.compare(req.body.password, success.Password, function(err, isMatch) {
                        //done(err, isMatch);
                        if (isMatch) {
                            //console.log(typeof success._id);
                            res.send(success);
                        }
                        else if (err) {
                            console.log(err);
                        }
                        else {
                            console.log("Wrong Password");
                            res.status("400");

                        }
                    });
                    
                    // console.log(success);
                    // console.log(req.body.password);
                 
                  
                    

                }
            });





        app.post("/createCompany", (req, res) => {
            console.log("got request");
            console.log(req.body);

            let company = new CompanyModel({ CompanyName: req.body.name, CompanyEmail: req.body.email, CompanyOwnerUID: req.body.comOwnUID, CompanyContact: req.body.Contact });

            company.save(function(err, success) {
                console.log("user.save function")
                if (err) {
                    console.log(err);
                    res.send(err);
                } else {
                    console.log(success + "haider")
                    res.send({ message: "Inserted Successfully", data: success });
                }

            });


        });

        app.post("/checkCoExist", (req, res) => {
            // console.log(req.body.data._id);
  
            CompanyModel
                .findOne({ CompanyOwnerUID: req.body.data._id }, (err, success) => {
                    if (err) {

                        res.send(err);
                    }
                    else {
                        // console.log(success);
                        if (success == null) {
                            // console.log("not exist");
                            res.send(false);
                        }
                        else {
                            //console.log("exist");
                            res.send(success);
                        }

                    }


                });

            app.post("/createSalesman", (req, res) => {
                // console.log("got request");
                // console.log(req.body);
                // res.end();
                
                let salesMan = new SalesmanModel({ salesmanName: req.body.name, salesmanArea: req.body.Allocated, CompanyOwnerUID: req.body.CompanyOwnerUID, CompanyProfileUID: req.body.companyProfID });

                salesMan
                    .save(function(err, success) {
                        console.log("salesMan.save function")
                        if (err) {
                            //   console.log(err);
                            res.send(err);
                        } else {
                            //  console.log(success)
                            res.send(success);
                        }

                    });


            });

            app.post("/createProduct", (req, res) => {
                // console.log("got request");
                //console.log(req.body);
                //res.end();

                let product = new ProductModel({ ProductName: req.body.name, ProductPrice: req.body.price, CompanyOwnerUID: req.body.CompanyOwnerUID, CompanyProfileUID: req.body.companyProfID });

                product
                    .save(function(err, success) {
                        //console.log("product.save function")
                        if (err) {
                            //   console.log(err);
                            res.send(err);
                        } else {
                            //  console.log(success)
                            res.send(success);
                        }

                    });
            });
            
            
            app.post("/getSalesman", (req, res) => {
                console.log("haider");
                console.log(req.body.data);
                SalesmanModel
                    .find({ CompanyProfileUID: req.body.data._id }, (err, success) => {
                        if (err) {

                            res.send(err);
                        }
                        else {
                            // console.log(success);
                            if (success == null) {
                                // console.log("not exist");
                                res.send(false);
                            }
                            else {
                                //console.log("exist");
                                res.send(success);
                            }
                        }
                    });

