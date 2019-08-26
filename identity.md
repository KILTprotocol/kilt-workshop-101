In this tutorial, we'll run through the full story of a verifiable credential.  
To do so, three actors will be involved: a <span class="label-role claimer">claimer</span>, an <span class="label-role attester">attester</span> and a <span class="label-role verifier">verifier</span>.   
So we'll need to create three identities.  

We'll come back to what each of these actors represent, but for now let's create their identities.   

# 👤 Identity 

In KILT, an identity is an object representing an entity - for example a person, an organization or even a machine.     

An identity contains multiple properties.  
One of them is the `address` : it's the entity's unique and public identifier.     

> 💡 Asymmetric cryptography  
> If you're interested in the cryptographic details, a KILT identity contains:
> * An encryption keypair (x25519-xsalsa20-poly1305) used to encrypting messages between participants of the system;   
> * A signing keypair (ed25519, will be replaced with sr25519);
> * The address, which is generated from the signing public key using the ss58 algorithm. 

All we need to create an identity is a mnemonic.   

> 💡 Mnemonics   
> In cryptography, a mnemonic is a random series of words. `gold upset segment cake universe` is a mnemonic. It's used to generate a public address (via a key). What's great about a mnemonic is that it's human-readable, so a person can simply remember it to re-generate their keypairs and address later. 

## Code 

To generate an identity, two methods from the KILT SDK are needed: 
* `generateMnemonic`
* `buildFromMnemonic` // takes a mnemonic as an input, and outputs an `Identity` instance.  

Create a new file `1-generateMnemonic.js`.

Open it and paste the following code: 

```javascript
// import KILT SDK
const Kilt = require('@kiltprotocol/sdk-js')

const mnemonic = Kilt.Identity.generateMnemonic()
console.log('mnemonic:', mnemonic)

const identity = Kilt.Identity.buildFromMnemonic(mnemonic)
console.log('address:', identity.address)
```

You're now ready to generate an Identity.    

## Run 

To generate an identity, run this command in your terminal (still within your `kilt-rocks` directory):  
```bash
node 1-generateMnemonic.js
``` 

Your output should look like this (but not be identical to it, since the mnemonic is randomly generated):
```bash
mnemonic: gold upset segment cake universe carry demand comfort dawn invite element capital
address: 5CUoo2vAegeaZHPNdxZyuMesR3RWYBKHj4jfVyj4FXzpXPuR
```     

You want to run this command three times, in order to generate three identities.   
Each time, copy/paste the output (mnemonic and address) somewhere since we'll need these identities later.  

In the next steps, we'll refer to the so-generated identities as follows:  
* `[CLAIMER'S MNEMONIC]` is the mnemonic you've generated on the first run of the command above, and `[CLAIMER'S ADDRESS]` the associated address;  
* `[ATTESTER'S MNEMONIC]` is the mnemonic you've generated on the second run of the command above, and `[ATTESTER'S ADDRESS]` the associated address;      
* `[VERIFIER'S MNEMONIC]` is the mnemonic you've generated on the second run of the command above, and `[VERIFIER'S ADDRESS]` the associated address.

That's it - You've successfully generated three new identities and their address!  

