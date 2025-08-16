const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");

// mongoose.set('runValidators', true);

app.use(express.json()); //middleware to parse JSON bodies

app.post("/signup", async (req, res) => {
    const userData = req.body;

    try {
        // Validationa of data
        validateSignUpData(req);

        const { firstName, lastName, emailId, password } = req.body;
        // Encrypt the password
        const passwordHash = await bcrypt.hash(password, 10);
        console.log(passwordHash);

        // Creating a new instance of the User model

        const user = new User({
            firstName, lastName, emailId, password: passwordHash,
        });
        await user.save();  // return a promise
        
        res.send("User added successfully");
        console.log("User added successfully");
    } catch (error) {
        res.status(500).send("ERROR : " + error.message);
    }
    // Create a new user instance of the User model
});

app.post("/login", async (req, res) => {
    // for login,  1st check emaiId --->  it is present or not 
    // If emailId present, then decrypt the password and check it is correct or not

    try {
        const { emailId, password } = req.body;

        const user = await User.findOne({ emailId: emailId});
        if (!user) {
            throw new Error("Invalid creadentials");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (isPasswordValid) {
            res.send("Login Successful!!!");
        }  else {
            throw new Error("Invalid creadentials");
        }

    } catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
})


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
app.patch("/updateUser/:userId", async (req, res) => {
    const userId = req.params?.userId;
    const data = req.body; 

    try {
        const ALLOWED_UPDATES = [
            "photoURL", 
            "about", 
            "gender", 
            "age", 
            "skills"
        ];

        const isUpdateAllowed = Object.keys(data).every((k) => ALLOWED_UPDATES.includes(k));
        
        if (!isUpdateAllowed) {
             throw new Error("Update not allowed");
        }

        if (data?.skills.length > 20) {
            throw new Error("Skills can not be more than 20");
        }

        const updateUser = await User.findByIdAndUpdate( {_id: userId}, data ,{
            returnDocument: "before",
            runValidators: true,
        }); // return a promise
        
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

