const url = `https://api.helius.xyz/v0/webhooks?api-key=`;

const createProgramWebhook = async () => {
    try {
        const response = await fetch(
            `https://api.helius.xyz/v0/webhooks?api-key=${apiKey}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    webhookURL: "https://your-webhook-server.com/your-endpoint",
                    accountAddresses: [],
                    accountAddressOwners: ["PASTE YOUR PROGRAM ADDRESS HERE"],
                    webhookType: "account",
                }),
            }
        );
  
        const data = await response.json();
        console.log({ data });
    } catch (e) {
        console.error("error", e);
    }
};
  
createProgramWebhook();