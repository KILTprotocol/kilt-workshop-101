# ✅ Verification

In this section, you'll play the role of a <span class="label-role verifier">verifier</span>:

* You'll take an `AttestedClaim` object given to you by a <span class="label-role claimer">claimer</span>;
* You'll verify that its data is correct;
* You'll verify that the attestation is valid (= its hash exists on-chain and the attestation is not revoked).

> 💡 An `AttestedClaim` object is also called a Credential: it is what <span class="label-role claimer">claimers</span> present to <span class="label-role verifier">verifiers</span> upon request.

## Get an `AttestedClaim` object

You can either:

* Take the `AttestedClaim` object you've generated in the previous step as an <span class="label-role attester">attester</span>;
* Or if you're in a workshop, ask another participant to send you their `AttestedClaim` object.  

In the following, we'll refer to it as `<attestedClaimJSON>`.

## Create a file

Create a new file `4-verification.js`.  
All of the code for this step needs to go into this file.

## Code: verify the data

```javascript
const Kilt = require('@kiltprotocol/sdk-js')

const attestedClaimAsJson = '<attestedClaimJSON>'
const attestedClaimObj = JSON.parse(JSON.stringify(attestedClaimAsJson));

// create an attested claim from the JSON object
const attestedClaim = Kilt.AttestedClaim.fromAttestedClaim(attestedClaimObj);

// verify the data against the included CTYPE
const isDataVerified = attestedClaim.verifyData()
console.log('isDataVerified:', isDataVerified)
```

## Code: verify on-chain

Append the following code to `4-verification.js`:

```javascript
// connect to the KILT blockchain
Kilt.default.connect('wss://full-nodes.kilt.io:9944')

// verify on-chain that the attestation hash is present and that the attestation is not revoked
attestedClaim.verify().then(isVerified => {
  console.log('isVerified:', isVerified)
}).finally(() => {
  Kilt.BlockchainApiConnection.getCached().then(blockchain => {
    blockchain.api.disconnect()
  })
})
```

## Run

Execute the file by running this command in your terminal, still within your `kilt-rocks` directory:

```bash
node 4-verification.js
```

In your logs, you should see chain queries and successful data verification (`isVerified: true`).

That's it!
You've successfully verified a claim as a <span class="label-role verifier">verifier</span>.
