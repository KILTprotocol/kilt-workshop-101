# 🔖 Attestation 

In this section, you'll play the role of the <span class="label-role attester">attester</span>:
* You'll take a `RequestForAttestation` object; 
* Attest it;
* Store the attestation on the chain;
* Build the `AttestedClaim` object, which will be send back to the <span class="label-role claimer">claimer</span>.

## Get some tokens as an attester  
When writing the hash of credentials on the blockchain, <span class="label-role attester">attesters</span> have to pay the angel’s
share (gas or transaction fee) in KILT Tokens. So you'll need tokens to attest a claim.   

Go to https://faucet.kilt.io/ and request tokens for your `<ATTESTER'S ADDRESS>`.

## Code: create file 
Create a new file `3-attestation.js`.
All the following code needs to go into this file.  

## Code: validate the `RequestForAttestation` object 

In a real system: as an <span class="label-role attester">attester</span>, you would directly receive a `RequestForAttestation` from a  <span class="label-role claimer">claimer</span> via KILT's 1:1 messaging system.  

In this tutorial, you can either:
* take the `RequestForAttestation` object you've generated in the previous step as a <span class="label-role claimer">claimer</span>;
* or select one from this [shared doc](https://hackmd.io/c6OBNgWWR8yWJhMj7WICUA?edit);
* or if you're in a workshop, ask another participant to send you their `RequestForAttestation` object.  

In the following, we'll refer to it as `<requestForAttestationJSON>`.  

Paste the following code in `3-attestation.js` (make sure to replace `<ATTESTER'S MNEMONIC>` and `<requestForAttestationJSON>` with the relevant objects):  

```javascript 
const Kilt = require('@kiltprotocol/sdk-js') 

// use the ATTESTER'S MNEMONIC you've generated in the Identity step
const attester = Kilt.Identity.buildFromMnemonic(`<ATTESTER'S MNEMONIC>`)

const requestForAttestationAsJson = '<requestForAttestationJSON>';
const requestForAttestationAsObj = JSON.parse(
  JSON.stringify(requestForAttestationAsJson)
);
const requestForAttestation = Kilt.RequestForAttestation.fromRequest(
  requestForAttestationAsObj
);
```

To check if the object is valid, you can check the data against the CTYPE
and check if the signature is valid.
```javascript
const isDataValid = requestForAttestation.verifyData()
const isSignatureValid = requestForAttestation.verifySignature()
console.log(isDataValid)
console.log(isSignatureValid)
```

## Code: create Attestation  

Now is time to interact with the chain, in order to store an attestation on there.   
Append the following code to `3-attestation.js`.


```javascript 
// build the Attestation object
const attestation = Kilt.Attestation.fromRequestAndPublicIdentity(
  requestForAttestation,
  attester.getPublicIdentity()
);

// connect to the chain (this is one KILT test node)
Kilt.default.connect('wss://full-nodes.kilt.io:9944')

// store the attestation on chain
attestation.store(attester).then(data => {
  console.log(data)
}).then(() => {
  // the attestation was successfully stored on the chain, so we can create the *AttestedClaim* object 
    const attestedClaim = Kilt.AttestedClaim.fromRequestAndAttestation(
      requestForAttestation,
      attestation
    );
  // Let's copy the result to send it to the claimer
  console.log(JSON.stringify(attestedClaim))
}).catch(e => {
  console.log(e)
}).finally(() => {
  Kilt.BlockchainApiConnection.getCached().then(blockchain => {
    blockchain.api.disconnect()
  })
})
```

## Run 

Execute the file by running this command in your terminal (still within your `kilt-rocks` directory):
```bash
node 3-attestation.js
``` 
The `attestedClaim` should be printed out.   
We now need to "send it back" to the claimer, for example by pasting it in the [shared doc](https://hackmd.io/c6OBNgWWR8yWJhMj7WICUA?edit).
