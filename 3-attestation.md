# Attestation

In this section, we will take a *RequestForAttestation* object, attest it, store the attest on the chain and build the *AttestedClaim* object, which will be send back to the claimer.

## Preparation
Open up a new file `3-attestation.js`.
All the following code needs to go into this file.

## Imports
The following imports will be necessary for this section:
```javascript
const Kilt = require('@kiltprotocol/sdk-js')
```

## Create Attester Identity
First we need to generate an Identity for the Attester.
Use `node 1-generateMnemonic.js` again to generate one.

!> Tell the workshop organizer the address of your attester, so that he can transfer some tokens to you.

Paste the mnemonic into `[YOUR MNEMONIC]`
```javascript
const attester = Kilt.Identity.buildFromMnemonic('[YOUR MNEMONIC]')
```

## Take RequestForAttestation object
Select a RequestForAttestation from the [exchange](https://hackmd.io/c6OBNgWWR8yWJhMj7WICUA?edit) and paste it here.
```javascript
const requestForAttestationAsJson = '[THE JSON OBJECT]'
const requestForAttestationAsObj = JSON.parse(requestForAttestationAsJson)
const requestForAttestation = Kilt.RequestForAttestation.fromObject(requestForAttestationAsObj)
```

To check, if the object is valid, you can check the data against the ctype
and check, if the signature is valid.
```javascript
const isDataValid = requestForAttestation.verifyData()
const isSignatureValid = requestForAttestation.verifySignature()
console.log(isDataValid)
console.log(isSignatureValid)
```

## Create Attestation

Build the Attestation object.
```javascript
const attestation = new Kilt.Attestation(requestForAttestation, attester)
```

The attestation can now be stored on the blockchain.
To do that, we first have to connect to the it.
```javascript
Kilt.default.connect('wss://full-nodes.kilt.io:9944')
```

Then we just call the store method.

!> The attestation can only be stored once per *RequestForAttestation*. So before you execute the file, make sure you've followed the instructions in the next section "Create AttestedClaim" 

```javascript
attestation.store(attester).then(data => {
  console.log(data)
}).then(() => {
  // Put the code from section "Create AttestedClaim" here!
}).catch(e => {
  console.log(e)
}).finally(() => {
  Kilt.BlockchainApiConnection.getCached().then(blockchain => {
    blockchain.api.disconnect()
  })
})
```

## Create AttestedClaim
After the attestation was successfully stored on the chain, we can create the *AttestedClaim* object and put it back to the [exchange](https://hackmd.io/c6OBNgWWR8yWJhMj7WICUA?edit).

```javascript
// The AttestedClaim object is the one sent back to the claimer.
const attestedClaim = new Kilt.AttestedClaim(requestForAttestation, attestation)

// Let's copy the result and put it back to the exchange
console.log(JSON.stringify(attestedClaim))
```

Execute the file with
```bash
node 3-attestation.js
```
