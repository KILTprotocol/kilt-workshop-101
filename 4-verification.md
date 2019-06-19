# Verification

In this section, we will take an *AttestedClaim* object from the exchange and verify it.

## Preparation
Open up a new file `4-verification.js`.
All the following code needs to go into this file.

## Imports
The following imports will be necessary for this section:
```javascript
const Kilt = require('@kiltprotocol/sdk-js')
```

## Take AttestedClaim object
Choose an *AttestedClaim* object from the exchange and paste it here.
This will convert the JSON object to a Kilt.AttestedClaim object
```javascript
const attestedClaimAsJson = '[ATTESTEDCLAIM JSON OBJECT]'
const attestedClaimObj = JSON.parse(attestedClaimAsJson)
const attestedClaim = Kilt.AttestedClaim.fromObject(attestedClaimObj)
```

## Verify data
You can verify the included data against the included ctype:
```javascript
const isDataVerified = attestedClaim.verifyData()
console.log('isDataVerified', isDataVerified)
```

## Verify on-chain
Before you can verify the *Attestation* in the *AttestedClaim* on-chain, you have to connect to the blockchain.
```javascript
Kilt.default.connect('wss://full-nodes.kilt.io')
```

To verify, that the included attestation is on-chain, you can write following code:
```javascript
attestedClaim.verify().then(data => {
  console.log('isVerified', data)
})
```

Execute the file with
```bash
node 4-verification.js
```
