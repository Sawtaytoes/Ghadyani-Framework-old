# Ghadyani Framework for Webpack, React, and Redux
[ ![Codeship Status for Sawtaytoes/Ghadyani-Framework-Webpack-React-Redux](https://app.codeship.com/projects/6a9ebe50-fc1e-0134-257f-0aa8194bf520/status?branch=master)](https://app.codeship.com/projects/211675)

- [Create Dev SSL Certs](docs/dev-ssl-cert.md)
- [Create Prod SSL Certs](docs/prod-ssl-cert.md)
- [Linting](docs/linting.md)
- [Production Deployments](docs/prod-deploy.md)
- [SMTP Configuration](docs/smtp-config.md)
- [Software Requirements](docs/software-requirements.md)


## Running Locally
```shell
yarn start
```


## Configuration Settings
Default config values are found in [server/configs/configSettings.js](server/configs/configSettings.js).

Create a custom `config.js` in `server/configs/` to change from the default 'production' to 'development' and use https so long as there is a provided local SSL cert in `conf/`.

### Example
```js
module.exports = {
	env: 'development',
	protocol: 'https',
	port: 443,
}
```

You can also use Node.js environment variables:

- `HOSTNAME`
- `MAIL_FROM`
- `MAIL_SEND_PATH`
- `NODE_ENV`
- `PORT`
- `PROTOCOL`
- `PROXY_HOSTNAME`
- `PROXY_PORT`
- `SMTP_CREDENTIALS`
- `TESTS_PATH`
