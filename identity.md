Before a user can make a Claim, two things are needed:  
* 👤 an Identity, so that the Claim can be associated with this user
* 💠 a Claim Type (CTYPE for short), to create the Claim with based on a specific structure.   

Let's start with the Identity.  

# 👤 Identity

To build an Identity, you first have to generate a mnemonic for it.

Open a file `1-generateMnemonic.js` and copy/paste following code:
```javascript
const Kilt = require('@kiltprotocol/sdk-js')

const mnemonic = Kilt.Identity.generateMnemonic()
console.log('mnemonic:', mnemonic)

const identity = Kilt.Identity.buildFromMnemonic(mnemonic)
console.log('address:', identity.address)
```

You can generate Identities by executing it with
```bash
node 1-generateMnemonic.js
```

Example output:
```bash
mnemonic: gold upset segment cake universe carry demand comfort dawn invite element capital
address: 5CUoo2vAegeaZHPNdxZyuMesR3RWYBKHj4jfVyj4FXzpXPuR
```

You will need this output in the next sections.
