# ✅ Verification

In this section, you'll play the role of a <span class="label-role verifier">verifier</span>: 
* You'll take an `AttestedClaim` object;
* You'll verify that its data is correct;
* You'll verify that it exists, aka that it's on-chain.

## Get an `AttestedClaim` object
 
You can either:
* take the `AttestedClaim` object you've generated in the previous step as an <span class="label-role attester">attester</span>;
* or select one from this [shared doc](https://hackmd.io/c6OBNgWWR8yWJhMj7WICUA?edit);
* or if you're in a workshop, ask another participant to send you their `AttestedClaim` object.  

In the following, we'll refer to it as `[ATTESTEDCLAIM JSON OBJECT]`.

## Code: create file
Create a new file `4-verification.js`.  
All the following code needs to go into this file.

## Code: verify the data

```javascript
const Kilt = require('@kiltprotocol/sdk-js')

const attestedClaimAsJson = '[ATTESTEDCLAIM JSON OBJECT]'
const attestedClaimObj = JSON.parse(attestedClaimAsJson)
// create an attested claim from the JSON object
const attestedClaim = Kilt.AttestedClaim.fromObject(attestedClaimObj) 

// verify the included data against the included ctype
const isDataVerified = attestedClaim.verifyData()
console.log('isDataVerified', isDataVerified)
```

## Code: verify on-chain 

Append the following code to `4-verification.js`:  

```javascript 
// connect to the blockchain
Kilt.default.connect('wss://full-nodes.kilt.io:9944')

// verify that the included attestation is on-chain
attestedClaim.verify().then(data => {
  console.log('isVerified', data)
})
```

## Run
Execute the file by running this command in your terminal (still within your `kilt-rocks` directory):

```bash
node 4-verification.js
```  

That's it!   
You've successfully verified a claim, as a <span class="label-role verifier">verifier</span>.
