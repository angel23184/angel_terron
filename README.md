# MessageApp
## Documentation:

### Endpoint:
```sh
http://localhost:9001
```
### Methods: 

#### get:
```sh
http://localhost:9001/
```

#### Response:
Status 200:

Hello World

#### post:

```sh
http://localhost:9001/messages
```
```sh
Content-Type: 'application/json'
Request: 
{
  "destination": "STRING",
  "body": "STRING"
}
```
Required: Yes


Empty fields are not allowed


Max length:

  "destination" = 140 characters
  
  
  "body" = 140 characters

Example: 
```sh
{
  "destination": "john Doe",
  
  "body": "Hello John"
}
```

#### Response:

Status 200:
OK

#### ERRORS:

#### Status 400:

Empty fields are not allowed

First param must be destination

Second param must be body

You must add 2 parameters

Please, respect 140 characters

Only strings are allowed


#### Status 500:

An error occurs. Please try again
