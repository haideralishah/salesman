/// <reference path="./typings/tsd.d.ts" />
var mongoose = require("mongoose");
var Firebase = require("firebase");
var bcrypt = require("bcrypt-nodejs");
var SALT_FACTOR = 10;
var connection = mongoose.connect("mongodb://localhost/salesManApplication");
//let connection = mongoose.connect("mongodb://hailee:Shah@14081947@ds055565.mongolab.com:55565/haileetech");
var userSchema = new mongoose.Schema({
    FirstName: { type: String, required: true },
    LastName: { type: String, required: true },
    Email: { type: String, required: true },
    Password: { type: String, required: true },
    firebaseUID: { type: String, required: true },
    CreatedOn: { type: Date, default: Date.now() }
});
var companySchema = new mongoose.Schema({
    CompanyName: { type: String, required: true },
    CompanyEmail: { type: String, required: true },
    CompanyOwnerUID: { type: String, required: true },
    CompanyContact: { type: String, required: true },
    CreatedOn: { type: Date, default: Date.now() }
});
var productSchema = new mongoose.Schema({
    ProductName: { type: String, required: true },
    ProductPrice: { type: Number, required: true },
    CompanyProfileUID: { type: String, required: true },
    CompanyOwnerUID: { type: String, required: true },
    CreatedOn: { type: Date, default: Date.now() }
});
var salesmanSchema = new mongoose.Schema({
    salesmanName: { type: String, required: true },
    salesmanArea: { type: String, required: true },
    CompanyProfileUID: { type: String, required: true },
    CompanyOwnerUID: { type: String, required: true },
    salesmanPassword: { type: String, default: "abc123" },
    CreatedOn: { type: Date, default: Date.now() }
});
var orderSchema = new mongoose.Schema({
    ProductName: { type: String, required: true },
    ProductPrice: { type: Number, required: true },
    lat: { type: Number, required: true },
    long: { type: Number, required: true },
    qty: { type: Number, required: true },
    shopName: { type: String, required: true },
    shopkeeperName: { type: String, required: true },
    CompanyOwnerUID: { type: String, required: true }
});
var noop = function () { };
userSchema.pre("save", function (done) {
    var user = this;
    if (!user.isModified("Password")) {
        return done();
    }
    bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
        if (err) {
            return done(err);
        }
        bcrypt.hash(user.Password, salt, noop, function (err, hashedPassword) {
            if (err) {
                return done(err);
            }
            user.Password = hashedPassword;
            done();
        });
    });
});
userSchema.methods.checkPassword = function (guess, done) {
    bcrypt.compare(guess, this.Password, function (err, isMatch) {
        done(err, isMatch);
    });
};
var UserModel = mongoose.model("users", userSchema);
var CompanyModel = mongoose.model("company", companySchema);
var ProductModel = mongoose.model("product", productSchema);
var SalesmanModel = mongoose.model("Salesman", salesmanSchema);
var OrderModel = mongoose.model("Order", orderSchema);
function initializeModels(app) {
    app.post("/signup", function (req, res) {
        var ref = new Firebase("https://intense-inferno-4383.firebaseio.com");
        ref.createUser({
            email: req.body.email,
            password: req.body.password
        }, function (error, userData) {
            if (error) {
                console.log("Error creating user:", error);
            }
            else {
                console.log("Successfully created user account with uid:", userData.uid);
                var user = new UserModel({ FirstName: req.body.firstName, LastName: req.body.lastName, Email: req.body.email, Password: req.body.password, firebaseUID: userData.uid });
                user.save(function (err, success) {
                    // console.log("user.save function")
                    if (err) {
                        console.log(err);
                        res.send(err);
                    }
                    else {
                        console.log(success + "haider");
                        res.send({ message: "Inserted Successfully", data: success });
                    }
                });
            }
        });
    });
    app.post("/signIn", function (req, res) {
        console.log("got request in Signin");
        var user = { Email: req.body.email, Password: req.body.password };
        UserModel
            .findOne({ Email: req.body.email }, function (err, success) {
            if (err) {
                console.log(err + "signin error");
                res.send(err);
            }
            else {
                bcrypt.compare(req.body.password, success.Password, function (err, isMatch) {
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
            }
        });
    });
    app.post("/createCompany", function (req, res) {
        console.log("got request");
        console.log(req.body);
        var company = new CompanyModel({ CompanyName: req.body.name, CompanyEmail: req.body.email, CompanyOwnerUID: req.body.comOwnUID, CompanyContact: req.body.Contact });
        company.save(function (err, success) {
            console.log("user.save function");
            if (err) {
                console.log(err);
                res.send(err);
            }
            else {
                console.log(success + "haider");
                res.send({ message: "Inserted Successfully", data: success });
            }
        });
    });
    app.post("/checkCoExist", function (req, res) {
        // console.log(req.body.data._id);
        CompanyModel
            .findOne({ CompanyOwnerUID: req.body.data._id }, function (err, success) {
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
    });
    app.post("/createSalesman", function (req, res) {
        // console.log("got request");
        // console.log(req.body);
        // res.end();
        var salesMan = new SalesmanModel({ salesmanName: req.body.name, salesmanArea: req.body.Allocated, CompanyOwnerUID: req.body.CompanyOwnerUID, CompanyProfileUID: req.body.companyProfID });
        salesMan
            .save(function (err, success) {
            console.log("salesMan.save function");
            if (err) {
                //   console.log(err);
                res.send(err);
            }
            else {
                //  console.log(success)
                res.send(success);
            }
        });
    });
    app.post("/createProduct", function (req, res) {
        // console.log("got request");
        //console.log(req.body);
        //res.end();
        var product = new ProductModel({ ProductName: req.body.name, ProductPrice: req.body.price, CompanyOwnerUID: req.body.CompanyOwnerUID, CompanyProfileUID: req.body.companyProfID });
        product
            .save(function (err, success) {
            //console.log("product.save function")
            if (err) {
                //   console.log(err);
                res.send(err);
            }
            else {
                //  console.log(success)
                res.send(success);
            }
        });
    });
    app.post("/getSalesman", function (req, res) {
        console.log("haider");
        console.log(req.body.data);
        SalesmanModel
            .find({ CompanyProfileUID: req.body.data._id }, function (err, success) {
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
    });
    app.post("/salesManSignIn", function (req, res) {
        console.log("got request");
        console.log(req.body);
        SalesmanModel
            .findOne({ salesmanName: req.body.name, salesmanPassword: req.body.password }, function (err, success) {
            if (err) {
                res.send(err);
            }
            else {
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
    });
    app.post("/productSearch", function (req, res) {
        //  console.log(req.body.data);
        ProductModel
            .find({ CompanyProfileUID: req.body.data.CompanyProfileUID }, function (err, success) {
            if (err) {
                res.send(err);
            }
            else {
                if (success == null) {
                    // console.log("not exist");
                    res.send(false);
                }
                else {
                    // console.log(success);
                    res.send(success);
                }
            }
        });
    });
    app.post("/prodSearch", function (req, res) {
        console.log(req.body.data);
        ProductModel
            .find({ CompanyOwnerUID: req.body.data.CompanyOwnerUID }, function (err, success) {
            if (err) {
                res.send(err);
            }
            else {
                if (success == null) {
                    // console.log("not exist");
                    res.send(false);
                }
                else {
                    console.log(success);
                    res.send(success);
                }
            }
        });
    });
    app.post("/addProd", function (req, res) {
        console.log("addProd");
        console.log(req.body);
        var order = new OrderModel({ ProductName: req.body.ProductName, ProductPrice: req.body.ProductPrice, lat: req.body.lat, long: req.body.long, qty: req.body.qty, shopName: req.body.shopName, shopkeeperName: req.body.shopkeeperName, CompanyOwnerUID: req.body.CompanyOwnerUID });
        order.save(function (err, success) {
            console.log("Order.save function");
            if (err) {
                console.log(err);
                res.send(err);
            }
            else {
                console.log(success + "haider");
                res.send({ message: "Inserted Successfully", data: success });
            }
        });
    });
    app.post("/orderSearch", function (req, res) {
        console.log(req.body.data);
        OrderModel
            .find({ CompanyOwnerUID: req.body.data.CompanyOwnerUID }, function (err, success) {
            if (err) {
                res.send(err);
            }
            else {
                if (success == null) {
                    // console.log("not exist");
                    res.send(false);
                }
                else {
                    console.log(success);
                    res.send(success);
                }
            }
        });
    });
}
exports.initializeModels = initializeModels;
