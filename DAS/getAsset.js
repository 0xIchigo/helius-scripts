const url = `https://mainnet.helius-rpc.com/?api-key=`;

const getAsset = async () => {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            jsonrpc: "2.0",
            id: "my-id",
            method: "getAsset",
            params: {
                id: "J1toso1uCk3RLmjorhTtrVwY9HJ7X8V9yYac6Y7kGCPn",
                options: {
                    showFungible: true,
                }
            },
        }),
    });

  const { result } = await response.json();
  console.log("Asset: ", JSON.stringify(result, null, 2));
};

getAsset();