const url = `https://mainnet.helius-rpc.com/?api-key=`;

const search = async () => {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            jsonrpc: "2.0",
            id: "my-id",
            method: "searchAssets",
            params: {
                ownerAddress: "ED6tZV7gCSjryLGBnX9qvSK2peUWdtKbEdmtSSuLKXGd",
                limit: 1000,
                page: 1,
                sortBy: { sortBy: "id", sortDirection: "asc" },
                tokenType: "fungible",
            },
        }),
    });
  
    const { result } = await response.json();
    console.log(result);
};

search();