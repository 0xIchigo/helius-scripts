const url = `https://api.helius.xyz/v0/webhooks?api-key=`;

const editWebhook = async () => {
    try {
        const response = await fetch(
            url,
            {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                webhookURL: "",
                transactionTypes: [
                "Any"
                ],
                accountAddresses: [
                "2BsMJq3s4GWvDe4evW6Y29aQHWSAio5bfFQuJPk8aikt",
                "FigQYUdVFU4h1t1vc87dQT3g8JGKV7TFXh9hjtnNgBxb",
                "7NTWQW2WrbtrgRizQJ12r2mp2PMvua97TzesbdL9xwDJ",
                "4LUAkGpFyp6jUe32e92LnG5qbSQeuy5YTCc6R38dF7Hy",
                "3Py6kiPZXDkqYi6LVsuG7PJ4HJKtDbvZRNqTQ2EnUcSB",
                "BcWAv5TNqGeZCw3sjcBc7VeSg4byz2t54LS2qoVoaJjG",
                "6JjrPkv6JKoMojeZuzuhFLNAGJsTAaRVhUb5dk4oZm4V",
                "3uG93vb9MmDLAEuhZzMscBbf6v6zf9oxZTV3D43pS4je",
                "2ZByQohMRUefF8nfvzCuqyNt3EbTvPj7RMk6GvkuVzkK",
                "GzNndgjdfSPZbLHRgFr7ohy4h2eTbsX3WhoeCqa1m8sK",
                "J52SQ5kde8bNqPPB6tGdb8VueAufhD3W7QdzYt4T16Sw",
                "F7JFUCHWaMH52UG2jffCsE2krVc2Kg8SYjxYNrfYkF7L",
                "9r3Nbgz2sjxj725Cz8CHrs91yxoHxeoqZ4ykkxMuN8fA",
                "FVC1eFZHUexuDvEngLbeQHe4GwUNVHsww5VVM8uzkm5Y",
                "ADFARUcBMDsd2pqDbuqgCBLYFPmf1bVs3fM9SE1RbvmY",
                "21wqgVAMkcu3J17NJbf4Jj2vzSstPkTUJzGyqPN4TKaB",
                "A5wkT9zx92mtyQyjogqsn7xVtXPDWMwZJE4cxNm8tPZg"
                ],
                webhookType: "enhanced"
            }),
            }
        );

        const data = await response.json();
        console.log({ data });
    } catch (e) {
      console.error("error", e);
    }
};

editWebhook();