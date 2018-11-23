// Typings for YAJDBL
// Typings Author: Zoro <admin@zoro.tech>
// License: MIT

declare module 'YAJDBL' {
	


	export class Client extends ConnectionHandler {
		constructor(options?: ClientOptions);
	
		public token: string;

		public channels: Collection;
		public guilds: Collection;
		public users: Colletion;


		public client: Client;
		public disableEveryone: ClientOptions.disableEveryone;

		public http: ClientOptions.http;

		public wsOptions: ClientOptions.wsOptions;

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


	       /**
     	        * Creates an ordered array of the values of this collection, and caches it internally. The array will only be
                * reconstructed if an item is added to or removed from the collection, or if you change the length of the array
                * itself. If you don't want this caching behavior, use `[...collection.values()]` or
                * `Array.from(collection.values())` instead.
                */				
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

		public createWebhook(options?: { name? string, avatar: string}): Promise<any>;

		public edit(options: { name?: string, position: number, topic: string, nsfw: boolean, rate_limit_per_user: number, parent_id: number|string }): Promise<TextChannel>;
	
		public fetchMessage(messageID: number | string): Promise<any>; // @TODO: returns Promise<Message>

		public fetchMessages(options: { limit?: number, before?: number, after?: number, around?: number }): Promise<Array<any>> // @TODO: Message instead of any.
			
	}


	type GuildChannelOptions = {
		maxAge?: number,
		maxUses?: number,
		temporary?: boolean,
		unique?: boolean
	}


	type EditChannelOptions = {
		name?: string;
		position?: number;
		topic?: string;
		isNSFW?: boolean
	}

	type ClientOptions = {
		disableEveryone?: boolean,
		http?: {
			version?: number,
			api?: string,
			cdn?: string,
			invite?: string
		},
		wsOptions?: {
			fetchAllMembers?: boolean
		}
	};
}
