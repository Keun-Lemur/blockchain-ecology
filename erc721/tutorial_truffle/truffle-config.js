/**
 * Use this file to configure your truffle project. It's seeded with some
 * common settings for different networks and features like migrations,
 * compilation, and testing. Uncomment the ones you need or modify
 * them to suit your project as necessary.
 *
 * More information about configuration can be found at:
 *
 * https://trufflesuite.com/docs/truffle/reference/configuration
 *
 * Hands-off deployment with Infura
 * --------------------------------
 *
 * Do you have a complex application that requires lots of transactions to deploy?
 * Use this approach to make deployment a breeze 🏖️:
 *
 * Infura deployment needs a wallet provider (like @truffle/hdwallet-provider)
 * to sign transactions before they're sent to a remote public node.
 * Infura accounts are available for free at 🔍: https://infura.io/register
 *
 * You'll need a mnemonic - the twelve word phrase the wallet uses to generate
 * public/private key pairs. You can store your secrets 🤐 in a .env file.
 * In your project root, run `$ npm install dotenv`.
 * Create .env (which should be .gitignored) and declare your MNEMONIC
 * and Infura PROJECT_ID variables inside.
 * For example, your .env file will have the following structure:
 *
 * MNEMONIC = <Your 12 phrase mnemonic>
 * PROJECT_ID = <Your Infura project id>
 *
 * Deployment with Truffle Dashboard (Recommended for best security practice)
 * --------------------------------------------------------------------------
 *
 * Are you concerned about security and minimizing rekt status 🤔?
 * Use this method for best security:
 *
 * Truffle Dashboard lets you review transactions in detail, and leverages
 * MetaMask for signing, so there's no need to copy-paste your mnemonic.
 * More details can be found at 🔎:
 *
 * https://trufflesuite.com/docs/truffle/getting-started/using-the-truffle-dashboard/
 */

require("dotenv").config();
// const { MNEMONIC, PROJECT_ID } = process.env;

const HDWalletProvider = require("@truffle/hdwallet-provider");

const privateKeys = [process.env.PRIVATE_KEY];

module.exports = {
  /**
   * Networks define how you connect to your ethereum client and let you set the
   * defaults web3 uses to send transactions. If you don't specify one truffle
   * will spin up a managed Ganache instance for you on port 9545 when you
   * run `develop` or `test`. You can ask a truffle command to use a specific
   * network from the command line, e.g
   *
   * $ truffle test --network <network-name>
   */

  networks: {
    // Useful for testing. The `development` name is special - truffle uses it by default
    // if it's defined here and no other network is specified at the command line.
    // You should run a client (like ganache, geth, or parity) in a separate terminal
    // tab if you use this network and you must also set the `host`, `port` and `network_id`
    // options below to some value.
    //
    development: {
      host: "127.0.0.1", // Localhost (default: none)
      port: 9545, // Standard Ethereum port (default: none)
      network_id: "*", // Any network (default: none)
    },
    ganache: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",
    },
    // goerli: {
    //   provider: () =>
    //     new HDWalletProvider(
    //       [process.env.PRIVATE_KEY], // 배열 형태로 전달
    //       process.env.RPC_URL // Infura, Alchemy 또는 다른 RPC URL
    //     ),
    //   network_id: "5", // Goerli 네트워크 ID
    // },

    sepolia: {
      provider: () =>
        new HDWalletProvider(
          [
            "0x877bc6aa1d35312cb300eebbc79b3d802cb6f991670810e3d01983691b60568a",
          ], // 환경 변수에서 개인 키 가져오기
          `https://sepolia.infura.io/v3/b7e0d791d87f4a5bacf1807f60b80991` // Infura Sepolia URL
        ),
      network_id: 11155111, // Sepolia 네트워크 ID
      // gas: 5500000, // 최대 가스 한도
      // confirmations: 2, // 배포 확인 대기
      // timeoutBlocks: 200, // 배포 타임아웃
      // skipDryRun: true, // Dry run 스킵
    },

    linea: {
      provider: () =>
        new HDWalletProvider(
          [
            "0x877bc6aa1d35312cb300eebbc79b3d802cb6f991670810e3d01983691b60568a",
          ], // 환경 변수에서 개인 키 가져오기
          `https://linea-sepolia.infura.io/v3/b7e0d791d87f4a5bacf1807f60b80991`,
          0 // Infura Sepolia URL
        ),
      network_id: 59144, // Sepolia 네트워크 ID
      // gas: 5500000, // 최대 가스 한도
      // confirmations: 2, // 배포 확인 대기
      timeoutBlocks: 200, // 배포 타임아웃
      // skipDryRun: true, // Dry run 스킵
    },

    ethsepolia: {
      provider: () =>
        new HDWalletProvider(
          [
            "0x877bc6aa1d35312cb300eebbc79b3d802cb6f991670810e3d01983691b60568a",
          ], // 환경 변수에서 개인 키 가져오기
          "https://eth-sepolia.g.alchemy.com/v2/K2rwCMG8VK29ZGlnU7WPN3qczr0MmBVW",
          0 // alchemy Sepolia URL
        ),
      network_id: 11155111, // Sepolia 네트워크 ID
      // gas: 5500000, // 최대 가스 한도
      // confirmations: 2, // 배포 확인 대기
      timeoutBlocks: 200, // 배포 타임아웃
      // skipDryRun: true, // Dry run 스킵
    },

    zkevmpolygon: {
      provider: () =>
        new HDWalletProvider(
          [
            "0x1d7f73d33f433eec6b05a259aba8db1b94cf72919ace86c5c32cd622df566c2a",
          ], // 환경 변수에서 개인 키 가져오기
          "https://polygonzkevm-cardona.g.alchemy.com/v2/K2rwCMG8VK29ZGlnU7WPN3qczr0MmBVW",
          0 // by alchemy
        ),
      network_id: 2442, //
      // gas: 5500000, // 최대 가스 한도
      // confirmations: 2, // 배포 확인 대기
      timeoutBlocks: 200, // 배포 타임아웃
      // skipDryRun: true, // Dry run 스킵
    },

    //
    // An additional network, but with some advanced options…
    // advanced: {
    //   port: 8777,             // Custom port
    //   network_id: 1342,       // Custom network
    //   gas: 8500000,           // Gas sent with each transaction (default: ~6700000)
    //   gasPrice: 20000000000,  // 20 gwei (in wei) (default: 100 gwei)
    //   from: <address>,        // Account to send transactions from (default: accounts[0])
    //   websocket: true         // Enable EventEmitter interface for web3 (default: false)
    // },
    //
    // Useful for deploying to a public network.
    // Note: It's important to wrap the provider as a function to ensure truffle uses a new provider every time.
    // goerli: {
    //   provider: () =>
    //     new HDWalletProvider(
    //       MNEMONIC,
    //       `https://goerli.infura.io/v3/${PROJECT_ID}`
    //     ),
    //   network_id: 5, // Goerli's id
    //   confirmations: 2, // # of confirmations to wait between deployments. (default: 0)
    //   timeoutBlocks: 200, // # of blocks before a deployment times out  (minimum/default: 50)
    //   skipDryRun: true, // Skip dry run before migrations? (default: false for public nets )
    // },
    //
    // Useful for private networks
    // private: {
    //   provider: () => new HDWalletProvider(MNEMONIC, `https://network.io`),
    //   network_id: 2111,   // This network is yours, in the cloud.
    //   production: true    // Treats this network as if it was a public net. (default: false)
    // }
  },

  // Set default mocha options here, use special reporters, etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.22", // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {          // See the solidity docs for advice about optimization and evmVersion
      //  optimizer: {
      //    enabled: false,
      //    runs: 200
      //  },
      //  evmVersion: "byzantium"
      // }
    },
  },

  // Truffle DB is currently disabled by default; to enable it, change enabled:
  // false to enabled: true. The default storage location can also be
  // overridden by specifying the adapter settings, as shown in the commented code below.
  //
  // NOTE: It is not possible to migrate your contracts to truffle DB and you should
  // make a backup of your artifacts to a safe location before enabling this feature.
  //
  // After you backed up your artifacts you can utilize db by running migrate as follows:
  // $ truffle migrate --reset --compile-all
  //
  // db: {
  //   enabled: false,
  //   host: "127.0.0.1",
  //   adapter: {
  //     name: "indexeddb",
  //     settings: {
  //       directory: ".db"
  //     }
  //   }
  // }
};
