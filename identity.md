# 👤 Identity

Let's create the <span class="label-role claimer">claimer</span> identity and the <span class="label-role attester">attester</span> identity. You'll see that the <span class="label-role verifier">verifier</span> identity won't be needed.

In KILT, an identity is an object that represents an entity - for example a person, an organization or even a machine.

An identity contains multiple properties.  
One of them is the `address` : it's the entity's unique and public identifier.

> 💡 A KILT identity is a set of cryptographic elements:
> 
> * A signing keypair, used to sign claims;
> * The address, which is generated from the signing public key;
> * An encryption keypair, used to encrypt messages between participants of the system;

All we need to create an identity is a mnemonic.

> 💡 In cryptography, a mnemonic is a random series of words. For example, `gold upset segment cake universe` is a mnemonic. It's used to generate keypairs. What's great about a mnemonic is that it's **human-readable**. A person can memorize it, and use it later to re-generate their keypairs and address.

## Code

To generate an identity, two methods from the KILT SDK are needed:

* `generateMnemonic`
* `buildFromMnemonic` // takes a mnemonic as an input, and outputs an `Identity` instance.  

Create a new file `1-generateMnemonic.js`.

Open it and paste the following code:

```javascript
// import the KILT SDK
const Kilt = require('@kiltprotocol/sdk-js')

const mnemonic = Kilt.Identity.generateMnemonic()
console.log('mnemonic:', mnemonic)

const identity = Kilt.Identity.buildFromMnemonic(mnemonic)
console.log('address:', identity.address)
```

You're now ready to generate an Identity.

## Run

To generate an identity, run this command in your terminal, still within your `kilt-rocks` directory:

```bash
node 1-generateMnemonic.js
```

Your output should look like this (but it won't be identical since the mnemonic is randomly generated):

```bash
mnemonic: gold upset segment cake universe carry demand comfort dawn invite element capital
address: 5CUoo2vAegeaZHPNdxZyuMesR3RWYBKHj4jfVyj4FXzpXPuR
```

You want to run this command twice, in order to generate 2 identities: the <span class="label-role attester">attester</span>'s and the <span class="label-role claimer">claimer</span>'s.

Copy and paste the two mnemonics and addresses somewhere, you'll need them soon.  

In the next steps, we'll refer to the so-generated identities as follows:

* `<CLAIMER'S MNEMONIC>` is the mnemonic you've generated on the first run of the command above, and `<CLAIMER'S ADDRESS>` the associated address;
* `<ATTESTER'S MNEMONIC>` is the mnemonic you've generated on the second run of the command above, and `<ATTESTER'S ADDRESS>` the associated address.

That's it - You've successfully generated two new identities and their address!  

