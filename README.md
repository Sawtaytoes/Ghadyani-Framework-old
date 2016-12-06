# Ghadyani Framework for Webpack, React, and Redux

## Prerequisites

### Required
- [Git](http://www.git-scm.com/downloads) (2.6.1 or higher)
- [NodeJS](https://nodejs.org/en/download/) (6.2.2 or higher)
- [npm](https://docs.npmjs.com/) (3.7.2 or higher)
- [Visual Studio](https://www.microsoft.com/en-us/download/details.aspx?id=48131) (2013 only) `Windows only`

### Optional
- [MailDev](http://danfarrelly.nyc/MailDev/) `Local Mail Server for Testing Email`


## Setup

### Assets
```shell
npm config set msvs_version 2013 --global # Windows requires VS2013 installed
npm i
```

### Configuration Customization

#### Config Settings
Default configs are `config-settings.js`. Here's an example of what defaults might look like
```js
env: 'production',                            // Can be 'development' or 'production'.

//- Server
protocol: 'http',                             // Using `https` requires valid certificates.
hostname: '0.0.0.0',                          // Can be 0.0.0.0 for binding to all ports.
port: 3000,                                   // Port of webserver.
// proxyPort: 3001,                           // Optional. Will be `port + 1` if not defined.

//- Testing
testsPath: '/tests',                          // Path used when performing unit-tests

//- Email Submission
mailSendPath: '/contact/send',                // Path that's used when doing a POST to send mail.
mailOptions: {                                // Options for Nodemailer.
	from: 'Fake User <fake.user@example.com>', // When sending mail, this appears in the `FROM` field
},
smtpCredentials: {                            // Configuration for a local maildev server.
	host: 'localhost',
	port: 1025,
	tls: {
		rejectUnauthorized: false,
	}
}
```

To override these configs, either setup Node env vars such as: `NODE_ENV`, `PROTOCOL`, `HOSTNAME`, `PORT`, etc or create a `./includes/config.coffee` file and have it return an object with overrides like so:

```js
module.exports = {
	env: 'development',
	protocol: 'https',
	port: 443,
}
```


#### SMTP Configuration
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


## Web Server Setup

### Development: Local
```shell
npm start
```

OR
```shell
bash local.sh
```

OR

```shell
node index.js
```

### Production: Hosted VPS
[Using PM2](http://pm2.keymetrics.io/)

#### Start the Server
Start a single server for testing:

```shell
bash server.sh
```

Start a cluster of `3` servers for load balancing in production:

```shell
bash server.sh 3
```

The number `3` can be replaced with any number. The default is `0`: equal to the number of CPU cores.

#### Update from Git and Restart
```shell
bash update.sh
```

If you update the update.sh file, make sure to run `git pull` prior to running the update script.

#### Stop the Server
```shell
bash stop-server.sh
```

### Create SSL Cert
Make sure to run this command to upgrade pip before starting:

```shell
pip install --upgrade pip
```

Optionally, you can upgrade Let's Encrypt:

```shell
cd /usr/share/letsencrypt/
git pull
```

_Replace `SERVER_NAME` with the website address._

```shell
service nginx stop

/usr/share/letsencrypt/letsencrypt-auto certonly \
-a standalone \
-d www.SERVER_NAME \
-d SERVER_NAME \
--server https://acme-v01.api.letsencrypt.org/directory

service nginx start
```

Or try this experimental approach:

```shell
/usr/share/letsencrypt/letsencrypt-auto certonly \
-a nginx \
-d www.SERVER_NAME \
-d SERVER_NAME \
--server https://acme-v01.api.letsencrypt.org/directory
```

When running the Let's Encrypt with, it requires installing the NGINX plugin:

```shell
cd /usr/share/letsencrypt/
~/.local/share/letsencrypt/bin/pip install -U letsencrypt-nginx
```

Let's Encrypt allows renewing using:

```shell
/usr/share/letsencrypt/letsencrypt-auto renew
```

### Create & Update Dev SSL Certs
> For ServiceWorker compatibility, update or use these certs along with `https` in `network-protocol`.

Using [ZeroSSL](https://zerossl.com/free-ssl):

- Account ID is 2400598
- Files are located in `conf/`

### Linting
Install packages globally for Sublime Text's `SublimeLinter-contrib-eslint` plugin.

```shell
npm i -g babel-eslint eslint-plugin-react
```
