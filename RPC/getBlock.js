const url = `https://mainnet.helius-rpc.com/?api-key=`;

const getBlock = async () => {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            jsonrpc: "2.0",
            id: 1,
            method:"getBlock",
            params: [
                1100, {
                    encoding: "json",
                    maxSupportedTransactionVersion: 0,
                    transactionDetails: "full",
                    rewards: false
                }
            ]
        }),
    });
    const data = await response.json();
    console.log("Block: ", JSON.stringify(data, null, 2));
};
  
getBlock();