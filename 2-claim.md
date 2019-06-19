# Claim

In this section we will create a *Claim* and a *RequestForAttestaion* object, which we will share with the other participants, so that they can attest it.

## Preparation
Open up a new file `2-claim.js`.
All the following code needs to go into this file.

## Imports
The following imports will be necessary for this section:
```javascript
const Kilt = require('@kiltprotocol/sdk-js')
const ctype = require('./ctype.json')
```
  
## Create an identity
It is best to use the same mnemonic for the same role, so that the generated objects are still valid on a re-run.
Just run `node generateMnemonic.js` and copy the mnemonic into `[YOUR MNEMONIC]`.
```javascript
const mnemonic = "[YOUR MNEMONIC]"
const claimer = Kilt.Identity.buildFromMnemonic(mnemonic)
```

## Create a claim
We create a claim based on the provided ctype and using the claimer identity.

```javascript
const rawClaim = {
  name: 'Alice',
  age: 29,
}

const claim = new Kilt.Claim(ctype, rawClaim, claimer)
```

## Create the RequestForAttestation object 
Here we will build the RequestForAttestation object, which will be send to a potential attester

```javascript
const requestForAttestation = new Kilt.RequestForAttestation(claim, [], claimer)
```

> Since the KILT-SDK relies on a 1:1 messaging system, we have to exchange our requests without it.
> Just log out your RequestForAttestation object and paste it in the exchange interface.

```javascript
console.log(JSON.stringify(requestForAttestation))
```

Execute the file with
```bash
node 2-claim.js
```
