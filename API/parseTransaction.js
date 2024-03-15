const url = `https://api.helius.xyz/v0/transactions/?api-key=<API_KEY>`;

const parseTransaction = async () => {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            transactions: [
                "2T7y6GDhWynT3ZTHkbdWfvdCBF38HE9Bia6te4qr5gMAc59VDm3fsnd4YckGgmAcy27udSfJWPdwDb7qMWMv4aSt", 
                "46VwkcC2bJc1MNzhLnr64sctBcBiyADqjGUAEAoGby7uLiXdJXyA9uK2KDps1qRKRySVE1bpuFao8NjG9SshECBx", 
                "5w4i9rZ9zckAAfB98AQEUxEqpqGmMyFn47BnM85qQX1NSzJCaqHWXpJjcTwjVB9x724BgHA8cBRDSwSGn4wR6p5y", 
                "4QbThHjeaA7TEW8DgwuKnJxNfq63PRFqSJ2U2XoDvT6RvcPz2DaqRgwWVQBFH26qRjwJVo1cEdwk1DbZ4nR4AG3W", 
                "3v4z7fot9hS7gpUBvd7LMDEo1KN9QqkhUzTob6iVsgeSjPzRZJy5xb7HHmt5oFQkbyAp8k5rPxSGKGnxtUSUFeEh", 
                "31fcFxzojUQZmuJVnyCBrZrvXYzdLtBumsfFJeYqb9HDZqPnMZpZSKV1sUVhLPDyR12zMzq8EQifqWtpD5Wh5Hed", 
                "cHKnVNbuuA7j4EGxsCZgfVfMG5XDYTxRMbzHrS4Np2vBKUEr4iDjkBE55vHTJePPfs2mv5QEQzoxSJCaXZuUKmL", 
                "3foUHXoi45aEjdYwPSJx2mtFjo37azN3VAjXsmhYcZNYarkxYFsdsRVvzWxVVgtp4dFKATvD7Xz9UHHUofJ45b2F", 
                "4yNxi7VfmdGMKR7bX29ydKz5xhbnNMzKu9aK3oBf5YNx2TZCkw1jk7Vp4Npmkb14w7f9WGh9aEoXtFv1DPWmAHP2", 
                "Hnhm4oSffGozYLy5ZDcvJfG2HNQA4Cpxx52WH6S5VmFw8974NW5EMo9ZCHEr8dPaJ7gkUREBeMFSqvjFN81Tthc", 
                "61DLLacvC8T9VnGkyRmpdxikqNyqULzpWsV2A118owZwfSSVHQpgGzhSaE3QxPS8nDhi4xPDbn4EPdpgfJXUcMch", 
                "3y9cHvej7sts3HQrsZWV8cpCsT4nUjAGKKn6fToqLmdTYcWaujTvkXpLZMC1gqhyUe4USKk5JJ33yS3espM9WsMr", 
                "5wHizbVF4Q2XoTX6Ngsjib6AE7oJDzkb2Uo6XqHvfwFFWKNK4aaaosDG7KSpsDFZrMw3TaMEaAtUfcfg2bE2YekB"
            ],
        }),
    });
  
    const data = response.json();
    console.log("parsed transaction: ", JSON.stringify(data, null, 2));
};
  
parseTransaction();