Before a user can make a claim, two things are needed:  
* 👤 an identity, so that the claim can be associated with this user
* 💠 a claim type (CTYPE for short), to create the claim based on a specific structure.   

Let's start with the identity.   

---

# 👤 Identity

What's an identity in KILT?   

An identity is an object representing an entity, for example a person, an organization or even a machine.   

An identity contains multiple properties.  
One of them is the `address` : it's the entity's unique and public identifier.     

> 💡 Asymmetric cryptography  
> A KILT identity contains:
> * An encryption keypair (x25519-xsalsa20-poly1305) used to encrypting messages between participants of the system;   
> * A signing keypair (ed25519, will be replaced with sr25519);
> * The address, which is generated from the signing public key using the ss58 algorithm. 

All we need to create an identity is a mnemonic.   

> 💡 Mnemonics   
> In cryptography, a mnemonic is a random series of words. `gold upset segment cake universe` is a mnemonic. It's used to generate a public address (via a key). What's great about a mnemonic is that it's human-readable, so a person can simply remember it to generate their keypairs and address again later. 

## Code 

To generate an identity, we'll use two methods from the KILT SDK. 
* `generateMnemonic` // generates a mnemonic. 
* `buildFromMnemonic` // takes a mnemonic as an input, and outputs an `Identity` instance.  

Create a new file and name it `1-generateMnemonic.js`.

Open it and copy/paste the following code: 

```javascript
// import Kilt SDK
const Kilt = require('@kiltprotocol/sdk-js');

const mnemonic = Kilt.Identity.generateMnemonic();
console.log('mnemonic:', mnemonic);

const identity = Kilt.Identity.buildFromMnemonic(mnemonic);
console.log('address:', identity.address);
```

You're now ready to generate an Identity.  

To do so, run this command in your terminal, still within your `kilt-rocks` directory:  
```bash
node 1-generateMnemonic.js
``` 

Your output should look like this (but not be identical to it, since the mnemonic is randomly generated):
```bash
mnemonic: gold upset segment cake universe carry demand comfort dawn invite element capital
address: 5CUoo2vAegeaZHPNdxZyuMesR3RWYBKHj4jfVyj4FXzpXPuR
```   

That's it - You've successfully generated a new identity and its address!  

Make sure to copy this output, since we'll need it in the Claim section.  

