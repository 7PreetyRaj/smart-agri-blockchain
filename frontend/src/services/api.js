// Import axios for API requests
import axios from "axios";

// Create axios instance
const API = axios.create({

    // Backend URL
    baseURL: "http://localhost:5000/api"

});

// Export API instance
export default API;