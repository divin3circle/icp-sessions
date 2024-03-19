# skill_db_dapp

Welcome to a Database Azle project! This example project will help you to deploy your a student-skill canister (application) to the Internet Computer (IC) decentralized cloud. It is a simple getter/setter canister. You can always refer to [The Azle Book](https://demergent-labs.github.io/azle/) for more in-depth documentation.

`dfx` is the tool you will use to interact with the IC locally and on mainnet. If you don't already have it installed:

```bash
npm run dfx_install
```

To deploy your Canister locally:

```bash
dfx start --clean --background
```

If you ever want to stop the replica:

```bash
dfx deploy skill_db_dapp
```

After deploying your canister you'll a liknk simillar to this `http://127.0.0.1:4943/?canisterId=bd3sg-teaaa-aaaaa-qaaba-cai&id=bkyz2-fmaaa-aaaaa-qaaaq-cai` use it to navigate to the Candid Interface, and interact with the given methods.
