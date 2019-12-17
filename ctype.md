# 💠 CTYPE

Before the <span class="label-role claimer">claimer</span> can make a claim about themselves, they first need a claim type (CTYPE for short).

A claim type (CTYPE for short) is a KILT-specific term, but the concept is simple.  
A CTYPE defines the structure of a claim. You can think of it as the data model for your claim.

For example, a very basic CTYPE for a driver's license could look like this:

```json
{
  "schema": {
    "$id": "KILT_DRIVERS_LICENSE",
    "$schema": "http://kilt-protocol.org/draft-01/ctype#",
    "properties": {
      "name": {
        "type": "string"
      },
      "canDrive": {
        "type": "boolean"
      }
    },
    "type": "object"
  },
  "owner": "8UPfLqrqbKoKyi61YErwUrWEa1PWxikEojV7PCnLJgxrWd6W",
  "hash": "0x081955a2b7990554f6193a9e770ea625c68d2bfc5a1ff996e6e28d2a620fae16"
}
```

> 💡 JSON Schema  
> CTYPES are based on JSON Schema, a standard used to annotate and validate JSON documents. We don't need to dive into it in this tutorial, for now we can think of CTYPE as JSON objects.

Let's have a look at what these attributes are.

| Key                     | Value                                                                                                                 |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `schema` > `$id`        | The name of this CTYPE                                                                                                |
| `schema` > `properties` | The properties that a claim of type `KILT_DRIVERS_LICENSE` should have                                                |
| `owner`                 | The public address of the user who created this CTYPE                                                                 |
| `hash`                  | Most important attribute, the hash is the CTYPE's digital footprint. It's generated from the content of the `schema`. |

A CTYPE is stored on the KILT blockchain - more exactly, the CTYPE's hash is stored on the KILT blockchain.

In a real-life case:  
A user would simply retrieve an existing CTYPE from a repository of CTYPES, for example via a REST API.

In this tutorial:  
To keep it simple, we'll just use a CTYPE that we already know exists on our blockchain.

## Code

Create a new file `ctype.json`.

Open it and paste the following:

```json
{
  "schema": {
    "$id": "KILT_WORKSHOP_ATTENDED",
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
  "owner": "5HXfLqrqbKoKyi61YErwUrWEa1PWxikEojV7PCnLJgxrWd6W",
  "hash": "0x981955a2b7990554f6193a9e770ea625c68d2bfc5a1ff996e6e28d2a620fae16"
}
```

Now this CTYPE is available to us.

Identities and a CTYPE: we've got all we need to create a claim, so let's move on!
