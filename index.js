const centra = require('@aero/centra');
const checkLib = () => {
  let version = '';
  try {
    version = require('discord.js');
  } catch (error) {
    return 'UNSUPPORTED LIB!';
  }
  return parseInt(version);
};
/**
 * @class LBL
 */
class LBL {
  /**
   * @constructor
   * @param {Object} client
   * @param {String} token
   */
  constructor(client, token) {
    this.client = client;
    this.token = token;
    this.lib = checkLib();
    this.client.on('ready', () => {
      this._AutoPost(this.client);
    });
    this.client.on('guildCreate', () => {
      this._AutoPost(this.client);
    });
    this.client.on('guildDelete', () => {
      this._AutoPost(this.client);
    });
  }
  /**
   * @function postStats
   * @param {Number} server_count
   */
  async postStats(
    server_count // eslint-disable-line camelcase
  ) {
    const stats = {
      server_count,
    };
    try {
      const response = await centra(
        `https://lunabotlist.gq/api/${this.client.user.id}`,
        'POST'
      )
        .header('Authorization', this.token)
        .body(stats)
        .json();
      if (response.Error) console.log(`Error: ${response.Error}`);
      else console.log(response.Status);
    } catch (e) {
      console.log(e);
    }
  }
  /**
   * @function _AutoPost
   * @param {Object} client
   */
  async _AutoPost(client) {
    if (!client)
      return console.log('You have not provided your discord Client!');
    if (!this.token)
      return console.log('You have not provided your luna bot list api token!');
    const stats = {
      server_count: 0,
    };
    if (this.lib === 11) stats.server_count = client.guilds.size;
    else stats.server_count = client.guilds.cache.size;
    try {
      const response = await centra(
        `https://lunabotlist.gq/api/${client.user.id}`,
        'POST'
      )
        .header('Authorization', this.token)
        .body(stats)
        .json();
      if (response.Error) console.log(`Error: ${response.Error}`);
      else console.log(response.Status);
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = LBL;
