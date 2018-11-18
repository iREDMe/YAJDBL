const ENDPOINTS = require('../Rest/Endpoints');

/**
 * @class Channel
 */

class Channel
{
    constructor(client, data)
    {
        Object.defineProperty(this, '_client', { value: client });

        /**
         * The Channel ID
         */

        this.id = data.id;

        /**
         * The Channel Type
         * * `dm` a DM Channel
         * * `group` a group DM Channel
         * * `text` a Text Channel
         * * `voice` a Voice Channel
         * * `category` a Channel Category
         */

        this.type = null;
    }

    /**
     * Deletes the Channel
     * @returns {Promise<Channel>}
     * @example
     * <Channel>.delete()
     *     .then(c => console.log(c))
     *     .catch(console.error);
     */

    delete()
    {
        return this._client.rest.request("DELETE", ENDPOINTS.CHANNELS(this._client.http.api, this.id),
        {
            headers:
            {
                Authorization: `Bot ${this._client.token}`
            }
        }).then(() =>
        {
            return this;
        });
    }
};

module.exports = Channel;
