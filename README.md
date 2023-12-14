# Straw Tokens Smart Contract

## Overview

This Ethereum smart contract, named **StrawTokens**, is an ERC-1155-compliant token contract that represents the "Straw Hat Collection." The collection consists of unique tokens named after characters: Rufy, Zoro, Nami, and Sanji. Each token has a specific identifier and quantity associated with it.

## Contract Details

- **Name:** Straw Hat Collection
- **Symbol:** STRAW
- **Base URI:** [https://brown-pregnant-alpaca-857.mypinata.cloud/ipfs/QmZoyc753vLdk3sgHrA6ph2Ny2C43P96JTPGAjEaVoNqSv/](https://brown-pregnant-alpaca-857.mypinata.cloud/ipfs/QmZoyc753vLdk3sgHrA6ph2Ny2C43P96JTPGAjEaVoNqSv/)

## Token Details

1. **Rufy**
   - Token ID: 1
   - Initial Supply: 1

2. **Zoro**
   - Token ID: 2
   - Initial Supply: 5

3. **Nami**
   - Token ID: 3
   - Initial Supply: 15

4. **Sanji**
   - Token ID: 4
   - Initial Supply: 5

## Token URI

The token URI for each token is constructed using the base URI and appending the token ID with ".json." The URI format is as follows:

```plaintext
{baseURI}{tokenId}.json
```

For example, the URI for token ID 1 would be [https://brown-pregnant-alpaca-857.mypinata.cloud/ipfs/QmZoyc753vLdk3sgHrA6ph2Ny2C43P96JTPGAjEaVoNqSv/1.json](https://brown-pregnant-alpaca-857.mypinata.cloud/ipfs/QmZoyc753vLdk3sgHrA6ph2Ny2C43P96JTPGAjEaVoNqSv/1.json).

## Minting

The contract allows the owner to mint new tokens, either a single token or in batches.

## Setting Token URI

The owner can set a custom token URI for a specific token using the `setTokenUri` function.

## Contract Deployment

The contract is deployed on the Ethereum testnet and can be viewed on OpenSea at [Straw Hat Collection](https://testnets.opensea.io/collection/straw-hat-collection). Additionally, the contract's code and details can be found on [Etherscan](https://sepolia.etherscan.io/address/0x29a720e931c72e9b14ebd28faf1f7e80321694dd#code).

## Usage

Please refer to the provided functions within the smart contract for minting and URI customization. Feel free to explore and interact with the StrawTokens collection on OpenSea.

## Questions

If you have any questions regarding the contract, OpenSea setup, or token management, please refer to the comments within the code or contact the owner of the smart contract.