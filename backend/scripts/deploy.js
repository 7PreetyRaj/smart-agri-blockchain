import hre from "hardhat";

async function main() {

    const AgriData = await hre.ethers.getContractFactory("AgriData");

    const agriData = await AgriData.deploy();

    await agriData.waitForDeployment();

    console.log("AgriData deployed to:", await agriData.getAddress());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});