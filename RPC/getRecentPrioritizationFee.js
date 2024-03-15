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
            method: "getRecentPrioritizationFees",
        }),
    });
    const data = await response.json();

    const totalFee = data.result.reduce((sum, entry) => sum + entry.prioritizationFee, 0);
    const averageFee = data.result.length > 0 ? totalFee / data.result.length : 0;
    console.log("Average Fee: ", averageFee);
};

getRecentPrioritizationFees();
