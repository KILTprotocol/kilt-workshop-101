# 🔖 Attestation 

In this section, you'll play the role of the <span class="label-role attester">attester</span>:

* You'll take a `RequestForAttestation` object;
* Attest it;
* Store the attestation on the chain (more specifically only its hash, we'll get to that);
* Build the `AttestedClaim` object which will be send back to the <span class="label-role claimer">claimer</span>.

## Request KILT tokens

When writing the hash of attestations on the blockchain, <span class="label-role attester">attesters</span> have to pay the angel’s
share (gas or transaction fee) in KILT Tokens. So you'll need tokens to attest a claim.   

Go to the [faucet] and request tokens for your `<ATTESTER'S ADDRESS>`.

Sadly these are just play tokens, not real money.

## Create a file

Create a new file `3-attestation.js`.
All of the code for this step needs to go into this file.

## Code: validate the `RequestForAttestation` object

In a real-life setup, as an <span class="label-role attester">attester</span> you would directly receive a `RequestForAttestation` from a  <span class="label-role claimer">claimer</span>.  

In this tutorial, you can either:

* Take the `RequestForAttestation` object you've generated in the previous step as a <span class="label-role claimer">claimer</span>;
* Or if you're in a workshop, ask another participant to send you their `RequestForAttestation` object.  

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
  // the attestation was successfully stored on the chain, so you can now create the AttestedClaim object
    const attestedClaim = Kilt.AttestedClaim.fromRequestAndAttestation(
      requestForAttestation,
      attestation
    );
  // log the attestedClaim so you can copy/send it back to the claimer
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

Execute the file by running this command in your terminal, still within your `kilt-rocks` directory:

```bash
node 3-attestation.js
```

You should see in your logs:

* `true` and `true` if the signature and data are valid (they should be);
* The blockchain transaction status `TxStatus`, which should be `Finalized`;
* The `AttestedClaim` object.

Copy the `AttestedClaim` object, you'll need it soon.

Your job as an <span class="label-role attested">attester</span> is done: you've successfully attested a claim, written the attestation hash onto the chain, and prepared the `AttestedClaim` object for the <span class="label-role claimer">claimer</span>.

[faucet]: [https://faucet.kilt.io/]
