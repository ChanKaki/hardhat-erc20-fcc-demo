const { network, getNamedAccounts, deployments, ethers } = require("hardhat");
const {
  developmentChains,
  INITIAL_SUPPLY,
} = require("../../hepler-hardhat-config");
const { assert, expect } = require("chai");


!developmentChains.includes(network.name)
  ? describe.skip
  : describe("OurToken Unit Test", async function () {
    let deployer,ourToken,payee;
    const token =  ethers.utils.parseEther("1.0");
    beforeEach(async function(){
        const accounts = await getNamedAccounts();
         deployer = accounts.deployer;
        // payee =accounts[1];
        payee = accounts.player;
        await deployments.fixture("all");
        ourToken = await ethers.getContract("OurToken", deployer);
    });
    
    it("was deployed",async ()=>{
        assert(ourToken.address);
    })

    describe("constructor",()=>{
        it("totalSupply should equeal what i setted",async()=>{
            const totalSupply  = await ourToken.totalSupply();
            assert.equal(totalSupply.toString(),INITIAL_SUPPLY);
        })

        it("the name is OurToken",async()=>{
            const name = await ourToken.name();
            assert.equal(name,"OurToken");
        })
        it("symbol is OT",async()=>{
            const symbol = await ourToken.symbol();
            assert.equal(symbol,"OT");
        })
    });

    describe("transfers",()=>{
        it("payee got the token",async ()=>{
            await ourToken.transfer(payee,token);
            const  payeeBalance  = await ourToken.balanceOf(payee);
            expect(payeeBalance).to.equal(token)
        })

        it("emit transfer events",async ()=>{
            console.log(">>>????")
            // await expect(await ourToken.transfer(payee,token)).to.emit("Transfer").withArgs(deployer,payee,token);
             await expect(ourToken.transfer(payee, token)).to.emit(
                      ourToken,
                      "Transfer"
                  )
        })
        
    })

  })