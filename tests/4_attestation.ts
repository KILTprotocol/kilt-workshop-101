/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-console */
import * as Kilt from '@kiltprotocol/sdk-js'

import setup from './setup'

/* 🚧 1️⃣ COPY_START for requestForAttestation_example (below this comment) 🚧  */
// const Kilt = require('@kiltprotocol/sdk-js') //❗️ UNCOMMENT-LINE in workshop ❗️

// function main() { //❗️ UNCOMMENT-LINE in workshop ❗️
// ❗️ REMOVE-LINE BELOW in workshop ❗️
function main(requestForAttestationStruct: Kilt.RequestForAttestation) {
  // use the attester mnemonic you've generated in the Identity step
  // const attester = await Kilt.Identity.buildFromMnemonic("<attesterMnemonic>"); //❗️ UNCOMMENT-LINE in workshop ❗️

  // const requestForAttestationStruct = JSON.parse("<requestForAttestationJSONString>"); //❗️ UNCOMMENT-LINE in workshop ❗️
  // @ts-ignore // ❗️ REMOVE-LINE in workshop ❗️
  const requestForAttestation = Kilt.RequestForAttestation.fromRequest(
    requestForAttestationStruct
  )
}

// execute calls
// main() // ❗️ UNCOMMENT-LINE in workshop ❗️
/* 🚧 1️⃣ COPY_END for requestForAttestation_example (above this comment) 🚧  */

async function attestationVerify(
  requestForAttestation: Kilt.RequestForAttestation
) {
  /* 🚧 2️⃣ COPY_START for attestationVerify_example (below this comment) 🚧  */
  const isDataValid = requestForAttestation.verifyData()
  const isSignatureValid = requestForAttestation.verifySignature()
  console.log('isDataValid: ', isDataValid)
  console.log('isSignatureValid: ', isSignatureValid)
  /* 🚧 2️⃣ COPY_END for attestationVerify_example (above this comment) 🚧  */
}

async function attestClaim(
  attester: Kilt.Identity,
  requestForAttestation: Kilt.RequestForAttestation
) {
  /* 🚧 3️⃣ COPY_START for attestClaim_example (below this comment) 🚧  */

  // build the attestation object
  const attestation = Kilt.Attestation.fromRequestAndPublicIdentity(
    requestForAttestation,
    attester.getPublicIdentity()
  )

  console.log(
    'Successfully connected to KILT testnet, storing attestation next...'
  )
  // store the attestation on chain

  const tx = await attestation.store()
  await Kilt.BlockchainUtils.signAndSubmitTx(tx, attester, {
    resolveOn: Kilt.BlockchainUtils.IS_IN_BLOCK,
  })
  console.log('Attestation saved on chain.')

  // the attestation was successfully stored on the chain, so you can now create the AttestedClaim object
  const attestedClaim = Kilt.AttestedClaim.fromRequestAndAttestation(
    requestForAttestation,
    attestation
  )
  // log the attestedClaim so you can copy/send it back to the claimer
  console.log('attestedClaimJSONString:\n', JSON.stringify(attestedClaim))

  // disconnect from the chain
  await Kilt.disconnect()
  console.log('Disconnected from KILT testnet')
  /* 🚧 3️⃣  COPY_END for attestClaim_example (above this comment) 🚧  */
}

async function execution() {
  const { attester, requestForAttestation, requestForAttestationStruct } =
    await setup()
  await attestationVerify(requestForAttestation)
  await attestClaim(attester, requestForAttestation)
}

execution()
