### Blockchain-Ecology: Understanding Smart Contract and DApp Workflows

---

**Overview**

This repository is created to understand the principles of smart contracts and DApp workflows.

**Goals**

- Learn the basics of smart contract development.
- Explore DApp architecture and workflows.
- Build a simple DApp using smart contracts.
- Utilize OpenZeppelin's smart contract libraries to implement secure and efficient solutions.

**Learning Topics**

- **Basics**
    - Based on the Ethereum official documentation’s *VendingMachine* contract, explore transaction handling, processing, testing, and event management using the following setups:
        - **Truffle & JavaScript**
        - **Hardhat & Ethers.js**
    - Learn to utilize various helpful modules throughout the process.
- **ERC20**
    - Using OpenZeppelin's *ERC20* contract as a base, perform the following tasks:
        - Transaction handling, processing, testing, and event management.
        - Deployment to multiple chains using both **Truffle & JavaScript** and **Hardhat & Ethers.js**.
- **ERC721**
    - Using OpenZeppelin's *ERC721* contract as a base, perform similar tasks:
        - Transaction handling, processing, testing, and event management.
        - Deployment to multiple chains with **Truffle & JavaScript** and **Hardhat & Ethers.js**.
- **ERC1155**
    - Customize OpenZeppelin's *ERC1155* contract and perform the following:
        - Deployment and testing using **Hardhat & Ethers.js**.
- **ERC721A**
    - Learn about *ERC721A* (developed by Azuki) and how it optimizes gas fees compared to *ERC721*.
    - Test and deploy a customized version.
- **ERC4626**
    - Study the *ERC4626* extension of *ERC20* to understand its features and applications.

**Advanced Learning Topics**

1. **Governance, DAO**
    - Implement a DAO using OpenZeppelin's *Governor* contract, *ERC20* contract, and *ERC721 Vote Extension*.
    - Customize quorum requirements to fit specific needs, using only the core *Governor* and NFT contracts (excluding Timelock and Compound-like modules).
2. **EIP-712 Signatures**
    - Study EIP-712 signatures, widely used in major services like OpenSea, Uniswap, and Governor contracts.
    - Learn the complexities of EIP-712 through test cases.
    - Practice signing EIP-712 messages with MetaMask and explore real-world use cases from prominent products.
3. **Access Control and Ownership (Contract Security)**
    - Explore various administrator control mechanisms beyond the standard *Ownable* contract.
    - Use OpenZeppelin’s *Owner2Step* and *AccessRole* contracts to manage administrator roles in different scenarios.
4. **Multisig Wallet (Contract Security)**
    - Learn about multisignature wallets as a common approach to enhance contract security in real-world use cases.
    - Deploy and test a multisig wallet using Gnosis Safe, the most popular multisig implementation.
5. **Pausable and Re-Entrancy (Contract Security)**
    - Study the *Pausable* and *Re-entrancy* patterns, commonly used to improve contract security.
    - Conduct hands-on experiments to simulate re-entrancy attacks and validate the effectiveness of countermeasures in your smart contracts.
6. **Upgradable Contracts**
    - Explore OpenZeppelin’s examples of upgradable contracts.
    - Practice deploying and upgrading smart contracts to understand how upgradability can be implemented effectively.

**Tools & Technologies**

- Solidity
- Web3.js / Ethers.js
- Ganache / Hardhat
- Go-ethereum

**Resources**

- https://eips.ethereum.org/
- https://docs.openzeppelin.com/contracts/5.x/
- https://github.com/gnosis/MultiSigWallet
