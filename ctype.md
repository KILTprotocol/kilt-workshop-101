Before a user can make a Claim, two things are needed:  
* 👤 an Identity // so that the Claim can be associated with this user
* 💠 a Claim Type (CTYPE for short) // to create the Claim with a given structure.   

# 💠 CTYPE 

CTYPE is a KILT-specific term, but the concept is simple: a CTYPE defines what the structure of a Claim must be.  
You can think of it as the data model for your Claim.  
For example, a very basic CTYPE for a Driver's License could look like this: 

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
  ...
}

```

> 💡 CTYPES are based on JSON Schema, a standard used to annotate and validate JSON documents. We don't need to dive into it in this tutorial, for now we can think of CTYPE as JSON objects.    

A CTYPE is stored on the KILT blockchain - more exactly, a CTYPE hash is stored on the KILT blockchain. We'll look into this later.  

In a real-life case, a user would simply retrieve one existing CTYPE they need to use from a repository of CTYPES - for example, by fetching it via a REST API.  
But in this tutorial, we want to keep it simple.   

We'll just use a CTYPE that we already know exists on our blockchain.  


## Hands-on time

Create a file `ctype.json` with following content:  
We'll then use it later in the tutorial to crate a claim. 

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
  "metadata": {
    "title": {
      "default": "KILT Workshop Attended"
    },
    "description": {
      "default": ""
    },
    "properties": {
      "name": {
        "title": {
          "default": "name"
        }
      },
      "age": {
        "title": {
          "default": "age"
        }
      }
    }
  },
  "owner": "5HXfLqrqbKoKyi61YErwUrWEa1PWxikEojV7PCnLJgxrWd6W",
  "hash": "0x981955a2b7990554f6193a9e770ea625c68d2bfc5a1ff996e6e28d2a620fae16"
}

```  

Let's have a look at what these fields are: 


Key name | What it's used for 
---------|----------
 `schema` | B1 
 `metadata` | B2 
 A3 | B3 | C3


> 💡 `metadata` is a field KILT may use in the future to support different languages.



We will need it to create our claim and to verify, that the claim follows the rules of this ctype. 
