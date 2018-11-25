// Typings for YAJDBL
// Typings Author: Zoro <admin@zoro.tech>
// License: MIT

declare module 'YAJDBL' {
	export class Client extends ConnectionHandler {
		constructor(options?: ClientOptions);
	
		public token: string;
		public channels: Collection<Snowflake, Channel>;
		public guilds: Collection<Snowflake, Guild>
		public users: Collection<Snowflake, any>;
		public client: Client;
		public disableEveryone: ClientOptions['disableEveryone'];
		public http: ClientOptions['http'];
		public wsOptions: ClientOptions['wsOptions'];

		public login(token: string): any;
		public disconnect(): any;
		public print(message: string | object | number): any;

	}


	export class ConnectionHandler {
		//a
	}


	export class Collection<K, V> extends Map<K, V> {
	
		private _array: V[];
		private _keyArray: K[];

		public array(): V[];
		public keyArray(): K[];
		public first(count?: number): Array<any>;
		public every(fn: void, thisArg?: any): any;
		public firstKey(count?: number): any;
		public lastKey(count?: number): any;
		public find(propOrFunc: string | void, value?: any): any;

	}

	export class Channel {
		constructor(client: Client, data: any);

		public type: string;

		public delete(): void
	
	}

	export class GuildChannel extends Channel {
		constructor(client: Client, data: any);

		private _client: Client;
		public position: number;
		public permissionOverwrites: any;
		public name: string;

		public createInvite(options?: GuildChannelOptions): any;
		public edit(options?: EditChannelOptions): Promise<Channel>;
		public fetchInvites(): Promise<Array<object>>;
		public overwritePermissions(options: any): Promise<Channel>;
		public setName(name: string): Promise<Channel>;	
	
	}

	export class TextChannel {
		constructor(client: Client, data: any);

		public topic: string;
		public type: 'text';
		public isNSFW: boolean;
		public lastMessageID: number;

		public createWebhook(options?: { name?: string, avatar: string}): Promise<any>;
		public edit(options: { name?: string, position: number, topic: string, nsfw: boolean, rate_limit_per_user: number, parent_id: Snowflake }): Promise<TextChannel>;
		public fetchMessage(messageID: Snowflake): Promise<Message>;
		public fetchMessages(options: { limit?: number, before?: number, after?: number, around?: number }): Promise<Message[]>;

	}

	export class Guild {
		constructor(data: GuildData);

		public ban(user: Snowflake, options?: { days?: number, reason?: string }): Promise<any>; // @TODO: Member
		public edit(data: GuildEditData): Promise<Guild>;
		public createChannel(options: { type: number, name: string, overwrites: any[] }): Promise<GuildChannel>;
		public fetchBans(): Promise<Array<any>>; // @TODO: Return Promise<Array<Bans>>;
		public fetchInvites(): Promise<Array<any>> // @TODO: return Invites
		public fetchMember(user: Snowflake): Promise<any> // @TODO: Member
		public fetchMembers(options: { limit: number, after?: number }): Promise<Array<any>> // @TODO: Members
		public fetchVoiceRegions(): Promise<Array<any>>; // @TODO: VoiceRegion
		public kick(user: Snowflake): Promise<any>; // @TODO: Member
		public leave(): Promise<Guild>;
		public prune(days: number): Promise<number>;
		public softban(user: Snowflake): Promise<any>; // @TODO: Member - below as well
		public unban(user: Snowflake): Promise<any>;
	}

	export class Message {
		constructor(client: Client, data: MessageData, channel: GuildChannel);

		private _client: Client;
		public readonly channel: GuildChannel;
		public readonly guild: Guild;
		public readonly createdTimestamp: MessageData['timestamp'];
		public editedTimestamp: MessageData['edited_timestamp'];
		public readonly author: any; // @TODO: User
		public content: string;
		public embeds: MessageData['embeds'];
		public readonly member: MessageData['member'];
		public mentions: MessageData['mentions'];
		public reactions: MessageData['reactions'];
		public everyone: MessageData['everyone'];
		public readonly webhookID: MessageData['webhook_id'];

		public delete(timeout?: number): Promise<Message>;
		public edit(content: string, options?: any): Promise<Message>; // @TODO: MessageEmbed

	}

	export class MessageEmbed {
		constructor(data: MessageEmbedData);

		public title: MessageEmbedData['title'];
		public description: MessageEmbedData['description'];
		public fields: MessageEmbedData['fields'];
		public url: MessageEmbedData['url'];
		public readonly timestamp: MessageEmbedData['timestamp'];
		public color: MessageEmbedData['color'];
		public footer: MessageEmbedData['footer'];
		public image: MessageEmbedData['image'];
		public thumbnail: MessageEmbedData['thumbnail'];

		public setTitle(title: string): MessageEmbed;
		public setDescription(description: string): MessageEmbed;
		public addField(name: string, value: string, inline?: boolean): MessageEmbed;
		public setAuthor(name: string, icon: string, url?: string): MessageEmbed;
		public setColor(color: number): MessageEmbed;
		public setUrl(url: string): MessageEmbed;
		public setTimestamp(timestamp: number): MessageEmbed;
		public setFooter(text: string, icon?: string): MessageEmbed;
		public setThumbnail(url: string): MessageEmbed;
	}

	export class User {
		constructor(data: UserData, client: Client);

		private _client: Client;

		public readonly isBot: boolean;
		public readonly avatar: UserData['avatar'];
		public readonly avatarURL: string | null;
		public readonly defaultAvatar: string;
		public readonly defaultAvatarURL: string;
		public readonly discriminator: string;
		public readonly id: Snowflake;
		public readonly username: string;

		public createDM(): Promise<void>;
		public send(content: string, options?: object): Message;
	}



	type UserData = {
		id: Snowflake;
		username: string;
		discriminator: string;
		bot: boolean;
		avatar?: string;
	};

	type MessageEmbedData = {
		title?: string;
		description?: string;
		fields?: Array<{name: string, value: string, inline?: boolean}>;
		url?: string;
		timestamp?: number;
		color?: number;
		footer?: string;
		image?: any;
		thumbnail?: any;
	}

	type MessageData = {
		id: Snowflake;
		timestamp: number;
		edited_timestamp: number;
		author: any; // @TODO: User
		member: any; // @TODO: Member
		mentions: Array<Snowflake>;
		reactions?: Array<any>;
		everyone: boolean;
		webhook_id: Snowflake;
		content: string;
		embeds: Array<any>;
	}

	type GuildEditData = {
		name?: string;
		region?: GuildData['region'];
		verificationLevel?: GuildData['verificationLevel'];
		afkChannelId?: Snowflake;
		systemChannelId?: Snowflake;
		afkTimeout?: GuildData['afkTimeout'];
		icon?: GuildData['icon'];
		ownerId?: Snowflake;
		splash?: string;
		explicitContentFilter?: number;
	}


	type GuildData = {
		name: string;
		ownerID: Snowflake;
		owner: any; // @TODO: User
		afkTimeout: number;
		verificationLevel: number;
		messageNotifications: number;
		large: boolean;
		lazy: boolean;
		mfaLevel: number;
		available: boolean;
		memberCount: number;
		joinedAt: Date;
		features: string[];
		id: Snowflake;
		channels: Collection<Snowflake, GuildChannel>;
		members: Collection<Snowflake, any>; // @TODO: Member
		icon?: string | null;
		splash?: string | null;
		region?: string | null;
	}

	type GuildChannelOptions = {
		maxAge?: number;
		maxUses?: number;
		temporary?: boolean;
		unique?: boolean;
	}


	type EditChannelOptions = {
		name?: string;
		position?: number;
		topic?: string;
		isNSFW?: boolean
	}

	type Snowflake = string;

	type ClientOptions = {
		disableEveryone?: boolean;
		http?: {
			version?: number;
			api?: string;
			cdn?: string;
			invite?: string;
		};
		wsOptions?: {
			fetchAllMembers?: boolean;
		};
	};
}
