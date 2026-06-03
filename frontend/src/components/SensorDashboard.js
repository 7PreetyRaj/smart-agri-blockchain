import React, {
    useEffect,
    useState
} from "react";

import API from "../services/api";

function SensorDashboard() {

    // State for blockchain records
    const [records, setRecords] = useState([]);
    // Total records
const totalRecords = records.length;

// Average temperature
const avgTemperature =
    records.length > 0
        ? (
            records.reduce(
                (sum, record) =>
                    sum + record.temperature,
                0
            ) / records.length
        ).toFixed(2)
        : 0;

// Average humidity
const avgHumidity =
    records.length > 0
        ? (
            records.reduce(
                (sum, record) =>
                    sum + record.humidity,
                0
            ) / records.length
        ).toFixed(2)
        : 0;

    // Run when component loads
    useEffect(() => {

        fetchRecords();

    }, []);

    // Fetch blockchain records
    const fetchRecords = async () => {

        try {

            const response =
                await API.get(
                    "/blockchain/records"
                );

            setRecords(
                response.data
            );

        } catch (error) {

            console.error(
                "Error fetching records:",
                error
            );

        }

    };

    return (

        <div>
            <div className="stats-container">

    <div className="card">
        <h3>Total Records</h3>
        <p>{totalRecords}</p>
    </div>

    <div className="card">
        <h3>Avg Temperature</h3>
        <p>{avgTemperature} °C</p>
    </div>

    <div className="card">
        <h3>Avg Humidity</h3>
        <p>{avgHumidity} %</p>
    </div>

</div>


            <h2>
                Blockchain Records
            </h2>

            <table border="1">

                <thead>

                    <tr>

                        <th>
                            Temperature
                        </th>

                        <th>
                            Humidity
                        </th>

                        <th>
                            Soil Moisture
                        </th>

                        <th>
                            Timestamp
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {records.map(
                        (
                            record,
                            index
                        ) => (

                            <tr key={index}>

                                <td>
                                    {
                                        record.temperature
                                    }
                                </td>

                                <td>
                                    {
                                        record.humidity
                                    }
                                </td>

                                <td>
                                    {
                                        record.soilMoisture
                                    }
                                </td>

                                <td>
                                    {
                                        new Date(
                                            record.timestamp * 1000
                                        ).toLocaleString()
                                    }
                                </td>

                            </tr>

                        )
                    )}

                </tbody>

            </table>

        </div>

    );
}

export default SensorDashboard;