# How to update code examples in KILT workshop

Please see [here](https://github.com/KILTprotocol/organizational/wiki/How-to-update-code-example-in-the-KILT-workshop#2-apply-changes-from-workshop-to-sdk). To be aware of breaking changes to the workshop code snippets, we execute each snippet in the SDK CI pipeline `test_workshop`.

- [Apply changes from SDK to workshop](#1-apply-changes-from-sdk-to-workshop)
- [Apply changes from workshop to SDK](#2-apply-changes-from-workshop-to-sdk)

## Design

Unlike our regular CI tests, **these snippets are not executed as Jest tests but rather should just be executable without throwing an error**.
Whereas executing them in a Jest environment yielded better testing, it would make the transition from a test to a workshop snippet more error-prone.

Therefore, all **snippets are designed in a way which makes this transition as simple as possible** while cutting back on clean code.
In an optimal case you can just copy and paste a snippet from the SDK workshop test to the corresponding workshop markdown place.
Due to the "interactive" design of the workshop, which involves copy-pasting state from previous steps (e.g. `mnemonics`, `claim`, `requestForAttestation`, etc.), you usually have to remove or change some lines from the SDK snippet.
Vise versa, you cannot execute the workshop snippets directly in most cases.
There are four "helpers" to not make the transition error-prone.

### Workshop markdown (1 helper)

Above each workshop code snippet, there is a markdown comment telling you where to copy-paste the corresponding snippet from. If you have to change lines, there will also be another comment as a reminder.

#### Workshop comment example

```markdown
[comment]: <copy and paste 1️⃣ requestForAttestation_example from 4_attestation.ts>
[comment]: <IMPORTANT! Respect the UNCOMMENT-LINE and REMOVE-LINE comments>
```

### SDK snippet (3 helpers)

The following helpers don't need any explanation. They tell you what to copy-paste and what modifications you have to do when adding them to the workshop.

#### 1. Start and end

```javascript
  /* 🚧 2️⃣ COPY_START for attestationVerify_example (below this comment) 🚧  */
    ...
  /* 🚧 2️⃣ COPY_END for attestationVerify_example (above this comment) 🚧  */
```

#### 2. Remove lines

```javascript
const { requestForAttestationStruct } = await setupWithoutChain() // ❗️ REMOVE-LINE in workshop ❗️
```

#### 3. Uncomment lines

```javascript
// const attester = await Kilt.Identity.buildFromMnemonic("<attesterMnemonic>"); //❗️ UNCOMMENT-LINE in workshop ❗️
```

## What to do, when you change code in the SDK or the workshop

There are two events when you would update the code examples in the KILT workshop which both imply complement actions on what to update in the SDK and the workshop.

1. The `test_workshop` CI tests in the SDK broke.
2. The workshop receives an update.

### 1. Apply changes from SDK to workshop

Each fix of any workshop CI test inside [src/**integrationtests**/workshop](https://github.com/KILTprotocol/sdk-js/tree/develop/src/__integrationtests__/workshop) requires you to also apply this change to the workshop.

#### Checklist SDK to workshop

- [ ] Try to keep the SDK test as close to the workshop as possible.
- [ ] Set a start and end, see [here](#1-start-and-end)
- [ ] For all lines which should not be part of the workshop snippet: Add the comment `❗️ REMOVE-LINE in workshop ❗️` to the right. See [here](#2-remove-lines)
- [ ] For all lines which should be part of the workshop snippet, but not executed in the SDK test: Comment out the line and add the comment `❗️ UNCOMMENT-LINE in workshop ❗️` to the right. See [here](#3-uncomment-lines).

### 2. Apply changes from workshop to SDK

Vice versa, whenever you update the workshop, please also update the SDK test snippets.

#### Checklist workshop to SDK

- [ ] For each workshop snippet, you should state which SDK example to pull the code from. See [here](#workshop-comment-example).
- [ ] In case you have multiple snippets in both the same markdown file as well as the corresponding TypeScript file, please number them (optimally with 1️⃣ 2️⃣ 3️⃣ 4️⃣ 5️⃣ 6️⃣ 7️⃣ etc.)
