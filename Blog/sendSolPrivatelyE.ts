
import * as ed from "@noble/ed25519";
import { sha512 } from "@noble/hashes/sha512";
ed.etc.sha512Sync = (...m) => sha512(ed.etc.concatBytes(...m));

import {
  Connection,
  PublicKey,
  Keypair,
  ConfirmedSignatureInfo,
  Cluster,
  LAMPORTS_PER_SOL,
  clusterApiUrl,
} from "@solana/web3.js";
import { Elusiv, TokenType, SEED_MESSAGE } from "@elusiv/sdk";

const CLUSTER: Cluster = "devnet";
const RPC = "https://rpc-devnet.helius.xyz";

const main = async () => {
  const connection: Connection = new Connection(RPC);
  const keyPair: Keypair = generateKeypair();
  const recipientPublicKey: PublicKey = new PublicKey(generateKeypair().publicKey);

  await airdropSol(keyPair);

  const seed: Uint8Array = ed.sign(Buffer.from(SEED_MESSAGE, "utf-8"), keyPair.secretKey.slice(0, 32));

  const elusiv: Elusiv = await Elusiv.getElusivInstance(seed, keyPair.publicKey, connection, CLUSTER);

  const balance: bigint = await elusiv.getLatestPrivateBalance("LAMPORTS");

  try {
    if (balance > BigInt(0)) {
      const signature = await send(elusiv, recipientPublicKey, 1 * LAMPORTS_PER_SOL, "LAMPORTS");

      console.log(`Sent with signature ${signature.signature}`);
    } else {
      console.log("Private balance is empty. Topping up...");

      const amount = 1 * LAMPORTS_PER_SOL;
      const tokenType = "LAMPORTS";

      const topUpTxData = await elusiv.buildTopUpTx(amount, tokenType);

      topUpTxData.tx.partialSign(keyPair);

      const topUpSig: ConfirmedSignatureInfo = await elusiv.sendElusivTx(topUpTxData);
      console.log(`Top-up complete with signature ${topUpSig.signature}`);

      const signature: ConfirmedSignatureInfo = await send(elusiv, recipientPublicKey, 1 * LAMPORTS_PER_SOL, "LAMPORTS");

      console.log(`Sent with signature ${signature.signature}`);
    }
  } catch (e) {
    console.error(`Error sending SOL via Elusiv: ${e}`);
  } finally {
    console.log("Exiting program...");
    process.exit(0);
  }
};

const send = async (
  elusiv: Elusiv,
  recipient: PublicKey,
  amount: number,
  tokenType: TokenType
): Promise<ConfirmedSignatureInfo> => {
  const txt = await elusiv.buildSendTx(amount, recipient, tokenType);
  return elusiv.sendElusivTx(txt);
};

const generateKeypair = (): Keypair => {
  let keyPair = Keypair.generate();

  console.log(`Public key: ${keyPair.publicKey.toBase58()}`);
  console.log(`Private key: ${keyPair.secretKey}`);

  return keyPair;
};

const airdropSol = async (wallet: Keypair) => {
  try {
    const connection = new Connection(clusterApiUrl("devnet"));
    const airdropSignature = await connection.requestAirdrop(new PublicKey(wallet.publicKey), 1 * LAMPORTS_PER_SOL);
    const latestBlockHash = await connection.getLatestBlockhash();

    await connection.confirmTransaction({
      blockhash: latestBlockHash.blockhash,
      lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
      signature: airdropSignature,
    });
    console.log(`Airdropped 1 SOL to ${wallet.publicKey.toBase58()}`);
  } catch (e) {
    console.error(`Error sending SOL via Elusiv: ${e}`);
  }
};

main();
