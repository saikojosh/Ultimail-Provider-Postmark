# Ultimail-Provider-Postmark
Provider middleware for [Ultimail](https://www.npmjs.org/package/ultimail) that adds support for sending emails via Postmark.

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
