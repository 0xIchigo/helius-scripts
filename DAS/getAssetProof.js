const url = `https://mainnet.helius-rpc.com/?api-key=`;

const getAssetProof = async () => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            jsonrpc: '2.0',
            id: 'my-id',
            method: 'getAssetProof',
            params: {
                id: 'Bu1DEKeawy7txbnCEJE4BU3BKLXaNAKCYcHR4XhndGss'
            },
        }),
    });
    
    const { result } = await response.json();
    console.log("Assets Proof: ", result);
};
getAssetProof(); 