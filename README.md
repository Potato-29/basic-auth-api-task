
# Basic Auth API

This is basic authentication system API, I have created as a task assigned by Automateazy


## API Reference

#### Sign up user

```http
  POST /auth/register
```
This API allows a new user to create an account by providing their email and password. An optional username can also be included in the request. Upon successful registration, the API will return a confirmation message along with the newly created user's details.

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | *Optional* The user's username |
| `email`    | `string` | **Required**. The user's email |
| `password` | `string` | **Required**. The user's password. |

#### Login user

```http
  POST /auth/login
```

This API allows an existing user to authenticate by providing their email and password. Upon successful authentication, the API returns a token that can be used to access protected resources.


| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`    | `string` | **Required**. The user's email |
| `password` | `string` | **Required**. The user's password. |

#### Me

```http
  GET /auth/me
```
This API allows a user to get fetch their information if they have a valid token in the Auth headers of the req


## DB Collections

The Database has two collections named as follows:

users

sessions


![App Screenshot]()

