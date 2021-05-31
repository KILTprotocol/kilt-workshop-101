## fixes KILTProtocol/ticket#312
Please include a summary of the changes provided with this pull request and which issue has been fixed.
Please also provide some context if necessary.

## How to test:

```
cd tests
yarn ts-node 1_identity.ts
yarn ts-node 2_ctypeFromSchema.ts
yarn ts-node 3_claim.ts
yarn ts-node 4_attestation.ts
yarn ts-node 5_verification.ts
yarn ts-node 6_verification-with-nonce.ts
```

## Checklist:

- [ ] The tests and the guide inside the MD are in sync
- [ ] I have verified that the code works
- [ ] I have verified that the code is easy to understand
- [ ] I have [left the code in a better state](https://deviq.com/principles/boy-scout-rule)
