#MessageApp
##Documentation:

Endpoint:
http://localhost:9001

Methods: 

get:
http://localhost:9001/

Response:
Status 200:
Hello World

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

Response:

Status 200:
OK

ERRORS:

Status 400:

Empty fields are not allowed
First param must be destination
Second param mut be body
You must add 2 parameters
Please, respect 140 characters
Only strings are allowed

Status 500:
An error occurs. Please try again
