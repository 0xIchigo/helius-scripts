import {
    Keypair,
    Connection,
    PublicKey,
    Transaction,
    SystemProgram,
    LAMPORTS_PER_SOL,
    sendAndConfirmTransaction,
    ComputeBudgetProgram,
} from "@solana/web3.js";
  
async function main() {
    // Initialize an RPC client
    const clusterUrl = "http://127.0.0.1:8899";
    const connection = new Connection(clusterUrl, "confirmed");
  
    // Initialize new sender and receiver keypairs
    const fromKeypair = Keypair.generate();
    const toPubkey = new PublicKey(Keypair.generate().publicKey);
  
    // Airdrop SOL to the from_keypair
    const airdropAmount = 100 * LAMPORTS_PER_SOL;
    try {
        const signature = await connection.requestAirdrop(
            fromKeypair.publicKey,
            airdropAmount
        );
        console.log("Airdrop requested. Signature:", signature);
        await connection.confirmTransaction({
            signature,
            confirmation: "confirmed",
        });
    } catch (e) {
        console.error("Failed to request airdrop:", e);
        return;
    }
  
    // Check if airdrop was successful
    const balance = await connection.getBalance(fromKeypair.publicKey);
    if (balance < airdropAmount) {
        console.error(
            "Airdrop was not successful. The current balance is insufficient"
        );
        return;
    }
  
    // Airdrop SOL to the toPubkey
    const airdropAmountTo = 100 * LAMPORTS_PER_SOL; // 1 SOL in lamports
    try {
        const signature = await connection.requestAirdrop(toPubkey, airdropAmount);
        console.log("Airdrop requested. Signature:", signature);
        await connection.confirmTransaction({
            signature,
            confirmation: "confirmed",
        });
    } catch (e) {
        console.error("Failed to request airdrop:", e);
        return;
    }
  
    // Check if airdrop was successful
    const balanceTo = await connection.getBalance(toPubkey);
    if (balanceTo < airdropAmount) {
        console.error(
            "Airdrop was not successful. The current balance is insufficient"
        );
        return;
    }
  
    console.log(`Account balance: ${balanceTo / LAMPORTS_PER_SOL} SOL`);
  
    // Create the priority fee instructions
    const computePriceIx = ComputeBudgetProgram.setComputeUnitPrice({
        microLamports: 1,
    });
  
    const computeLimitIx = ComputeBudgetProgram.setComputeUnitLimit({
        units: 200_000,
    });
  
    // Create the transfer instruction
    const transferIx = SystemProgram.transfer({
        fromPubkey: fromKeypair.publicKey,
        toPubkey,
        lamports: 100_000,
    });
  
    // Create the transaction with priority fees
    const transaction = new Transaction().add(
        computePriceIx,
        computeLimitIx,
        transferIx
    );
  
    // Fetch the recent blockhash and sign the transaction
    transaction.recentBlockhash = (
        await connection.getLatestBlockhash()
    ).blockhash;
    transaction.sign(fromKeypair);
  
    // Send the transaction
    try {
        const txid = await sendAndConfirmTransaction(connection, transaction, [
            fromKeypair,
        ]);
        console.log("Transaction sent successfully with signature", txid);
    } catch (e) {
        console.error("Failed to send transaction:", e);
    }
}
  
main();
  