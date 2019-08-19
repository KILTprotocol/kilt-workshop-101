# 💬 Claim

Let's now create a claim.  
But a claim in itself has no value: it needs to be **attested** by a trusted entity in order to become valid in the eyes of verifiers.  

Let's illustrate this with the driving license example:   
+++ explain permisionless

<!-- and a *RequestForAttestaion* object, which we will share with the other participants, so that they can attest it. -->
  
## Create an identity
It is best to use the same mnemonic for the same role, so that the generated objects are still valid on a re-run.
Just run `node generateMnemonic.js` and copy the mnemonic into `[YOUR MNEMONIC]`.
```javascript
const mnemonic = "[YOUR MNEMONIC]"
const claimer = Kilt.Identity.buildFromMnemonic(mnemonic)
```

## Create a claim
We'll create a claim using the provided ctype and the claimer identity. 

Create a new file `2-claim.js`. 

```javascript 
const Kilt = require('@kiltprotocol/sdk-js')
// import the claim type we created in a previous step
const ctype = require('./ctype.json')

const rawClaim = {
  name: 'Alice',
  age: 29,
}

const claim = new Kilt.Claim(ctype, rawClaim, claimer)
```

## Create the `RequestForAttestation` object  

Now that we've created a Claim, we'd like it to be attested by a trusted entity.  
To do so, we'll use the KILT SDK to build a `RequestForAttestation` object and send it to an attester. 

<!-- which will be send to a potential attester -->

```javascript
// RequestForAttestation needs 3 arguments: a claim, a legitimation (only useful for trust hierarchies, but for this
// tutorial we stick to a simple case), and a claimer
const requestForAttestation = new Kilt.RequestForAttestation(claim, [], claimer)
```

<!-- We will just log it out, to copy/paste it and send it to a fellow participant. -->

```javascript
console.log(JSON.stringify(requestForAttestation))
```

Execute the file with
```bash
node 2-claim.js
```

> Since the KILT-SDK relies on a 1:1 messaging system, we have to exchange our requests without it.
> Just log out your RequestForAttestation object and paste it in the exchange (https://hackmd.io/c6OBNgWWR8yWJhMj7WICUA?edit).  
> You can also send it via mail or another messaging system to a fellow participant.
