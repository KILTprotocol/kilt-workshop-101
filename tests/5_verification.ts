/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as Kilt from '@kiltprotocol/sdk-js'
import setup from './setup'

/* 🚧 COPY_START for verifyClaim_example (below this comment) 🚧  */
// const Kilt = require('@kiltprotocol/sdk-js') //❗️ UNCOMMENT-LINE in workshop ❗️

async function main() {
  // create an attested claim from the JSON string
  const attestedClaimStruct = (await setup()).attestedClaim // ❗️ REMOVE-LINE in workshop ❗️
  // const attestedClaimStruct = JSON.parse('<attestedClaimJSONString>') //❗️ UNCOMMENT-LINE in workshop ❗️
  const attestedClaim =
    Kilt.AttestedClaim.fromAttestedClaim(attestedClaimStruct)

  await Kilt.init({ address: 'wss://full-nodes.kilt.io:9944' })
  await Kilt.connect()
  console.log(
    'Successfully connected to KILT testnet, verifying attested claim next...'
  )

  // The `verify()` method does two things:
  // 1. verifies that the data is valid for the given CTYPE
  // 2. verifies that the attestation hash is present on the Kilt blockchain and that the attestation has not been revoked
  const isValid = await attestedClaim.verify()
  console.log('Is the attested claim valid?', isValid)

  // disconnect from the chain
  await Kilt.disconnect()
  console.log('Disconnected from KILT testnet')
}

// execute calls
main()
/* 🚧 COPY_END for verifyClaim_example (above this comment) 🚧  */
