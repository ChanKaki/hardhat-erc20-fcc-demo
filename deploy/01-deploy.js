const {developmentChains,INITIAL_SUPPLY}  = require ("../hepler-hardhat-config")
const {verify} = require("../utils/verify")
const { network } = require("hardhat");

module.exports  = async function({getNamedAccounts,deployments}){
    const {deploy} = deployments;
    const { deployer } = await getNamedAccounts();
    const arguments = [
        INITIAL_SUPPLY
    ]
    const ourToken  = await deploy("OurToken",{
        from: deployer,
        args: arguments,
        log: true,
        waitConfirmations: network.config.blockConfirmations,
    })

  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
        await verify(ourToken.address, [INITIAL_SUPPLY])
  }

}

module.exports.tags = ["all", "token"]