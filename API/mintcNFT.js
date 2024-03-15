const url = `https://mainnet.helius-rpc.com/?api-key=`;

const mintCompressedNFT = async () => {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            jsonrpc: "2.0",
            id: "frames-sol-mint",
            method: "mintCompressedNft",
            params: {
                name: "Helius Customer Support",
                symbol: "HCS",
                owner: "ApxEjZoivoXwSDrnvXbh428pm1fi2xNfK4g7wYsefCAC",
                description: "24/7 priority support for Solana's most loved RPC Nodes, APIs, Webhooks, and Developer Tooling",
                attributes: [
                    {
                        trait_type: "Support",
                        value: "Legendary",
                    },
                    {
                        trait_type: "Company",
                        value: "Helius"
                    },
                ],
                imageUrl: "https://shdw-drive.genesysgo.net/HmvVwYAy7cxWECLbu2cjWBSHysVoriTqgdugyePVg3rY/helius-customer-support.jpg",
                externalUrl: "https://www.helius.dev/",
                sellerFeeBasisPoints: 6900,
            },
        }),
    });

    const { result } = await response.json();
    console.log(`Minted asset: ${result.assetId}`);
};

mintCompressedNFT();