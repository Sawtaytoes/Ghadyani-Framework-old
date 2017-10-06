# Configuration
Default config values are found in [configs/index.js](configs/index.js).

Create a `custom.js` in `configs/` to override default and `process.env` config values.


## Example
```js
module.exports = {
	env: 'development',
	port: 4000,
}
```


# Config Values


## `env`
Node.js environment. This value can be either `'development'` or `'production'`.

**Environment Variables**
```
NODE_ENV
```

**Example**
```
env: 'development',
```


## `hostname`
A string representation of the hostname, domain name, or IP address of the webserver. If configured, this is usually set to `'0.0.0.0'` and defaults to `'localhost'`.

**Environment Variables**
```
HOSTNAME
```

**Example**
```
hostname: '0.0.0.0',
```


## `mailFrom`
This populates the "from" field when sending an email. Some email organizations like Gmail do not allow sending email from one of their accounts if the email address in question didn't actually send the email. To rectify this flaw, choose a valid email address to send mail from which Gmail will not block such as the reply email. A "reply to" field has been setup to allow replying to these emails at the proper address.

**Environment Variables**
```
MAIL_FROM
```

**Example**
```
mailFrom: 'Fake User <fake.user@example.com>',
```


## `mailSendPath`
Route that accepts an HTTP POST for sending email.

**Environment Variables**
```
MAIL_SEND_PATH
```

**Example**
```
mailSendPath: '/contact/send',
```


## `port`
A number representing the port for the webserver to listen.

**Environment Variables**
```
PORT
```

**Example**
```
port: 3000,
```


## `protocol`
The protocol used to connect to the webserver. Using `https` requires an SSL certificate in the `cert/` directory.

**Environment Variables**
```
PROTOCOL
```

**Example**
```
protocol: 'http',
```


## `proxyHostname`
A string representation of the hostname, domain name, or IP address of the Express instance Webpack Dev Server proxies for server-side routes when `env` is `'development'`. Defaults to `hostname` if not set.

**Environment Variables**
```
PROXY_HOSTNAME
```

**Example**
```
proxyHostname: '0.0.0.0',
```


## `proxyPort`
A number representing the port that Express is running for Webpack Dev Server to proxy all server-side routes when `env` is `'development'`. Defaults to `port` if not set.

**Environment Variables**
```
PROXY_PORT
```

**Example**
```
proxyPort: 3001,
```


## `smtpCredentials`
Either an object or string representation of email credentials for the [`nodemailer-smtp-transport` package](https://nodemailer.com/smtp/).

**Environment Variables**
```
SMTP_CREDENTIALS
```

**Examples**
```
smtpCredentials: 'smtps://username:password@smtp.example.com',
```

```
smtpCredentials: {
	host: 'localhost',
	port: 1025,
	tls: {
		rejectUnauthorized: false,
	}
},
```


## `testsPath`
URI for client-side tests.

**Environment Variables**
```
TESTS_PATH
```

**Example**
```
testsPath: '/tests',
```
