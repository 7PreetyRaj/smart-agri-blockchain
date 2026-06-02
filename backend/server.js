const sensorRoutes = require("./routes/sensorRoutes");
// Express package import
const express = require("express");

// Create application
const app = express();
app.use(express.json());

// Port number
const PORT = 5000;

// Home route
app.get("/", (req, res) => {
    res.send("Smart Agriculture Backend Running");
});
app.use("/api", sensorRoutes);
// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});