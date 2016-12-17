const nodemailer = require('nodemailer')
const smtpTransport = require('nodemailer-smtp-transport')

// Configs
const dir = require(`${global.baseDir}/global-dirs`)
const config = require(`${dir.configs}config-settings`)

const validation = [
	'name',
	'email',
	'subject',
	'message',
	'reason',
]

module.exports = (reqBody, res) => {
	// Setup SMTP Transport
	if (!global.__transporter) {
		global.__transporter = nodemailer.createTransport(
			smtpTransport(config.getSmtpCredentials())
		)
	}

	let validationIssues = ''
	validation.forEach(item => {
		if (!reqBody[item] || reqBody[item] === '') {
			validationIssues += `, ${item}`
		}
	})

	if (validationIssues !== '') {
		res.send({ message: `Missing: ${validationIssues.substr(1)}.` })
		return
	}

	// Set `To:` Email Address
	let mailTo
	switch(reqBody.reason) {
		case 'press':
			mailTo = 'Press <press@example.com>'
			break;
		case 'submission':
			mailTo = 'Submissions <submission@example.com>'
			break;
		case 'general':
			mailTo = 'Inquiries <info@example.com>'
			break;
		default:
			mailTo = 'Customer Service <customerservice@example.com>'
	}

	// Configure Mail Options
	const mailOptions = Object.assign({}, {
		to: mailTo,
		replyTo: `${reqBody.name} <${reqBody.email}>`,
		subject: reqBody.subject,
		text: `${reqBody.name} ${reqBody.email}\n${reqBody.message}`,
		html: `${reqBody.name} &lt;${reqBody.email}&gt;<br><br>${reqBody.message.replace(/\n/gm, '<br>')}`,
	}, config.getMailOptions())

	// Send Email
	global.__transporter.sendMail(mailOptions, (err, info) => {
		if(err) {
			config.isDev() && console.error(err)
			res.send({
				message: err.code === 'ECONNREFUSED' ? "Unable to connect to the email server. Please try again."
					: "Something went very wrong. Please try again.",
				success: false,
			})
			return
		}

		config.isDev() && console.info(`Message sent: ${info.response}`)

		res.send({
			message: "Message sent.",
			success: true,
		})
	})
}
