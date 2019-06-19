# Verification

Open up a new file `4-verification.js`

The following imports will be necessary for this section:
```javascript
const Kilt = require('@kiltprotocol/sdk-js')
```

Convert AttestedClaim as JSON to Kilt.AttestedClaim object
```javascript
const attestedClaimAsJson = '[ATTESTEDCLAIM JSON OBJECT]'
const attestedClaimObj = JSON.parse(attestedClaimAsJson)
const attestedClaim = Kilt.AttestedClaim.fromObject(attestedClaimObj)
```

Verify data against ctype
```javascript
const isDataVerified = attestedClaim.verifyData()
console.log('isDataVerified', isDataVerified)
```

Connect to the blockchain.
```javascript
Kilt.default.connect('wss://full-nodes.kilt.io')
```

Verify, that the included attestation is on-chain.
```javascript
attestedClaim.verify().then(data => {
  console.log('isVerified', data)
})
```


