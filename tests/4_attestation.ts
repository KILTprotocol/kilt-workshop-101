/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-console */
import * as Kilt from '@kiltprotocol/sdk-js'

import setup from './setup'

/* 🚧 1️⃣ COPY_START for requestForAttestation_example (below this comment) 🚧  */
// const Kilt = require('@kiltprotocol/sdk-js') //❗️ UNCOMMENT-LINE in workshop ❗️

// async function main() { //❗️ UNCOMMENT-LINE in workshop ❗️
// ❗️ REMOVE-LINE BELOW in workshop ❗️
async function main(requestForAttestationStruct: Kilt.RequestForAttestation) {
  // use the attester mnemonic you've generated in the Identity step
  // const attester = await Kilt.Identity.buildFromMnemonic("<attesterMnemonic>"); //❗️ UNCOMMENT-LINE in workshop ❗️

  // const requestForAttestationStruct = JSON.parse("<requestForAttestationJSONString>"); //❗️ UNCOMMENT-LINE in workshop ❗️
  // @ts-ignore // ❗️ REMOVE-LINE in workshop ❗️
  await Kilt.init()
  
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
  await Kilt.init()
  
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
  await Kilt.init()
  
  // build the attestation object
  const attestation = Kilt.Attestation.fromRequestAndPublicIdentity(
    requestForAttestation,
    attester.getPublicIdentity()
  )

  // connect to the chain (this is one KILT testnet node)
  await Kilt.init({ address: 'wss://full-nodes.kilt.io:9944' })
  await Kilt.connect()
  console.log(
    'Successfully connected to KILT testnet, storing attestation next...'
  )

  // store the attestation on chain
  await attestation.store().then(async (tx) => {
    await Kilt.BlockchainUtils.submitSignedTx(tx, {
      resolveOn: Kilt.BlockchainUtils.IS_IN_BLOCK,
    })
    console.log('Attestation saved on chain.')
  })
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
  await main(requestForAttestationStruct)
  await attestationVerify(requestForAttestation)
  await attestClaim(attester, requestForAttestation)
}

execution()
