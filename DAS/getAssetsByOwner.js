const url = `https://mainnet.helius-rpc.com/?api-key=`;

const getAssetsByOwner = async () => {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            jsonrpc: "2.0",
            id: "0",
            method: "getAssetsByOwner",
            params: {
                ownerAddress: "EfF97oMRmeMXevuTj6uaV1QpfSetgwwupGmzyHakF1HZ",
                page: 1,
                limit: 10,
                displayOptions: {
                    showFungible: true,
                },
            },
        }),
    });

    const { result } = await response.json();
    console.log(JSON.stringify(result.items, null, 2));
};

getAssetsByOwner();