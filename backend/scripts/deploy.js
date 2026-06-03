const hre = require("hardhat");

async function main() {

    const AgriData = await hre.ethers.getContractFactory("AgriData");

    const agriData = await AgriData.deploy();

    await agriData.deployed();

    console.log(
        "AgriData deployed to:",
        agriData.address
    );
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });