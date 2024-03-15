const url = `https://mainnet.helius-rpc.com/?api-key=`;

const getAssetsByCreator = async () => {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            jsonrpc: "2.0",
            id: "my-id",
            method: "getAssetsByCreator",
            params: {
                creatorAddress: "9Be7xQCYRXUoTRZs9U13Goi4EPRr6jDh3WZaVwgduA8y",
                //onlyVerified: false,
                page: 1, // Starts at 1
                limit: 1000,
                // sortBy: { sortBy: "created", sortDirection: "asc", },
                // options: {
                //   showInscription: false,
                //   showGrandTotal: false,
                //   showCollectionMetadata: false,
                //   showUnverifiedCollections: false,
                // }
            },
        }),
    });

    const { result } = await response.json();
    console.log("Assets by Creator: ", result);
};

getAssetsByCreator();