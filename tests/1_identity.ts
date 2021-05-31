/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-console */
import * as Kilt from '@kiltprotocol/sdk-js'

/* 🚧 COPY_START for 1️⃣ identity_example (below this comment) 🚧 */
// import the KILT SDK
// const Kilt = require('@kiltprotocol/sdk-js') //❗️ UNCOMMENT-LINE in workshop ❗️

// wrap call inside async function
async function main() {
  await Kilt.init()
  const mnemonic = Kilt.Identity.generateMnemonic()
  console.log('mnemonic:', mnemonic)

  const identity = await Kilt.Identity.buildFromMnemonic(mnemonic)
  console.log('address:', identity.address)
}

// execute calls
main()
/* 🚧 COPY_END for 1️⃣ identity_example (below this comment) 🚧 */

/* 🚧 COPY_START for 2️⃣ identities_example (below this comment) 🚧 */
// import the KILT SDK
// const Kilt = require("@kiltprotocol/sdk-js");

// wrap call inside async function
async function identities() {
  await Kilt.init()
  const claimerMnemonic = Kilt.Identity.generateMnemonic()
  console.log('claimer mnemonic:', claimerMnemonic)
  const claimer = await Kilt.Identity.buildFromMnemonic(claimerMnemonic)
  console.log('claimer address:', claimer.address)

  const attesterMnemonic = Kilt.Identity.generateMnemonic()
  console.log('attester mnemonic:', attesterMnemonic)
  const attester = await Kilt.Identity.buildFromMnemonic(attesterMnemonic)
  console.log('attester address:', attester.address)
}

// execute calls
identities()
/* 🚧 COPY_END 2️⃣ for identities_example (below this comment) 🚧 */
