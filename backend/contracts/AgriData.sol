// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract AgriData {

    struct SensorRecord {
        uint256 temperature;
        uint256 humidity;
        uint256 soilMoisture;
        uint256 timestamp;
    }

    SensorRecord[] public records;

    function addRecord(
        uint256 _temperature,
        uint256 _humidity,
        uint256 _soilMoisture
    ) public {

        records.push(
            SensorRecord(
                _temperature,
                _humidity,
                _soilMoisture,
                block.timestamp
            )
        );
    }

    function getRecordCount()
        public
        view
        returns (uint256)
    {
        return records.length;
    }
    //read data from fun blockchain
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
    SensorRecord memory record = records[index];

    return (
        record.temperature,
        record.humidity,
        record.soilMoisture,
        record.timestamp
    );
}
}