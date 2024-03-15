const url = `https://api.helius.xyz/v0/webhooks?api-key=`;

const accountWebhook = async () => {
  try { 
    const response = await fetch(
        url,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "webhookURL": "",
            "transactionTypes": ["Any"],
            "accountAddresses": [ 
              "7Ro9kBSxTUeC5C8cxnufT2DaDuhNXoc1bf4XedUGd1KJ",
            ],
            "webhookType": "raw"
          }),
        }
    );
    
    const data = await response.json();
    console.log({ data });
  } catch (e) {
      console.error("error", e);
  }
};

accountWebhook();