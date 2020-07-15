# How to update code examples in KILT workshop

Please see [here](https://github.com/KILTprotocol/organizational/wiki/How-to-update-code-example-in-the-KILT-workshop). To be aware of breaking changes to the workshop code snippets, we execute each snippet in the workshop CI pipeline `integration_test`.

- [Apply changes from CI tests to workshop](#1-apply-changes-from-ci-tests-to-workshop)
- [Apply changes from workshop to CI tests](#2-apply-changes-from-workshop-to-ci-tests)

## Design

For each code snippet inside in the workshop, which we will refer to as **workshop-snippet** there exists a corresponding one in the respective Typescript file inside `test` referred to as **test-snippet**.

Unlike our regular CI tests, **the test-snippets are not executed as Jest tests but rather should just be executable without throwing an error**.
Whereas executing them in a Jest environment yielded better testing, it would make the transition from a test to a workshop snippet more error-prone.

Therefore, all **test-snippets are designed in a way which makes this transition to as workshop-snippet as simple as possible** while cutting back on clean code.
In an optimal case you can just copy and paste a test-snippet file to the corresponding workshop markdown place.
Due to the "interactive" design of the workshop, which involves copy-pasting state from previous steps (e.g. `mnemonics`, `claim`, `requestForAttestation`, etc.), you usually have to remove or change some lines from the test-snippet.
Vise versa, you cannot execute the workshop-snippets directly in most cases.
As a result, there are four "helpers" to reduce the likelihood of errors when transitioning from a test-snippet to the workshop one.

### Workshop markdown (1 helper)

Above each workshop code snippet, there is a markdown comment telling you where to copy-paste the corresponding snippet from. If you have to change lines, there will also be another comment as a reminder.

#### Workshop comment example

```markdown
[comment]: <copy and paste 1️⃣ requestForAttestation_example from 4_attestation.ts>
[comment]: <IMPORTANT! Respect the UNCOMMENT-LINE and REMOVE-LINE comments>
```

### test-snippet (3 helpers)

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

## What to do, when you change code in the workshop or tests

There are two events when you would update the code examples in the KILT workshop which both imply complement actions on what to update in the tests and the workshop itself.

1. The `integration_test` CI tests in the workshop broke.
2. The workshop receives an update.

### 1. Apply changes from CI tests to workshop

Each fix of any workshop CI test inside the test directory requires you to also apply this change to the workshop.

#### Checklist CI tests to workshop

- [ ] Try to keep the test-snippet as close to the workshop as possible.
- [ ] Set a start and end, see [here](#1-start-and-end)
- [ ] For all lines which should not be part of the workshop snippet: Add the comment `❗️ REMOVE-LINE in workshop ❗️` to the right. See [here](#2-remove-lines)
- [ ] For all lines which should be part of the workshop snippet, but not executed in the CI test: Comment out the line and add the comment `❗️ UNCOMMENT-LINE in workshop ❗️` to the right. See [here](#3-uncomment-lines).

### 2. Apply changes from workshop to CI tests

Vice versa, whenever you update the workshop, please also update the test.snippets.

#### Checklist workshop to CI tests

- [ ] For each workshop-snippet, you should state which test example to pull the code from. See [here](#workshop-comment-example).
- [ ] In case you have multiple snippets in both the same markdown file as well as the corresponding TypeScript file, please number them (optimally with 1️⃣ 2️⃣ 3️⃣ 4️⃣ 5️⃣ 6️⃣ 7️⃣ etc.)
