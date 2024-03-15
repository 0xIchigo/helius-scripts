const url = `https://mainnet.helius-rpc.com/?api-key=`;

const getTransaction = async () => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                jsonrpc: "2.0",
                id: 1,
                method: "getTransaction",
                params: [
                    "3gkM6rQRgjRkfos5yjzuUCp3hdWjEj6uuXJQbb4J4iozp8psLkAnjtePW9QWzhXLvdeavJ66uYUDTiVktNYvmiDw", 
                    { maxSupportedTransactionVersion: 0, encoding: "json" }
                ]
            })
        });

        if (!response.ok) {
        throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(JSON.stringify(data, null, 2));
    } catch (error) {
        console.error(error);
    }
};

getTransaction();