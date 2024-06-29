# Tamper Proof Data

At Bequest, we require that important user data is tamper proof. Otherwise, our system can incorrectly distribute assets if our internal server or database is breached. 

**1. How does the client ensure that their data has not been tampered with?**
    
    a. Use a cryptographic hash (such as SHA-256) to create a hash of the data when it is sent to the server. Store this hash on the client side.
    
    b. When the client retrieves data from the server, it will compare the hash of the received data with the stored hash to verify its integrity.
<br />
**2. If the data has been tampered with, how can the client recover the lost data?**

    a. Implement versioning on the server side by keeping a history of changes to the data.
    b. Allow the client to request previous versions of the data in case tampering is detected.


**Code Implementation Details**
***Client Side***

In the client/src/App.tsx file, the verifyData function has been implemented to check the integrity of the data. If tampering is detected, it calls the recoverData function to fetch the most recent valid data from the server's history.

The createHash function generates a SHA-256 hash of the data using the crypto module. This ensures that the hash comparison is secure and reliable.

***Server Side***

In the server/app.ts file, the history array maintains a log of all changes to the data. Each time data is updated via a POST request, the new data along with a timestamp is pushed to the beginning of the history array.

The /history endpoint provides this history to the client, allowing the client to recover the latest valid data if tampering is detected.

### To run the apps:
```npm run start``` in both the frontend and backend

## To make a submission:
1. Clone the repo
2. Make a PR with your changes in your repo
3. Email your github repository to robert@bequest.finance
