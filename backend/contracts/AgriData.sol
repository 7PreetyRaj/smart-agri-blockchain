// SPDX-License-Identifier: MIT

// Solidity compiler version
pragma solidity ^0.8.20;

// Main Smart Contract
contract AgriData {

    // Structure of one sensor record
    struct SensorRecord {

        // Temperature value from sensor
        uint256 temperature;

        // Humidity value from sensor
        uint256 humidity;

        // Soil moisture value from sensor
        uint256 soilMoisture;

        // Blockchain timestamp when record was stored
        uint256 timestamp;
    }

    // Dynamic array to store all records
    SensorRecord[] public records;

    // Function to add a new sensor record
    function addRecord(
        uint256 _temperature,
        uint256 _humidity,
        uint256 _soilMoisture
    ) public {

        // Store new record in blockchain
        records.push(
            SensorRecord(
                _temperature,
                _humidity,
                _soilMoisture,
                block.timestamp
            )
        );
    }

    // Returns total number of stored records
    function getRecordCount()
        public
        view
        returns (uint256)
    {
        return records.length;
    }

    // Returns record data for a specific index
    function getRecord(uint256 index)
        public
        view
        returns (
            uint256 temperature,
            uint256 humidity,
            uint256 soilMoisture,
            uint256 timestamp
        )
    {

        // Fetch record from array
        SensorRecord memory record = records[index];

        // Return values
        return (
            record.temperature,
            record.humidity,
            record.soilMoisture,
            record.timestamp
        );
    }
}