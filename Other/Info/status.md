Here's a list of HTTP status codes in the 200, 400, and 500 ranges along with their meanings:


---

2xx: Success

These indicate that the client's request was successfully received, understood, and accepted.

1. 200 OK: The request has succeeded.


2. 201 Created: The request has succeeded, and a new resource has been created as a result.


3. 202 Accepted: The request has been received but not yet acted upon.


4. 203 Non-Authoritative Information: The response is modified by a proxy and may not match the original server response.


5. 204 No Content: The server successfully processed the request, but there is no content to send back.


6. 205 Reset Content: The server processed the request, and the client should reset the view (e.g., form fields).


7. 206 Partial Content: The server is delivering part of the resource due to a range header sent by the client.


8. 207 Multi-Status (WebDAV): Provides multiple status codes for different parts of a multi-resource operation.


9. 208 Already Reported (WebDAV): Indicates that the results of a previous request were already reported.


10. 226 IM Used: Indicates that the server has completed the request using the IM (Instance Manipulations) feature.




---

4xx: Client Errors

These indicate issues with the request made by the client.

1. 400 Bad Request: The server cannot process the request due to client error (e.g., malformed request syntax).


2. 401 Unauthorized: Authentication is required and has failed or has not yet been provided.


3. 402 Payment Required: Reserved for future use (initially intended for digital payment systems).


4. 403 Forbidden: The client does not have permission to access the requested resource.


5. 404 Not Found: The server cannot find the requested resource.


6. 405 Method Not Allowed: The HTTP method used is not supported for the requested resource.


7. 406 Not Acceptable: The requested resource is only capable of generating content not acceptable according to the Accept headers.


8. 407 Proxy Authentication Required: Authentication with a proxy is required.


9. 408 Request Timeout: The server timed out waiting for the request.


10. 409 Conflict: The request could not be completed due to a conflict with the current state of the resource.


11. 410 Gone: The requested resource is no longer available and will not be available again.


12. 411 Length Required: The server requires a valid Content-Length header.


13. 412 Precondition Failed: A precondition in the request headers is false.


14. 413 Payload Too Large: The request entity is larger than the server is willing to process.


15. 414 URI Too Long: The URI provided was too long for the server to process.


16. 415 Unsupported Media Type: The media format of the requested data is not supported.


17. 416 Range Not Satisfiable: The range specified in the request cannot be fulfilled.


18. 417 Expectation Failed: The expectation given in the Expect header could not be met.


19. 418 I'm a Teapot (RFC 2324): A joke status code indicating that the server refuses to brew coffee.


20. 421 Misdirected Request: The request was directed at a server that is not able to produce a response.


21. 422 Unprocessable Entity (WebDAV): The request is well-formed but cannot be processed due to semantic errors.


22. 423 Locked (WebDAV): The resource is locked.


23. 424 Failed Dependency (WebDAV): The request failed due to a failure of a previous request.


24. 425 Too Early: Indicates that the server is unwilling to risk processing a request that might be replayed.


25. 426 Upgrade Required: The client should switch to a different protocol.


26. 428 Precondition Required: The server requires the request to be conditional.


27. 429 Too Many Requests: The user has sent too many requests in a given amount of time.


28. 431 Request Header Fields Too Large: The server is unwilling to process the request because its header fields are too large.


29. 451 Unavailable For Legal Reasons: The server is denying access to the resource as a consequence of a legal demand.




---

5xx: Server Errors

These indicate that the server failed to fulfill a valid request.

1. 500 Internal Server Error: A generic error message for unexpected server issues.


2. 501 Not Implemented: The server does not support the functionality required to fulfill the request.


3. 502 Bad Gateway: The server, while acting as a gateway or proxy, received an invalid response from the upstream server.


4. 503 Service Unavailable: The server is currently unavailable (overloaded or down for maintenance).


5. 504 Gateway Timeout: The server, while acting as a gateway or proxy, did not receive a timely response from the upstream server.


6. 505 HTTP Version Not Supported: The server does not support the HTTP protocol version used in the request.


7. 506 Variant Also Negotiates: Indicates a server configuration error where content negotiation is circular.


8. 507 Insufficient Storage (WebDAV): The server cannot store the representation needed to complete the request.


9. 508 Loop Detected (WebDAV): The server detected an infinite loop while processing a request.


10. 510 Not Extended: Further extensions to the request are required for the server to fulfill it.


11. 511 Network Authentication Required: The client needs to authenticate to gain network access.



Let me know if you'd like a deeper explanation of any specific status code!

