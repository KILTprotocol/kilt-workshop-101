# 💠 CTYPE 

CTYPE is a KILT-specific term, but the concept is simple.  
A CTYPE defines what the structure of a claim must be. You can think of it as the data model for your claim.   

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

A CTYPE is stored on the KILT blockchain - more exactly, a CTYPE hash is stored on the KILT blockchain. We'll look into this.  

In a real-life case:  
A user would simply retrieve an existing CTYPE from a repository of CTYPES, for example via a REST API.   

In this tutorial: 
To keep it simple, we'll just use a CTYPE that we already know exists on our blockchain.  


## Code

Create a file `ctype.json`.  
We'll need it later in this tutorial, in order to create a claim and then verify it.  

Paste the follwing content in `ctype.json`:

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

Let's have a look at what these entries mean.   

Key | Meaning
---------|----------
 `schema` |  The actual structure a claim should have
 `metadata` | Metadata used to support different languages 
 `owner` | The public address of the user who created this CTYPE 
`hash` | Most important attribute. 

