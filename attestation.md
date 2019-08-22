# 🔖 Attestation 

In this section, you'll play the role of an <span class="label-role attester">attester</span>:
* You'll take a `RequestForAttestation` object; 
* Attest it;
* Store the attestation on the chain;
* Build the `AttestedClaim` object, which will be send back to the <span class="label-role claimer">claimer</span>.

## Preparation
Open up a new file `3-attestation.js`.
All the following code needs to go into this file. 

> Since the KILT-SDK relies on a 1:1 messaging system, we have to exchange our requests without it.
> Just log out your RequestForAttestation object and paste it in the exchange (https://hackmd.io/c6OBNgWWR8yWJhMj7WICUA?edit).  
> You can also send it via mail or another messaging system to a fellow participant.

## Get some tokens as an attester

!> Tell the workshop organizer the address of your attester, so that he can transfer some tokens to you.

## Take RequestForAttestation object
Get a RequestForAttestation from a fellow participant (if not sent directly, you can look at the [exchange](https://hackmd.io/c6OBNgWWR8yWJhMj7WICUA?edit) and select one there) and paste it here.
```javascript 
const Kilt = require('@kiltprotocol/sdk-js') 

const attester = Kilt.Identity.buildFromMnemonic('[YOUR attester MNEMONIC]')

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
To do that, we first have to connect to it.
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
After the attestation was successfully stored on the chain, we can create the *AttestedClaim* object and send it back to the fellow participant or put it back to the [exchange](https://hackmd.io/c6OBNgWWR8yWJhMj7WICUA?edit).

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
