import { 
    Connection, 
    LAMPORTS_PER_SOL 
} from "@solana/web3.js";

import { 
    getConcurrentMerkleTreeAccountSize, 
    ALL_DEPTH_SIZE_PAIRS 
} from "@solana/spl-account-compression";

const connection = new Connection("");

const calculateCosts = async (maxProofSize: number) => {
    await Promise.all(ALL_DEPTH_SIZE_PAIRS.map(async (pair) => {
        const canopy = pair.maxDepth - maxProofSize;
        const size = getConcurrentMerkleTreeAccountSize(pair.maxDepth, pair.maxBufferSize, canopy);
        const numberOfNfts = Math.pow(2, pair.maxDepth);
        const rent = (await connection.getMinimumBalanceForRentExemption(size)) / LAMPORTS_PER_SOL;

        console.log(`maxDepth: ${pair.maxDepth}, maxBufferSize: ${pair.maxBufferSize}, canopy: ${canopy}, numberOfNfts: ${numberOfNfts}, rent: ${rent}`);
    }));
}

await calculateCosts(<number>);
