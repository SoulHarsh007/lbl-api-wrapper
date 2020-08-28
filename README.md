# Luna Bot List API Wrapper

## Installation

Run `npm i --save lbl-api-wrapper` to save the api-wrapper package.

## Usage

You need to require the package and make a new instance with 2 params: client and token, where client is your discord.js Client and token is your luna bot list api token. This package will automatically post server count on bot's startup and when the bot joins/leaves a guild (server).

```js
const LBL = require('lbl-api-wrapper');
const Luna = new LBL(client, 'your-api-token-goes-here');
```

If you wish to post server count manually, you can use `postStats` method. It takes 1 param, and it is server count you wish to post.
