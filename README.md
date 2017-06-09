# Ultimail-Provider-Postmark
Provider middleware for [Ultimail](https://www.npmjs.org/package/ultimail) that adds support for sending emails via [Postmark](https://postmarkapp.com/).

## Quick Start
You need to configure this middleware as a "provider" using `mailer.configure()` method:

```javascript
const Ultimail = require(`ultimail`);
const ultimailProviderPostmark = require(`ultimail-provider-postmark`);

const mailer = new Ultimail({
	from: `some@email.com`,
	styles: true,
});

mailer.configure(`provider`, ultimailProviderPostmark({
	apiKey: `my-postmark-server-api-key`,
}));
```

## Configuration
You can pass the following config options to this middleware:

|----------------|---------------|-------------|
| Option 				 | Default Value | Description |
| apiKey 				 |							 | The API server key that Postmark assigns to your server. |
| throwOnFailure | `true`				 | Set false to just return the Postmark response when an email fails to send, instead of throwing an error. |

## Response Object
The shape of the response object returned by Postmark can be found in the [Postmark API documentation](http://developer.postmarkapp.com/developer-api-email.html#send-email). If you want to get access to the response object even when an email fails to send (instead of an error being thrown), you will need to set the "throwOnFailure" config option to a falsy value.
