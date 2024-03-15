import {
    Keypair,
    PublicKey,
    Connection,
    Transaction,
    sendAndConfirmTransaction,
} from "@solana/web3.js";
    import { 
      createAccount, 
      createMint, 
      mintTo, 
      TOKEN_PROGRAM_ID 
  } from "@solana/spl-token";
  import {
    PROGRAM_ID,
    CreateMetadataAccountArgsV3,
    createCreateMetadataAccountV3Instruction,
    createCreateMasterEditionV3Instruction,
    createSetCollectionSizeInstruction,
  } from "@metaplex-foundation/mpl-token-metadata";
  
  const createCollection = async (connection: Connection, payer: Keypair, metadata: CreateMetadataAccountArgsV3) => {
    // Set the mint and freeze authorities to the payer.publicKey
    // We also set the decimals to zero since NFTs are non-fungible
    const mint = await createMint(connection, payer, payer.publicKey, payer.publicKey, 0);
  
    const tokenAccount = await createAccount(connection, payer, mint, payer.publicKey);
  
    // Mint 1 NFT with no multiSigners
    const mintTxtSignature = await mintTo(connection, payer, mint, tokenAccount, payer, 1, [], undefined, TOKEN_PROGRAM_ID);
    console.log(`Minted 1 NFT: ${mintTxtSignature}`);
  
    // Derive the PDA for the metadata account
    const [metadataAccount, _bump] = PublicKey.findProgramAddressSync(
      [Buffer.from("metadata", "utf8"), PROGRAM_ID.toBuffer(), mint.toBuffer()],
      PROGRAM_ID
    );
    console.log("Metadata account:", metadataAccount.toBase58());
  
    /*
      Instruction for the metadata account
      This account holds information about the NFT, which is useful for providing contextual info about the token
    */
    const createMetadataInstruction = createCreateMetadataAccountV3Instruction(
      {
        metadata: metadataAccount,
        mint: mint,
        mintAuthority: payer.publicKey,
        payer: payer.publicKey,
        updateAuthority: payer.publicKey,
      },
      {
        createMetadataAccountArgsV3: metadata,
      }
    );
  
    // Derive the PDA for the master edition account
    const [masterEditionAccount] = PublicKey.findProgramAddressSync(
      [Buffer.from("metadata", "utf8"), PROGRAM_ID.toBuffer(), mint.toBuffer(), Buffer.from("edition", "utf8")],
      PROGRAM_ID
    );
    console.log("Master edition account:", masterEditionAccount.toBase58());
  
    /*
      Instruction for the master edition account
      This account holds additional data and allows the creation of limited editions
    */
    const createMasterEditionInstruction = createCreateMasterEditionV3Instruction(
      {
        edition: masterEditionAccount,
        mint: mint,
        mintAuthority: payer.publicKey,
        payer: payer.publicKey,
        updateAuthority: payer.publicKey,
        metadata: metadataAccount,
      },
      {
        createMasterEditionArgs: {
          maxSupply: 0,
        },
      }
    );
  
    // Instruction for the collection size
    const collectionSizeInstruction = createSetCollectionSizeInstruction(
      {
        collectionMetadata: metadataAccount,
        collectionAuthority: payer.publicKey,
        collectionMint: mint,
      },
      {
        setCollectionSizeArgs: { size: 100 },
      }
    );
  
    try {
      const tx = new Transaction()
        .add(createMetadataInstruction)
        .add(createMasterEditionInstruction)
        .add(collectionSizeInstruction);
  
      // Setting as the payer the feePayer
      tx.feePayer = payer.publicKey;
  
      const txtSignature = await sendAndConfirmTransaction(connection, tx, [payer], {
        commitment: "confirmed",
        skipPreflight: true,
      });
  
      console.log(`Successfully created a collection with the txt sig: ${txtSignature}`);
    } catch (err) {
      console.error(`Failed to create collection with error: ${err}`);
    }
  };