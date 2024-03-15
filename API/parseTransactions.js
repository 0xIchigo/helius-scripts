const url = `https://api.helius.xyz/v0/transactions/?api-key=<API_KEY>`;

const fetchAndParseTransactions = async () => {
    let lastSignature = null;
    
    while (true) {
        if (lastSignature) {
            url += `&before=${lastSignature}`;
        }
        const response = await fetch(url);
        const transactions = await response.json();
  
        if (transactions && transactions.length > 0) {
            console.log("Fetched transactions: ", transactions);
            lastSignature = transactions[transactions.length - 1].signature;
        } else {
            console.log("No more transactions available.", transactions);
            break;
      }
    }
  };
  
  fetchAndParseTransactions();