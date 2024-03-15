const url = `https://api.helius.xyz/v0/webhooks?api-key=`;

const getWebhooks = async () => {
    try {
        const response = await fetch(
            url,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );

        const data = await response.json();
        console.log({ data });
    } catch (e) {
        console.error("error", e);
    }
};

getWebhooks();