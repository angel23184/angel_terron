# MessageApp
## Documentation:

### Endpoint:
http://localhost:9001

### Methods: 

get:
http://localhost:9001/

#### Response:
Status 200:
Hello World

get:
http://localhost:9001/messages/getmessages

response:
```sh
{
    "_id": "ObjectId",
    "updatedAt": "date",
    "created_at": "date",
    "destination": "String",
    "body": "String",
    "status":"Boolean",
    "confirm": Boolean
    "__v": Int32
}
```

post:
http://localhost:9001/messages

Content-Type: 'application/json'
Request: 
{
  "destination": "STRING",
  "body": "STRING"
}

Required: Yes
Empty fields are not allowed

Max length:
  "destination" = 140 characters
  "body" = 140 characters

Example: 

{
  "destination": "john Doe",
  "body": "Hello John"
}

#### Response:

Status 200:
OK
Message succesfully saved

#### ERRORS:

Status 400:

Empty fields are not allowed
First param must be destination
Second param mut be body
You must add 2 parameters
Please, respect 140 characters
Only strings are allowed
An error occurs saving your message. Please try again

Status 500:
An error occurs. Please try again
Cannot get the messages. Try again
Message is sent but no answer. Please try again
