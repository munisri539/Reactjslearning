const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "crud"
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed: " + err.stack);
        return;
    }
    console.log("Connected to database.");
});

//fetch data
app.get("/", (req, res) => {
    const sql = "SELECT * FROM student";
    db.query(sql, (err, data) => {
        if (err) return res.json("Error");
        return res.json(data);
    });
});

// Get a specific student by ID
app.get('/student/:id', (req, res) => {
    const sql = "SELECT * FROM student WHERE ID = ?";
    db.query(sql, [req.params.id], (err, data) => {
        if (err) return res.json("Error");
        if (data.length === 0) return res.json("No student found");
        return res.json(data[0]);
    });
});


app.post('/create', (req, res) => {
    console.log(req.body);
    const sql = "INSERT INTO student (`Name`, `Email`, `Branch`, `Gender`, `Address`) VALUES (?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.branch,
        req.body.gender,
        req.body.address
    ];
    db.query(sql, [values], (err, data) => {
        if (err) return res.json("Error");
        return res.json(data);
    });
});


// Update an existing student
app.put('/update/:id', (req, res) => {
    const sql = "UPDATE student SET `Name` = ?, `Email` = ?, `Branch` = ?, `Gender` = ?, `Address` = ? WHERE `ID` = ?";
    const values = [
        req.body.name,
        req.body.email,
        req.body.branch,
        req.body.gender,
        req.body.address
    ];
    db.query(sql, [...values, req.params.id], (err, data) => {
        if (err) return res.json("Error");
        return res.json(data);
    });
});

//delete
app.delete('/delete/:id', (req, res) => {
    const sql = "DELETE FROM student WHERE `ID` = ?";
    db.query(sql, [req.params.id], (err, data) => {
        if (err) return res.json("Error");
        return res.json(data);
    });
});

app.listen(8081, () => {
    console.log("Server is listening on port 8081");
});
