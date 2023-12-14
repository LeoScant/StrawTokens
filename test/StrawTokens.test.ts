// This is an example test file. Hardhat will run every *.js file in `test/`,
// so feel free to add new ones.

import { ethers } from "hardhat";
const { ZeroAddress } = ethers;

// Hardhat tests are normally written with Mocha and Chai.

// We import Chai to use its asserting functions here.
const { expect } = require("chai");

// We use `loadFixture` to share common setups (or fixtures) between tests.
// Using this simplifies your tests and makes them run faster, by taking
// advantage or Hardhat Network's snapshot functionality.
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

// `describe` is a Mocha function that allows you to organize your tests.
// Having your tests organized makes debugging them easier. All Mocha
// functions are available in the global scope.
//
// `describe` receives the name of a section of your test suite, and a
// callback. The callback must define the tests of that section. This callback
// can't be an async function.
describe("Token contract", function () {
  const baseUri = 'https://brown-pregnant-alpaca-857.mypinata.cloud/ipfs/QmZoyc753vLdk3sgHrA6ph2Ny2C43P96JTPGAjEaVoNqSv/';

  // We define a fixture to reuse the same setup in every test. We use
  // loadFixture to run this setup once, snapshot that state, and reset Hardhat
  // Network to that snapshot in every test.
  async function deployTokenFixture() {
    // Get the ContractFactory and Signers here.
    const Token = await ethers.getContractFactory("StrawTokens");
    const [owner, addr1, addr2] = await ethers.getSigners();

    // To deploy our contract, we just have to call Token.deploy() and await
    // for it to be deployed(), which happens onces its transaction has been
    // mined.
    const strawTokens = await Token.deploy();

    //Perchè non settarli direttamente nel contratto?
    await strawTokens.connect(owner).setTokenUri(1, baseUri + 'Monkey_D._Rufy.json');
    await strawTokens.connect(owner).setTokenUri(2, baseUri + 'Roronoa_Zoro.json');
    await strawTokens.connect(owner).setTokenUri(3, baseUri + 'Nami.json');
    await strawTokens.connect(owner).setTokenUri(4, baseUri + 'Sanji.json');

    //await strawTokens.deployed();

    // Fixtures can return anything you consider useful for your tests
    return { Token, strawTokens, owner, addr1, addr2 };
  }

  // You can nest describe calls to create subsections.
  describe("Deployment", function () {
    // `it` is another Mocha function. This is the one you use to define your
    // tests. It receives the test name, and a callback function.
    //
    // If the callback function is async, Mocha will `await` it.
    it("Should set the right owner", async function () {
      // We use loadFixture to setup our environment, and then assert that
      // things went well
      const { strawTokens, owner } = await loadFixture(deployTokenFixture);

      // Expect receives a value and wraps it in an assertion object. These
      // objects have a lot of utility methods to assert values.

      // This test expects the owner variable stored in the contract to be
      // equal to our Signer's owner.
      expect(await strawTokens.owner()).to.equal(owner.address);
    });

    it('check token uri', async function () {
      const { strawTokens, owner } = await loadFixture(deployTokenFixture);

      expect(await strawTokens.tokenURI(1)).to.be.equal(baseUri + '1.json');
      expect(await strawTokens.tokenURI(2)).to.be.equal(baseUri + '2.json');
      expect(await strawTokens.tokenURI(3)).to.be.equal(baseUri + '3.json');
      expect(await strawTokens.tokenURI(4)).to.be.equal(baseUri + '4.json');
    })

  });

  describe('minting', function () {
    it('users can NOT mint tokens', async function () {
      const { strawTokens, owner, addr1 } = await loadFixture(deployTokenFixture);

      //Perchè se metto un altro valore tipo 0x123 invece di 0x mi da errore?
      //Usare un convertitore Text to ASCII per valorizzare campo data
      await expect(strawTokens.connect(addr1).mint(addr1.address, 1, 1, '0x6369616F')).to.be.revertedWith('Ownable: caller is not the owner');
    })

    it('creator can mint 5 tokens with id=1 for other account', async function () {
      const { strawTokens, owner, addr1 } = await loadFixture(deployTokenFixture);
      expect(await strawTokens.connect(owner).mint(addr1.address, 1, 5, '0x'))
        .to.emit(strawTokens, "TransferSingle").withArgs(owner.address, ZeroAddress, addr1.address, 1, 5);

      expect(await strawTokens.balanceOf(addr1.address, 1)).to.equal(5);
    })

    it('creator can mint 5 tokens with id=2 for other2 account', async function () {
      const { strawTokens, owner, addr2 } = await loadFixture(deployTokenFixture);
      await strawTokens.connect(owner).mint(addr2.address, 2, 5, '0x');

      expect(await strawTokens.balanceOf(addr2.address, 2)).to.equal(5);
      expect(await strawTokens.totalSupply(2)).to.equal(10);
      expect(await strawTokens.uri(2)).to.be.equal(baseUri + 'Roronoa_Zoro.json');
    })

    it('creator can mint some tokens with different ids for other1 account', async function () {
      const { strawTokens, owner, addr1 } = await loadFixture(deployTokenFixture);
      await strawTokens.connect(owner).mintBatch(addr1.address, [3,4], [10,15], '0x');

      expect(await strawTokens.balanceOf(addr1.address, 3)).to.equal(10);
      expect(await strawTokens.balanceOf(addr1.address, 4)).to.equal(15);

      expect(await strawTokens.totalSupply(3)).to.equal(25);
      expect(await strawTokens.totalSupply(4)).to.equal(20);

      expect(await strawTokens.uri(3)).to.be.equal(baseUri + 'Nami.json');
      expect(await strawTokens.uri(4)).to.be.equal(baseUri + 'Sanji.json');
    })
  })

  describe('transfer', function () {
    it('other2 can transfer their tokens', async function () {
      const { strawTokens, owner, addr1, addr2 } = await loadFixture(deployTokenFixture);
      await strawTokens.connect(owner).mint(addr2.address, 1, 5, '0x');

      await strawTokens.connect(addr2).safeTransferFrom(addr2.address, addr1.address, 1, 2, '0x');

      expect(await strawTokens.balanceOf(addr2.address, 1)).to.equal(3);
      expect(await strawTokens.balanceOf(addr1.address, 1)).to.equal(2);
    })

    it('other1 can batch transfer their tokens', async function () {
      const { strawTokens, owner, addr1, addr2 } = await loadFixture(deployTokenFixture);
      await strawTokens.connect(owner).mintBatch(addr1.address, [1,2], [5,10], '0x');
      await strawTokens.connect(addr1).safeBatchTransferFrom(addr1.address, addr2.address, [1,2], [3,5], '0x');

      expect(await strawTokens.balanceOf(addr1.address, 1)).to.equal(2);
      expect(await strawTokens.balanceOf(addr2.address, 1)).to.equal(3);

      expect(await strawTokens.balanceOf(addr1.address, 2)).to.equal(5);
      expect(await strawTokens.balanceOf(addr2.address, 2)).to.equal(5);
    })
  })
})