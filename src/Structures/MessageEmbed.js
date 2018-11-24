/**
 * @class A much easier way to use embeds
 */

class MessageEmbed
{
    constructor(data = {})
    {
        /**
         * The title of the Embed
         */

        this.title = data.title;

        /**
         * The description of the Embed
         */

        this.description = data.description;

        /**
         * The fields for the embed
         */

        this.fields = data.fields || [];

        /**
         * The url of the embed
         */

        this.url = data.url;

        /**
         * The timestamp of the embed
         */

        this.timestamp = data.timestamp;

        /**
         * The color of the embed
         */

        this.color = data.color;

        /**
         * The embed footer
         */

        this.footer = data.footer;

        /**
         * The image of the embed
         */

        this.image = data.image;

        /**
         * The thumbnail of the embed
         */

        this.thumbnail = data.thumbnail;

        /**
         * Author of the embed
         */

        this.author = data.author;
    }

    /**
     * Sets the embed title
     * @param {String} title The embed title
     * @returns {MessageEmbed} This embed
     */

    setTitle(title)
    {
        if (title.length > 256) throw new RangeError('Message Embed Fields may not exceed 256 Characters!');
        this.title = title;
        return this;
    }

    /**
     * Sets the embed Description
     * @param {String} description The embed description
     * @returns {MessageEmbed} This embed
     */

    setDescription(description)
    {
        if (description.length > 2048) throw new RangeError('Message Embed Descriptions may not exceed 2048 Characters!');

        this.description = description;
        return this;
    }

    /**
     * Adds a field to the embed
     * @param {String} name The Field Name
     * @param {String} value The field Value
     * @param {Boolean} [inline=false] Whether or not to display the field in Inline
     * @returns {MessageEmbed} This embed
     */

    addField(name, value, inline = false)
    {
        if (this.fields.length > 25) throw new RangeError('Message Embeds may not exceed 25 Fields!');

        if (name.length > 256) throw new RangeError('Message Embed Field Names may not exceed 256 Characters!');
        if (name.length === 0) throw new RangError('Message Embed Field Names may not be empty');

        if (value.length > 1024) throw new RangError('Message Embed Field Values may not exceed 1024 Characters!');
        if (value.length === 0) throw new RangeError('Message Embed Field Values may not be empty');

        this.fields.push({ name, value, inline });
        return this;
    }

    /**
     * Sets the Embed Author
     * @param {String} name The name of the Author
     * @param {String} [icon] The icon URL of the Author
     * @param {String} [url] The URL of the Author
     * @returns {MessageEmbed} This embed
     */

    setAuthor(name, icon, url)
    {
        this.author = { name, icon_url: icon, url };
        return this;
    }

    /**
     * Sets the color of the Embed
     * @param {Number|String} Color code of the Embed
     * @returns {MessageEmbed} This embed
     */

    setColor(color)
    {
        if (typeof color === "string")
        {
            var hex = color.substring(1);
            var decimal = "0x" + hex;

            color = parseInt(decimal.substring(2), 16)
        }
        this.color = color;
        return this;
    }

    /**
     * Sets the url of the embed
     * @param {String} url The url
     * @returns {MessageEmbed} This embed
     */

    setUrl(url)
    {
        this.url = url;
        return this;
    }

    /**
     * Sets the timestamp of this embed
     * @param {Date} [timestamp=new Date()] The Timestamp
     * @returns {MessageEmbed} This embed
     */

    setTimestamp(timestamp = new Date())
    {
        this.timestamp = timestamp;
        return this;
    }

    /**
     * Sets the footer of the embed
     * @param {String} text The text on the footer
     * @param {String} [icon] The icon URL of the footer
     * @returns {MessageEmbed} This embed
     */

    setFooter(text, icon)
    {
        if (text.length > 2048) throw new RangeError('Message Embed Footer Texts may not exceed 2048 Characters!');
        this.footer = { text, icon_url: icon };
        return this;
    }

    /**
     * Sets the embed Thumbnail
     * @param {String} url The URL of the thumbnail
     * @returns {MessageEmbed} This embed
     */

    setThumbnail(url)
    {
        this.thumbnail = { url };
        return this;
    }

    /**
     * Sets the embed Image
     * @param {String} url The URL of the Image
     * @returns {MessageEmbed} This embed
     */

    setImage(url)
    {
        this.image = { url };
        return this;
    }
};

module.exports = MessageEmbed;
