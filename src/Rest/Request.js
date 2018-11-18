const axios = require('axios');
const DiscordRestError = require('./DiscordRestError');

class Request
{
    constructor(client)
    {
        this._client = client;
    }

    async request(method, url, data = {})
    {
        var methods = ['DELETE', 'GET', 'PATCH', 'POST', 'PUT'];
        
        if (!methods.includes(method)) return this._client.emit('error', new Error('Invalid HTTP Method!'));

        try {
            return await axios(
            {
                method: method,
                url: url,
                data: data.data,
                headers: data.headers
            });
        } catch(error)
        {
            switch (error.response.status)
            {
                case 400:
                    this._client.emit('error', new DiscordRestError('Bad Request', 400));
                    break;

                case 401:
                    this._client.emit('error', new DiscordRestError('Client Unauthorized', 401));
                    break;

                case 403:
                    this._client.emit('error', new DiscordRestError('Client Forbidden', 403));
                    break;

                case 404:
                    this._client.emit('error', new DiscordRestError('Not Found', 404));
                    break;

                case 405:
                    this._client.emit('error', new DiscordRestError('Method not allowed', 405));
                    break;

                case 429:
                    this._client.emit('error', new DiscordRestError('You are being rate limited', 429));
                    break;

                case 502:
                    this._client.emit('error', new DiscordRestError('Gateway unavailable ( Please contact devs about this )', 502))
                    break;

                default:
                    this._client.emit('debug', error.reason);
                    break;
            };
        };
    }
};

module.exports = Request;