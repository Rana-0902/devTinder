const adminAuth = (req, res, next) => {
    console.log("Admin auth is getting checked!!");
    const token = "xyz";
    const isAdminAuthorized = token === "xyz";

    if (!isAdminAuthorized) {
        res.status(401).send("Unauthorized request");
    } else {
        next();
    }
};

const userAuth = (req, res, next) => {
    console.log("Admin auth is getting checked!!");
    const token = "xyz";
    const isAdminAuthorized = token === "xyz";

    if (!isAdminAuthorized) {
        res.status(401).send("Unauthorized request");
    } else {
        next();
    }
};  

module.exports = {
    adminAuth, 
    userAuth,
}

// const { adminAuth, userAuth } = require("./middlewares/auth")

// app.use("/admin", adminAuth);

// app.get("/user",userAuth, (req,res) => {
//     res.send("User Data Sent");
// });

// app.get("/admin/getAllData", (req, res) => {
//     res.send("All Data Sent");
// });

// app.get("/admin/deleteUser", (req,res) => {
//     res.send("Deleted a user");
// });
