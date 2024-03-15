const url = `https://mainnet.helius-rpc.com/?api-key=`;

const getAccountInfo = async () => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                jsonrpc: "2.0",
                id: "hunter-test-prod",
                method: "getAccountInfo",
                params: [
                    "CFJSoTqZHDVgqwTehGkApEUvuaXiUfFRsFWif6KY8EJ1",
                    {
                    encoding: "base58",
                    },
                ],
            })
        });
  
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
  
        const data = await response.json();
        console.log("assets by owner PROD: ", data.result);
    } catch (error) {
        console.error(error);
    }
};
  
getAccountInfo();
  