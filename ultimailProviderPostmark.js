'use strict';

/*
 * ULTIMAIL PROVIDER POSTMARK
 */

const extender = require(`object-extender`);
const postmark = require(`postmark`);

/*
 * Sends the given email via the Postmark API.
 */
function sendEmail (email, client) {

	return new Promise((resolve, reject) => {

		const properties = {
			To: email.get(`to`).join(`,`),
			Cc: email.get(`cc`).join(`,`),
			Bcc: email.get(`bcc`).join(`,`),
			From: email.get(`from`),
			ReplyTo: email.get(`replyTo`) || email.get(`from`),
			Subject: email.get(`subject`),
			HtmlBody: email.get(`htmlBody`),
			TextBody: email.get(`plainBody`),
			Attachments: email.get(`attachments`).map(item => Object({
				Content: item.buf.toString(`base64`),
				Name: item.filename,
				ContentType: item.mimeType,
			})),
		};

		client.sendEmail(properties, (err, response) => {

			if (err) { return reject(err); }
			if (response.Message !== `OK` || response.ErrorCode !== 0) {
				reject(new Error(`Send email failed with error code "${response.ErrorCode}".`));
			}

			return resolve(response);

		});

	});

}

/*
 * Returns the middleware function.
 */
module.exports = function ultimailProviderPostmark (_config) {

	const config = extender.defaults({
		apiKey: null,
	}, _config);

	const client = new postmark.Client(config.apiKey);

	// The actual middleware to return.
	return (email, options, next) => {

		Promise.resolve()
			.then(() => sendEmail(email, client))
			.then(result => next(null, result))
			.catch(err => next(err));

	};

};
