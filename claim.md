# 💬 Claim

In this section, you'll play the role of a <span class="label-role claimer">claimer</span>:  
* You'll make a claim about yourself;  
* A claim in itself has no value; you'll have to request an attestation of your claim. For a claim to become valid in the eyes of <span class="label-role verifier">verifiers</span>, it needs to be attested by a trusted entity.

Then an <span class="label-role attester">attester</span> will pick up your request and hopefully attest your claim. We'll look into this in the next steps - for now, let's just focus on our claim.    


> 💡 KILT is permissionless.   
> Anyone/anything can make a claim about themselves.

<!-- and a *RequestForAttestaion* object, which we will share with the other participants, so that they can attest it. -->
  
## Get your identity as a claimer  
In the previous Identity step in this tutorial, you've generated two identities.    
You'll need the first mnemonic you've created; it's referred to as `<CLAIMER'S MNEMONIC>` in the code snippet below.   

## Code: create file 

Create a new file `2-claim.js`. 
All the following code needs to go into this file.  

## Code: create a claim
We'll create a claim using the provided ctype and the claimer identity.  
Paste the following in `2-claim.js` (make sure to replace the `<CLAIMER'S MNEMONIC>`).  

```javascript 
const Kilt = require('@kiltprotocol/sdk-js')
// import the claim type file we've created previously
const ctype = require('./ctype.json')

// `<CLAIMER'S MNEMONIC>` is for example "gold upset segment cake universe carry demand comfort dawn invite element capital"
const mnemonic = `<CLAIMER'S MNEMONIC>` 
const claimer = Kilt.Identity.buildFromMnemonic(mnemonic)

const rawClaim = {
  name: 'Alice',
  age: 29,
}

const claim = new Kilt.Claim(ctype, rawClaim, claimer)
```

## Code: create the `RequestForAttestation` object  

We'd like our claim to be attested by a trusted entity.  
To do so, we'll build a `RequestForAttestation` object, and send it to an attester.   

Append the following code to `2-claim.js`:

```javascript
/* RequestForAttestation needs 3 arguments: 
* a claim
* a legitimation (only useful for trust hierarchies, but for this tutorial we stick to a simple case)
* a claimer
*/
const requestForAttestation = new Kilt.RequestForAttestation(claim, [], claimer)

// We will just log it out, to copy/paste it and send it to a fellow participant
console.log(JSON.stringify(requestForAttestation))
``` 

## Run 
Execute the file by running this command in your terminal (still within your `kilt-rocks` directory):
```bash
node 2-claim.js
```  

And this outputs your `RequestForAttestation` object.  
We'll need it in the next step, so make sure to copy/paste it somewhere.   

> The KILT-SDK relies on a 1:1 messaging system. So in this tutorial, we need to "simulate" it by exchanging our requests via other messaging systems: 
> email, chat, or simply by pasting requests for attestations in this shared document for fellow participants: https://hackmd.io/c6OBNgWWR8yWJhMj7WICUA?edit  

Now, you've made a claim as a <span class="label-role claimer">claimer</span> and requested an attestation.  
Let's make this attestation happen!
