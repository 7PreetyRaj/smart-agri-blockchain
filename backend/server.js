// Express package import
const express = require("express");

// Create application
const app = express();

// Port number
const PORT = 5000;

// Home route
app.get("/", (req, res) => {
    res.send("Smart Agriculture Backend Running");
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});