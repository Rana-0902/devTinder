const express = require("express");

const app = express();
app.get("/user/:userId/:name/:password", (req, res) => {
    console.log(req.params);
    res.send({firstName: "Karan", lastName: "Rana"});
});

app.post("/user", (req, res) => { 
    res.send("Data successfully saved to DB !");
});

app.delete("/user", (req, res) => {
    res.send("Deleted successfully!");
});

app.use("/test", (req, res) => {
    res.send("test test test");
});

app.listen(4000, () => {
    console.log("Server is successfully listening on port 4000...");
});