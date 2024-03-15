
import { BN } from "@coral-xyz/anchor";
import { PublicKey, Keypair, Connection } from "@solana/web3.js";
import { User, Provider as LightProvider, TestRelayer, confirmConfig, airdropSol } from "@lightprotocol/zk.js";

const initializeSolanaWallet = async (): Promise<any> => {
  const wallet = Keypair.generate();

  console.log("Wallet initialized");
  return wallet;
};

const requestAirdrop = async (connection: Connection, publicKey: PublicKey): Promise<any> => {
  await airdropSol({
    connection,
    lamports: 2e9,
    recipientPublicKey: publicKey,
  });
  console.log("Airdrop requested...");
};

const setupTestRelayer = async (solanaWallet: Keypair): Promise<any> => {
  const testRelayer = new TestRelayer({
    relayerPubkey: solanaWallet.publicKey,
    relayerRecipientSol: solanaWallet.publicKey,
    relayerFee: new BN(100_000),
    payer: solanaWallet,
  });
  console.log("Test relayer initialized");
  return testRelayer;
};

const initializeLightProvider = async (solanaWallet: Keypair, testRelayer: TestRelayer): Promise<any> => {
  const lightProvider = await LightProvider.init({
    wallet: solanaWallet,
    relayer: testRelayer,
    confirmConfig,
  });

  console.log("Light provider initialized");
  return lightProvider;
};

const initializeLightUser = async (lightProvider: LightProvider): Promise<any> => {
  const user = await User.init({ provider: lightProvider });
  console.log("Light user initialized");
  return user;
};

const performShieldOperation = async (user: User) => {
  await user.shield({
    publicAmountSol: "1.1",
    token: "SOL",
  });
  console.log("Performed shield operation");
};

const executePrivateTransfer = async (user: User, testRecipientPublicKey: string) => {
  const response = await user.transfer({
    amountSol: "1",
    token: "SOL",
    recipient: testRecipientPublicKey,
  });
  console.log(`Executed private transfer! Txt hash: ${response.txHash}`);
};

const main = async () => {
  try {
    const solanaWallet = await initializeSolanaWallet();
    const connection = new Connection("http://127.0.0.1:8899");

    await requestAirdrop(connection, solanaWallet.publicKey);

    const testRelayer = await setupTestRelayer(solanaWallet);
    const lightProvider = await initializeLightProvider(solanaWallet, testRelayer);
    const user = await initializeLightUser(lightProvider);

    await performShieldOperation(user);

    const testRecipientKeypair = Keypair.generate();

    await requestAirdrop(connection, testRecipientKeypair.publicKey);

    const lightProviderRecipient = await initializeLightProvider(testRecipientKeypair, testRelayer);
    const testRecipient = await initializeLightUser(lightProviderRecipient);

    await executePrivateTransfer(user, testRecipient.account.getPublicKey());
    console.log(`Successfully sent 1 $SOL to ${testRecipient.account.getPublicKey()} privately!`);
  } catch (e) {
    console.error(`Error sending SOL via Light: ${e}`);
  } finally {
    console.log("Exiting program...");
    process.exit(0);
  }
};

main();
