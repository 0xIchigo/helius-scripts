
import {
    Connection,
    Keypair,
    PublicKey,
    Transaction,
    sendAndConfirmTransaction,
} from "@solana/web3.js";

import {
    ValidDepthSizePair,
    createAllocTreeIx,
    SPL_NOOP_PROGRAM_ID,
    SPL_ACCOUNT_COMPRESSION_PROGRAM_ID
} from "@solana/spl-account-compression";

import {
    PROGRAM_ID,
    createCreateTreeInstruction
  } from "@metaplex-foundation/mpl-bubblegum";

const createTree = async (
    connection: Connection,
    payer: Keypair,
    treeKeypair: Keypair,
    maxDepthSizePair: ValidDepthSizePair,
    canopyDepth: number = 0,
) => {
    const allocTreeInstruction = await createAllocTreeIx(
        connection,
        treeKeypair.publicKey,
        payer.publicKey,
        maxDepthSizePair,
        canopyDepth,
    );

    const [treeAuthority, ] = PublicKey.findProgramAddressSync(
        [treeKeypair.publicKey.toBuffer()],
        PROGRAM_ID,
    );

    const createTreeInstruction = createCreateTreeInstruction(
        {
            payer: payer.publicKey,
            treeCreator: payer.publicKey,
            treeAuthority,
            merkleTree: treeKeypair.publicKey,
            compressionProgram: SPL_ACCOUNT_COMPRESSION_PROGRAM_ID,
            logWrapper: SPL_NOOP_PROGRAM_ID,
        },
        {
            maxBufferSize: maxDepthSizePair.maxBufferSize,
            maxDepth: maxDepthSizePair.maxDepth,
            public: false,
        },
        PROGRAM_ID,
    );

    try {
        const transaction = new Transaction().add(allocTreeInstruction).add(createTreeInstruction);
        transaction.feePayer = payer.publicKey;

        const transactionSignature = await sendAndConfirmTransaction(
            connection,
            transaction,
            [treeKeypair, payer],
            {
                commitment: "confirmed",
                skipPreflight: true,
            },
        );

        console.log(`Successfully created a Merkle tree with txt sig: ${transactionSignature}`);
    } catch (error: any) {
        console.error(`Failed to create a Merkle tree with error: ${error}`);
    } 
}
