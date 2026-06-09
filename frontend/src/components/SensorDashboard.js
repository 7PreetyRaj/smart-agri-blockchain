import React, {
    useEffect,
    useState
} from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";
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
                console.log(
    "Fetched Records:",
    response.data
);
                const formattedData =
    response.data.map(
        (
            record,
            index
        ) => ({
            ...record,
            label:
                `Record ${index + 1}`
        })
    );
    



    setRecords(
    formattedData
    );

        } catch (error) {

            console.error(
                "Error fetching records:",
                error
            );

        }

    };
const generateData = async () => {
    //console.log("Button Clicked");

    try {
        //const response =

        await API.post(
            "/generate-data"
        );
       // console.log(response.data);

        fetchRecords();

    } catch (error) {

        console.error(error);

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
    <div className="card">
    <h3>Blockchain Status</h3>
    <p>Connected</p>
    </div>

</div>
<button
    onClick={generateData}
>
    Generate Sensor Data
</button>
<h2>Temperature Trend</h2>

<LineChart
    width={900}
    height={300}
    data={records}
>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="label" />
    <YAxis />
    <Tooltip />
    <Legend />

    <Line
        type="monotone"
        dataKey="temperature"
    />
</LineChart>


<h2>Humidity Trend</h2>

<LineChart
    width={900}
    height={300}
    data={records}
>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="label" />
    <YAxis />
    <Tooltip />
    <Legend />

    <Line
        type="monotone"
        dataKey="humidity"
    />
</LineChart>


<h2>Soil Moisture Trend</h2>

<LineChart
    width={900}
    height={300}
    data={records}
>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="label" />
    <YAxis />
    <Tooltip />
    <Legend />

    <Line
        type="monotone"
        dataKey="soilMoisture"
    />
</LineChart>


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