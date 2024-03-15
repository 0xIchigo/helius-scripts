const url = `https://mainnet.helius-rpc.com/?api-key=`;

const getAssetsByAuthority = async () => {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            jsonrpc: "2.0",
            id: "my-id",
            method: "getAssetsByAuthority",
            params: {
                authorityAddress: "5DEmaNJJA8kfh7hFLpVp7PLfJMbvABue7ch8yJsX9c2Y",
                page: 1, // Starts at 1
                sortBy: { sortBy: "created" },
            },
        }),
    });
    
    const { result } = await response.json();
    console.log("Assets by Authority: ", result);
};

getAssetsByAuthority();
