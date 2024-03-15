const url = `https://mainnet.helius-rpc.com/?api-key=`;

const getAssetsByGroup = async () => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            jsonrpc: '2.0',
            id: 'my-id',
            method: 'getAssetsByGroup',
            params: {
                groupKey: 'collection',
                groupValue: 'J1S9H3QjnRtBbbuD4HjPV6RpRhwuk4zKbxsnCHuTgh9w',
                page: 1, // Starts at 1
                limit: 1000,
            },
        }),
    });

    const { result } = await response.json();
    console.log("Assets by Group: ", result.items);
};

getAssetsByGroup();