---
title: HTTP API Status Codes Cheat Sheet
slug: http-api-status-codes-cheat-sheet
metaDescription: A quick and easy Cheat Sheet for understanding API Status Codes
publishDate: 2026-09-13
isDraft: false
tags:
  - API
  - API Status Code
  - Cheat Sheet
---
A simple and easy-to-remember reference for common HTTP status codes used in REST APIs.

## Quick Memory Trick

Think of the **first digit**:

| Range | Meaning       | Easy Way to Remember              |
| ----- | ------------- | --------------------------------- |
| `1xx` | Informational | 🟡 **Wait / Processing**          |
| `2xx` | Success       | 🟢 **Everything worked**          |
| `3xx` | Redirection   | 🔵 **Go somewhere else**          |
| `4xx` | Client Error  | 🟠 **Your request has a problem** |
| `5xx` | Server Error  | 🔴 **Server has a problem**       |

- - -

# 1xx - Informational

The request has been received, but more communication or processing is happening.

| Code  | Name                | Simple Meaning                                           |
| ----- | ------------------- | -------------------------------------------------------- |
| `100` | Continue            | Keep sending the request                                 |
| `101` | Switching Protocols | Server is switching protocols                            |
| `102` | Processing          | Request is being processed *(deprecated)*                |
| `103` | Early Hints         | Server sends early information before the final response |

### Remember

> **1xx = "Not finished yet."**

These are rarely used directly in normal REST API development.

- - -

# 2xx - Success

The request was successfully processed.

| Code  | Name                          | Simple Meaning                                   |
| ----- | ----------------------------- | ------------------------------------------------ |
| `200` | OK                            | Request succeeded                                |
| `201` | Created                       | New resource was created                         |
| `202` | Accepted                      | Request accepted, processing will happen later   |
| `203` | Non-Authoritative Information | Response came from a modified/copy source        |
| `204` | No Content                    | Request succeeded, but there is no response body |
| `205` | Reset Content                 | Reset the current view/input                     |
| `206` | Partial Content               | Only part of the requested resource was returned |

## Most Important 2xx Codes

### `200 OK`

**Meaning:** The request succeeded.

Common examples:

```http
GET /api/users/10
→ 200 OK
```

Use when you successfully retrieve or process something.

- - -

### `201 Created`

**Meaning:** A new resource was successfully created.

Commonly used with `POST`.

```http
POST /api/users
→ 201 Created
```

Example:

```json
{
  "id": 101,
  "name": "Bishal"
}
```

### Easy memory

> **201 = Created something new**

- - -

### `202 Accepted`

**Meaning:** The server accepted the request but has not finished processing it yet.

Useful for long-running or background operations.

```http
POST /api/reports/generate
→ 202 Accepted
```

### Easy memory

> **202 = "Got it, I'll process it."**

- - -

### `204 No Content`

**Meaning:** The request succeeded, but there is nothing to return in the response body.

Common example:

```http
DELETE /api/users/10
→ 204 No Content
```

### Easy memory

> **204 = Success + Nothing to return**

- - -

# 3xx - Redirection

The client needs to use another URL or can use a cached response.

| Code  | Name               | Simple Meaning                                |
| ----- | ------------------ | --------------------------------------------- |
| `300` | Multiple Choices   | Multiple possible responses                   |
| `301` | Moved Permanently  | Resource permanently moved                    |
| `302` | Found              | Resource temporarily redirected               |
| `303` | See Other          | Get the resource from another URL             |
| `304` | Not Modified       | Use your cached version                       |
| `307` | Temporary Redirect | Temporary redirect, keep the same HTTP method |
| `308` | Permanent Redirect | Permanent redirect, keep the same HTTP method |

## Most Important 3xx Codes

### `301 Moved Permanently`

**Meaning:** The resource has permanently moved to another URL.

```text
old-url.com/api/users
        ↓
new-url.com/api/users
```

### Easy memory

> **301 = Permanent move**

- - -

### `302 Found`

**Meaning:** The resource is temporarily available at another URL.

### Easy memory

> **302 = Temporary move**

- - -

### `304 Not Modified`

**Meaning:** The resource has not changed, so the client can use its cached version.

### Easy memory

> **304 = "Your cached copy is still good."**

- - -

### `307 Temporary Redirect`

Like `302`, but the client should preserve the original HTTP method.

For example:

```http
POST /api/orders
→ 307 Temporary Redirect
→ POST /new-api/orders
```

- - -

### `308 Permanent Redirect`

Like `301`, but the client should preserve the original HTTP method.

### Easy memory

> **307 = Temporary + keep method**\
> **308 = Permanent + keep method**

- - -

# 4xx - Client Errors

The request has a problem on the **client/request side**.

This does not necessarily mean a browser or frontend bug. It means the server considers the request invalid, unauthorized, forbidden, or otherwise unable to be fulfilled as requested.

| Code  | Name                            | Simple Meaning                                       |
| ----- | ------------------------------- | ---------------------------------------------------- |
| `400` | Bad Request                     | Request is invalid                                   |
| `401` | Unauthorized                    | Authentication is required/failed                    |
| `402` | Payment Required                | Payment is required *(rarely used)*                  |
| `403` | Forbidden                       | You don't have permission                            |
| `404` | Not Found                       | Resource doesn't exist                               |
| `405` | Method Not Allowed              | HTTP method isn't allowed                            |
| `406` | Not Acceptable                  | Requested response format isn't acceptable           |
| `408` | Request Timeout                 | Request took too long                                |
| `409` | Conflict                        | Request conflicts with current state                 |
| `410` | Gone                            | Resource was permanently removed                     |
| `411` | Length Required                 | `Content-Length` is required                         |
| `412` | Precondition Failed             | A request condition wasn't met                       |
| `413` | Content Too Large               | Request body is too large                            |
| `415` | Unsupported Media Type          | Unsupported request format                           |
| `416` | Range Not Satisfiable           | Requested range can't be provided                    |
| `417` | Expectation Failed              | Server can't meet the request's expectation          |
| `422` | Unprocessable Content           | Request format is valid, but data can't be processed |
| `423` | Locked                          | Resource is locked                                   |
| `424` | Failed Dependency               | Request failed because another request failed        |
| `425` | Too Early                       | Server doesn't want to process the request yet       |
| `426` | Upgrade Required                | Client must switch to another protocol               |
| `428` | Precondition Required           | Request requires a precondition                      |
| `429` | Too Many Requests               | Too many requests in a given time                    |
| `431` | Request Header Fields Too Large | Request headers are too large                        |
| `451` | Unavailable For Legal Reasons   | Resource unavailable due to legal restrictions       |

- - -

# ⭐ Most Important 4xx Codes

These are the ones you should remember first when working with APIs.

## `400 Bad Request`

**Meaning:** The server cannot understand or process the request because the request is invalid.

Example:

```http
POST /api/users

{
  "email": "not-an-email"
}
```

### Easy memory

> **400 = Your request is bad**

- - -

## `401 Unauthorized`

**Meaning:** Authentication is required or the supplied authentication is invalid.

Example:

```http
GET /api/profile
Authorization: Bearer invalid-token

→ 401 Unauthorized
```

### Easy memory

> **401 = Who are you?**

### Important

Despite the name **Unauthorized**, `401` is primarily about **authentication**.

- - -

## `403 Forbidden`

**Meaning:** The server knows who you are, but you don't have permission to perform the requested action.

Example:

```text
User → Authenticated
     → Not an Admin
     → Trying to access /admin
     → 403 Forbidden
```

### Easy memory

> **403 = I know who you are, but you can't do this.**

- - -

## `401 vs 403\*\*

This is one of the most important API interview questions.

| Status | Meaning                | Easy Memory                            |
| ------ | ---------------------- | -------------------------------------- |
| `401`  | Authentication problem | **Who are you?**                       |
| `403`  | Permission problem     | **I know you, but you can't do this.** |

- - -

## `404 Not Found`

**Meaning:** The requested resource could not be found.

```http
GET /api/users/99999

→ 404 Not Found
```

### Easy memory

> **404 = Can't find it**

- - -

## `405 Method Not Allowed`

**Meaning:** The HTTP method is known, but that method isn't allowed for the resource.

Example:

```http
DELETE /api/users
→ 405 Method Not Allowed
```

The endpoint may exist, but it might only support:

```text
GET
POST
```

and not:

```text
DELETE
```

### Easy memory

> **405 = Method not allowed**

- - -

## `409 Conflict`

**Meaning:** The request conflicts with the current state of the resource.

Example:

```http
POST /api/users

{
  "email": "existing@example.com"
}

→ 409 Conflict
```

The email may already be registered.

### Easy memory

> **409 = Something conflicts**

- - -

## `415 Unsupported Media Type`

**Meaning:** The server doesn't support the format sent in the request.

Example:

```http
Content-Type: application/xml
```

But the API only accepts:

```http
Content-Type: application/json
```

### Easy memory

> **415 = Wrong data format**

- - -

## `422 Unprocessable Content`

**Meaning:** The request is syntactically valid, but the submitted data cannot be processed.

Example:

```json
{
  "age": -10
}
```

The JSON is valid, but the value may fail application validation.

### Easy memory

> **422 = Request is valid, data is not acceptable**

- - -

## `429 Too Many Requests`

**Meaning:** The client has sent too many requests within a certain period.

Example:

```text
100 requests/minute allowed

Client sends:
150 requests/minute

→ 429 Too Many Requests
```

Commonly used with **rate limiting**.

### Easy memory

> **429 = Slow down!**

- - -

# 5xx - Server Errors

The request may be valid, but the server failed while processing it.

| Code  | Name                            | Simple Meaning                                    |
| ----- | ------------------------------- | ------------------------------------------------- |
| `500` | Internal Server Error           | Unexpected server error                           |
| `501` | Not Implemented                 | Server doesn't support the required functionality |
| `502` | Bad Gateway                     | Gateway received an invalid response              |
| `503` | Service Unavailable             | Server temporarily unavailable                    |
| `504` | Gateway Timeout                 | Gateway didn't receive a response in time         |
| `505` | HTTP Version Not Supported      | HTTP version isn't supported                      |
| `506` | Variant Also Negotiates         | Server configuration error                        |
| `507` | Insufficient Storage            | Server can't store the required data              |
| `508` | Loop Detected                   | Server detected an infinite loop                  |
| `510` | Not Extended                    | Required HTTP extension isn't supported           |
| `511` | Network Authentication Required | Network authentication is required                |

- - -

# ⭐ Most Important 5xx Codes

## `500 Internal Server Error`

**Meaning:** Something unexpected went wrong on the server.

Example:

```text
Unhandled exception
Database failure
Unexpected application error

→ 500 Internal Server Error
```

### Easy memory

> **500 = Server messed up**

- - -

## `501 Not Implemented`

**Meaning:** The server doesn't support the functionality required to fulfill the request.

### Easy memory

> **501 = Server doesn't implement this**

- - -

## `502 Bad Gateway`

**Meaning:** A server acting as a gateway/proxy received an invalid response from another server.

Example:

```text
Client
  ↓
API Gateway
  ↓
Backend Service
  ↓
Invalid response
  ↓
502
```

### Easy memory

> **502 = Gateway got a bad response**

- - -

## `503 Service Unavailable`

**Meaning:** The server is temporarily unable to handle the request.

Common causes:

* Server maintenance
* Server overload
* Service temporarily down

### Easy memory

> **503 = Server is temporarily unavailable**

- - -

## `504 Gateway Timeout`

**Meaning:** A gateway/proxy waited for another server but didn't receive a response in time.

Example:

```text
Client
  ↓
API Gateway
  ↓
Backend
  ↓
No response in time
  ↓
504 Gateway Timeout
```

### Easy memory

> **504 = Gateway waited too long**

- - -

# 502 vs 503 vs 504

These three are easy to confuse.

| Code  | Meaning                         | Remember              |
| ----- | ------------------------------- | --------------------- |
| `502` | Gateway received a bad response | **Bad response**      |
| `503` | Service is unavailable          | **Service down/busy** |
| `504` | Gateway timed out waiting       | **Too slow**          |

- - -

# Most Important API Status Codes

If you don't want to memorize everything, start with these:

| Code  | Meaning                | Remember                     |
| ----- | ---------------------- | ---------------------------- |
| `200` | OK                     | ✅ Success                    |
| `201` | Created                | 🆕 Created                   |
| `202` | Accepted               | ⏳ Processing later           |
| `204` | No Content             | ✅ Success, nothing to return |
| `301` | Moved Permanently      | 🔄 Permanent redirect        |
| `302` | Found                  | 🔄 Temporary redirect        |
| `304` | Not Modified           | 📦 Use cache                 |
| `400` | Bad Request            | ❌ Invalid request            |
| `401` | Unauthorized           | 🔐 Authenticate              |
| `403` | Forbidden              | 🚫 No permission             |
| `404` | Not Found              | 🔎 Doesn't exist             |
| `405` | Method Not Allowed     | 🚫 Wrong HTTP method         |
| `409` | Conflict               | ⚔️ Conflict                  |
| `415` | Unsupported Media Type | 📄 Wrong format              |
| `422` | Unprocessable Content  | ⚠️ Invalid data              |
| `429` | Too Many Requests      | 🚦 Rate limited              |
| `500` | Internal Server Error  | 💥 Server error              |
| `502` | Bad Gateway            | 🌐 Bad upstream response     |
| `503` | Service Unavailable    | 🔴 Server unavailable        |
| `504` | Gateway Timeout        | ⏱️ Upstream timeout          |

- - -

# API Status Codes by Situation

## When GET succeeds

```text
200 OK
```

## When POST creates something

```text
201 Created
```

## When request is accepted for background processing

```text
202 Accepted
```

## When DELETE succeeds and nothing needs to be returned

```text
204 No Content
```

## When request data is invalid

```text
400 Bad Request
```

## When authentication is missing/invalid

```text
401 Unauthorized
```

## When user doesn't have permission

```text
403 Forbidden
```

## When resource doesn't exist

```text
404 Not Found
```

## When HTTP method isn't supported

```text
405 Method Not Allowed
```

## When request conflicts with existing state

```text
409 Conflict
```

## When validation/data cannot be processed

```text
422 Unprocessable Content
```

## When rate limit is exceeded

```text
429 Too Many Requests
```

## When something unexpected happens on the server

```text
500 Internal Server Error
```

## When an upstream service returns a bad response

```text
502 Bad Gateway
```

## When the service is temporarily unavailable

```text
503 Service Unavailable
```

## When an upstream service takes too long

```text
504 Gateway Timeout
```

- - -

# 🧠 Super Quick Memory Sheet

```text
1xx → INFORMATION
      "Wait / Processing"

2xx → SUCCESS
      "It worked"

3xx → REDIRECT
      "Go somewhere else"

4xx → CLIENT ERROR
      "Your request has a problem"

5xx → SERVER ERROR
      "The server has a problem"
```

### The Big Ones

```text
200 → OK
201 → Created
202 → Accepted
204 → No Content

301 → Permanent Redirect
302 → Temporary Redirect
304 → Not Modified

400 → Bad Request
401 → Authenticate
403 → No Permission
404 → Not Found
405 → Method Not Allowed
409 → Conflict
415 → Wrong Format
422 → Invalid/Unprocessable Data
429 → Too Many Requests

500 → Server Error
502 → Bad Gateway
503 → Service Unavailable
504 → Gateway Timeout
```

- - -

# 401 vs 403 vs 404

Remember this:

```text
401 → "Who are you?"
403 → "I know you, but you can't."
404 → "I can't find it."
```

- - -

# 400 vs 422

```text
400 → The request itself is bad.

422 → The request is understandable,
      but the data cannot be processed.
```

Example:

```json
// 400
{
  "name": 
}

// Invalid JSON


// 422
{
  "name": "Bishal",
  "age": -500
}

// Valid JSON,
// but invalid application data.
```

- - -

# 500 vs 502 vs 503 vs 504

```text
500 → Something went wrong on this server.

502 → Gateway received a bad response.

503 → Service is currently unavailable.

504 → Gateway waited too long for another server.
```

- - -

## Quick Rule for API Development

A simple way to think about status codes:

```text
Did it work?
    │
    ├── YES → 2xx
    │
    └── NO
         │
         ├── Client/request problem → 4xx
         │
         └── Server problem → 5xx
```

And for the most common REST API operations:

```text
GET resource
    → 200 OK

POST new resource
    → 201 Created

PUT/PATCH successful update
    → 200 OK / 204 No Content

DELETE successful
    → 204 No Content

Invalid request
    → 400 Bad Request

Not authenticated
    → 401 Unauthorized

No permission
    → 403 Forbidden

Resource doesn't exist
    → 404 Not Found

Validation/business conflict
    → 409 / 422

Too many requests
    → 429 Too Many Requests

Unexpected server error
    → 500 Internal Server Error
```

> **Tip:** You don't need to memorize every HTTP status code. For day-to-day API development and interviews, knowing the common `2xx`, `4xx`, and `5xx` codes well is much more useful.
