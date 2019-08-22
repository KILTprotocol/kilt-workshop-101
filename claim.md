# 💬 Claim

Now, you'll play the role of a <span class="label-actor-type claimer">claimer</span>:  
* You'll make a claim about yourself; 

> 💡 KILT is permissionless.   
> Anyone/anything can make a claim about themselves.

* You'll request an attestation of your claim. You need to, because a claim in itself has no value. To become valid in the eyes of <span class="label-actor-type verifier">verifiers</span>, it needs to be attested by a trusted entity.

Then an <span class="label-actor-type attester">attester</span> will pick up your request and hopefully attest your claim. We'll look into this in the next steps, for now let's just focus on our claim.   

<!-- and a *RequestForAttestaion* object, which we will share with the other participants, so that they can attest it. -->
  
## Create your identity as a claimer
It is best to use the same mnemonic for the same role, so that the generated objects are still valid on a re-run.
Run `node generateMnemonic.js` and copy the mnemonic.   
In the following, we'll refer to this mnemonic as your `[claimer mnemonic]`.

<span class="label-actor-type attester">attester</span>
<span class="label-actor-type verifier">verifier</span>

## Create a claim
We'll create a claim using the provided ctype and the claimer identity. 

Create a new file `2-claim.js`. 

```javascript 
const Kilt = require('@kiltprotocol/sdk-js');
// import the claim type file we've created previously
const ctype = require('./ctype.json');

const mnemonic = "[claimer mnemonic]"
const claimer = Kilt.Identity.buildFromMnemonic(mnemonic);

const rawClaim = {
  name: 'Alice',
  age: 29,
};

const claim = new Kilt.Claim(ctype, rawClaim, claimer);
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
