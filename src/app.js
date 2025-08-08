const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

// mongoose.set('runValidators', true);

app.use(express.json()); //middleware to parse JSON bodies

app.post("/signup", async (req, res) => {
    const userData = req.body;

    try {
        const user = new User(userData);
        await user.save();  // return a promise
        res.send(user);
        console.log(user);
    } catch (error) {
        res.status(500).send("Error creating user: " + error.message);
    }
    // Create a new user instance of the User model
});

// get user by email
app.get("/user", async (req, res) => {
    const userEmail = req.body.emailId;

    try { 
        const user = await User.findOne({ emailId: userEmail }); // return a promise
        
        if (user.length === 0) {
            res.status(500).send("Enter a valid email");
        } else {
            res.send(user);
        }
        
    } catch (error) {
        res.status(500).send("Something went Wrong");
    }
});

// Feed API - GET /feed - get all the users from the database
app.get("/feed", async (req, res) => {
    try {
        const users = await User.find(); // return a promise
        if (users.length === 0) {
            res.status(404).send("No users found");
        } else {
            res.send(users);
        }
    }
    catch (error) {
        res.status(500).send("Some error occurred :");
    }
});

// delete user from database by '_id'
app.delete("/deleteUser", async (req, res) => {
    const userId = req.body.emailId;

    try {
        const user = await User.findOneAndDelete(userId); // return a promise
        res.send("User deleted successfully");
    }  catch (error) {
        res.status(500).send("Some error occurred :");
    }
});

// Update user of the user
app.patch("/updateUser", async (req, res) => {
    const userId = req.body.userId;
    const data = req.body; 

    // const ALLOWED_UPDATES = ["about", "gender", "age"];

    // const isUpdateAllowed = Object.keys(data).every((k) => 
    //     ALLOWED_UPDATES.includes(k)
    // );
    
    try {
        const updateUser = await User.findByIdAndUpdate( {_id: userId}, data ); // return a promise

        console.log("User updated successfully");
        res.send(updateUser);

    } catch (error) {
        res.status(500).send("UPDATE FAILED: " + error);
    }
    
});

connectDB()
    .then(() => {
        console.log("Database connected successfully");
        app.listen(4000, () => {
        console.log("Server is successfully listening on port 4000...");
        });
    })
    .catch((err) => {
        console.error("Database connection error:", err);
    });

