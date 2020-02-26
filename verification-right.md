# ✅ Verification: the right way

Did you notice anything wrong with our verification in the previous step?

Nothing? Let's see:

* You've checked that the `attestedClaim` data is valid and you've verified that the corresponding attestation is on chain and not revoked. All good.

* But: are you sure that the entity/person that sent you the `attestedClaim` owns it?
What if a malicious actor stole this `attestedClaim` and is now presenting it to you as theirs? We'll see how to mitigate this.

## Understand credential theft mitigation

To mitigate credential theft, a <span class="label-role verifier">verifier</span> can initiate a **cryptographic challenge** with a <span class="label-role claimer">claimer</span>.

The underlying idea is simple: to prove their identity, the <span class="label-role claimer">claimer</span> signs **on-the-fly** - that's important - a piece of data under the same identity as the identity associated with their `attestedClaim`. By checking this signature's validity, the <span class="label-role verifier">verifier</span> makes sure that the `attestedClaim` is owned by the person who just sent it.

What piece of data should be signed? It doesn't really matter; it can be an arbitrary number picked by the <span class="label-role verifier">verifier</span>. What matters is that this number should be used only once. Otherwise, the cryptographic challenge is worthless.

> 💡 In a cryptographic communication, an arbitrary number that can be used just once is called a **nonce**.

Here's how it works:

1. The <span class="label-role verifier">verifier</span> sends a nonce to the <span class="label-role claimer">claimer</span>.
2. The <span class="label-role claimer">claimer</span> sends back this nonce signed with their **private** key, together with their `attestedClaim`.
3. The <span class="label-role verifier">verifier</span> checks the following:
   * Does the signature on the nonce match the public key contained in the `attestedClaim`? If so: the entity/person who just sent the `attestedClaim` plus the signed nonce is also the owner of this `attestedClaim`. If not: the `attestedClaim` might be stolen.
   * Is the data valid? Is the attestation on-chain and not revoked? See the simple [Verification](verification).

OK, let's see this in action.

## As the <span class="label-role verifier">verifier</span>: create a nonce

To generate a random, unique piece of data, we'll use a package called [uuid].
A UUID is **random and unique**, which are the most important properties of a **nonce**.

(A UUID is not *strictly* a nonce, because it's not a number, but here we'll refer to it as nonce).

Install it:

```bash
# with yarn
yarn add uuid
# or with npm
npm install uuid
```

Create a new file `nonce.js`, and paste the following code into it:

```javascript
const uuid = require('uuid')

const nonce = uuid.v4()
console.log('nonce: ', nonce)
```

Run the code by running this command in your terminal, still within your `kilt-rocks` directory:

```bash
node nonce.js
```

You should see in your logs the `uuid`, that will be used as a nonce; it should look like something like this: `9dbbad48-aad0-4280-aeca-4c4072c82625`.

Copy it, you'll need it in the next step.

## As the <span class="label-role claimer">claimer</span>: sign the nonce and prepare the data

Let's put together the data you would send back to the <span class="label-role verifier">verifier</span>, as the <span class="label-role claimer">claimer</span>.

Create a new file `claim-with-signed-nonce.js`.

Paste the following code into it (make sure to replace `<nonce>` and `<attestedClaimJSON>` with the data you copied earlier):

```javascript
const Kilt = require('@kiltprotocol/sdk-js')

// <nonce> = nonce received from the verifier = uuid you copied from above
const nonce = <nonce>

// <claimerMnemonic> = claimer mnemonic generated in the Identity step
const claimer = Kilt.Identity.buildFromMnemonic('<claimerMnemonic>')
// sign the nonce as the claimer with your private identity
const signedNonce = claimer.signStr(nonce)

// same data as in to the simple "Verification" step
const attestedClaimStruct = JSON.parse(JSON.stringify(<attestedClaimJSON>));

const dataToVerify = {
  signedNonce,
  attestedClaimStruct
}

console.log('dataToVerifyJSON: ', JSON.stringify(dataToVerify))
```

Run the code by running this command in your terminal, still within your `kilt-rocks` directory:

```bash
node claim-with-signed-nonce.js
```

You should see in your logs the `dataToVerify`.

Copy it, you'll need it in the next step.

## As the <span class="label-role verifier">verifier</span>: verify the `signedNonce` and `attestedClaim`

Create a new file `verification-with-nonce.js`.

Paste the following code into it (make sure to replace `<dataToVerify>` and `<nonce>` with the relevant objects):

```javascript
const Kilt = require('@kiltprotocol/sdk-js')

const { signedNonce, attestedClaimStruct } = JSON.parse(<dataToVerifyJSON>)

// verify the signed nonce (<nonce> is the uuid you've generated as the verifier)
const isSenderOwner = Kilt.Crypto.verify(<nonce>, signedNonce, attestedClaimStruct.request.claim.owner)
console.log('isSenderOwner: ', isSenderOwner)

// proceed with verifying the attestedClaim itself
// --> see simple "Verification" step in this tutorial
```

Run the code by running this command in your terminal, still within your `kilt-rocks` directory:

```bash
node verification-with-nonce.js
```

You should see in your logs that `isSenderOwner` is `true`: this `attestedClaim` is not stolen.

Looking good!

You can also see what would happen when a malicious actor presents a stolen `attestedClaim` to a <span class="label-role verifier">verifier</span>. Try this out:

* Create another identity, let's refer to it as Mallory (= malicious);
* Sign the nonce above with Mallory's identity, hence creating a new `signedNonce`;
* Create a new `invalidDataToVerify` object with this new `signedNonce` and with Alice's `attestedClaim` we've been using so far;
* As a <span class="label-role verifier">verifier</span>, verify the `signedNonce` in `invalidDataToVerify` via `Crypto.verify`;
* You'll this that this verification will return `false`: the <span class="label-role verifier">verifier</span> will know that this credential is not owned by Mallory.

[uuid]: https://www.npmjs.com/package/uuid