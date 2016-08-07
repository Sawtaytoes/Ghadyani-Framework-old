config = require __includes + 'config-settings'
nodemailer = require 'nodemailer'
smtpTransport = require 'nodemailer-smtp-transport'

validation = [
	'name'
	'email'
	'subject'
	'message'
	'reason'
]

module.exports = (reqBody, res) ->

	## Setup SMTP Transport
	if not global.__transporter
		global.__transporter = nodemailer.createTransport smtpTransport config.getSmtpCredentials()

	validationIssues = ''
	validation.forEach (item) ->
		if not reqBody[item] or reqBody[item] == ''
			validationIssues += ", #{item}"

	if validationIssues != ''
		res.send message: 'Missing:' + validationIssues.substr(1) + '.'
		return

	## Set `To:` Email Address
	switch reqBody.reason
		when 'press' then mailTo = 'Press <press@pulsengame.com>'
		when 'submission' then mailTo = 'Submissions <submission@pulsengame.com>'
		when 'general' then mailTo = 'Inquiries <info@pulsengame.com>'
		else mailTo = 'Customer Service <customerservice@pulsengame.com>'

	## Configure Mail Options
	mailOptions = Object.assign {},
		to: mailTo
		replyTo: reqBody.name + ' <' + reqBody.email + '>'
		subject: reqBody.subject
		text: reqBody.name + ' ' + reqBody.email + '\n' + reqBody.message
		html: reqBody.name + ' &lt;' + reqBody.email + '&gt;<br><br>' + reqBody.message.replace /\n/gm, '<br>'
	, config.getMailOptions()

	## Send Email
	__transporter.sendMail mailOptions, (err, info) ->
		if err
			config.isDev() and console.error(err)
			res.send
				message: err.code == 'ECONNREFUSED' and "Unable to connect to the email server. Please try again." or "Something went very wrong. Please try again."
				success: false
			return

		config.isDev() and console.info "Message sent: " + info.response

		res.send
			message: "Message sent."
			success: true
