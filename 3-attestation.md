# Attestation

Open up a new file `3-attestation.js`

The following imports will be necessary for this section:
```javascript
const Kilt = require('@kiltprotocol/sdk-js')
```

First we need to generate an Identity for the Attester.
Use `node 1-generateMnemonic.js` again to generate one.
Tell the workshop organizer the address of your attester, so that he can transfer some tokens to you.
```javascript
const attester = Kilt.Identity.buildFromMnemonic('[YOUR MNEMONIC]')
```

Select a RequestForAttestation from the exchange and paste it here.
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
```javascript
attestation.store(attester).then(data => {
  console.log(data)
}).then(() => {
  // The AttestedClaim object is the one sent back to the claimer.
  const attestedClaim = new Kilt.AttestedClaim(requestForAttestation, attestation)

  // Let's copy the result and put it back to the exchange
  console.log(JSON.stringify(attestedClaim))
}).catch(e => {
  console.log(e)
}).finally(() => {
  Kilt.BlockchainApiConnection.getCached().then(blockchain => {
    blockchain.api.disconnect()
  })
})
```

