# 💠 CTYPE

Before the <span class="label-role claimer">claimer</span> can make a claim about themselves, they first need a claim type (CTYPE for short).

A claim type (CTYPE for short) is a KILT-specific term, but the concept is simple:  
A CTYPE defines the structure of a claim. You can think of it as the data model for your claim.

For example, a very basic CTYPE for a driver's license could look like this:

```json
{
  "schema": {
    "$id": "SimpleLicense",
    "$schema": "http://kilt-protocol.org/draft-01/ctype#",
    "properties": {
      "name": {
        "type": "string"
      },
      "age": {
        "type": "integer"
      }
    },
    "type": "object"
  },
  "owner": "5EkPdXVsoJ8Vm8UTrs7c89ghJpWVZHGN7RGiQFSi6VC6RiX9",
  "hash": "0x16fa158d730aa83f6339497fafa59d895c89c3eae24dc323532f71e235824152"
}
```

> 💡 CTYPEs are based on JSON Schema, a standard used to annotate and validate JSON documents. We don't need to dive into it in this tutorial, for now we can think of CTYPE as JSON objects.

Let's have a look at these attributes.

| Key                     | Value                                                                                                                 |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `schema` > `$id`        | The name of this CTYPE.                                                                                                |
| `schema` > `properties` | The properties that a claim of type `SimpleLicense` should have.                                                |
| `owner`                 | The public address of the user who created this CTYPE.                                                                 |
| `hash`                  | Most important attribute, the hash is the CTYPE's **digital footprint**. |

A CTYPE is stored on the KILT blockchain - more exactly, the CTYPE's hash is stored on the KILT blockchain.
The full CTYPE can be stored in a regular web service.

In a real-life setup, auser would simply retrieve an existing CTYPE from a repository of CTYPEs for example via a REST API.

In this tutorial, to keep it simple we'll use a CTYPE that we already know exists on the KILT blockchain.

## Code

Create a new file `ctype.json`.

Open it and paste the following:

```json
{
  "schema": {
    "$id": "SimpleLicense",
    "$schema": "http://kilt-protocol.org/draft-01/ctype#",
    "properties": {
      "name": {
        "type": "string"
      },
      "age": {
        "type": "integer"
      }
    },
    "type": "object"
  },
  "owner": "5EkPdXVsoJ8Vm8UTrs7c89ghJpWVZHGN7RGiQFSi6VC6RiX9",
  "hash": "0x16fa158d730aa83f6339497fafa59d895c89c3eae24dc323532f71e235824152"
}
```

OK, now you've got all you need to create a claim: an identity and a CTYPE.

Let's move on!
