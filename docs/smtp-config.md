# SMTP Configuration
Example using **maildev** (`npm i -g maildev`):

```js
smtpCredentials: {
	host: 'localhost',
	port: 1025,
	tls: { rejectUnauthorized: false },
}
```

Example gmail.com string:

```js
smtpCredentials: 'smtps://user%40gmail.com:pass@smtp.gmail.com'
```

Start the local catch-all SMTP server using the command `maildev`.
