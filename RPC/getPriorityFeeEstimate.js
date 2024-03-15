const url = `https://mainnet.helius-rpc.com/?api-key=`;

const getRecentPrioritizationFees = async () => {
    const response = await fetch(url, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
            jsonrpc: "2.0",
            id: 1,
            method: "getPriorityFeeEstimate",
            params: [{
                "accountKeys": ["JUP6LkbZbjS1jKKwapdHNy74zcZ3tLUZoi5QNyVTaV4"],
                "options": {
                    "includeAllPriorityFeeLevels": true,
                }
            }]
        }),
    });

    const data = await response.json();
    console.log("Fee: ", data);
};

getRecentPrioritizationFees();