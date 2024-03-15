const url = `https://mainnet.helius-rpc.com/?api-key=`;

const getMultipleAccounts = async () => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "jsonrpc": "2.0",
                "id": 1,
                "method": "getMultipleAccounts",
                "params": [
                    [
                      "vines1vzrYbzLMRdu58ou5XTby4qAqVRLmqo36NKPTg",
                      "4fYNw3dojWmQ4dXtSGE9epjRGy9pFSx62YypT7avPYvA"
                    ],
                    {
                      "encoding": "base58"
                    }
                  ]
            })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data.result);
    } catch (error) {
        console.error(error);
    }
};

getMultipleAccounts();
