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


		/**
     		* Creates an ordered array of the keys of this collection, and caches it internally. The array will only be
	        * reconstructed if an item is added to or removed from the collection, or if you change the length of the array
    	        * itself. If you don't want this caching behavior, use `[...collection.keys()]` or
    	        * `Array.from(collection.keys())` instead.
		*/
		public keyArray(): K[];

	        /**
		 * Obtains the first value(s) in this collection.
                 * @param {number} [count] Number of values to obtain from the beginning
		 */
		public first(count?: number): Array<any>;
		
		public every(fn: void, thisArg?: any): any;

		public firstKey(count?: number): any;

		public lastKey(count?: number): any;

		
	       /**
     		* Searches for a single item where its specified property's value is identical to the given value
     		* (`item[prop] === value`), or the given function returns a truthy value. In the latter case, this is identical to
     		* [Array.find()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find).
		* <warn>All collections used in Discord.js are mapped using their `id` property, and if you want to find by id you
		* should use the `get` method. See
		* [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/get) for details.</warn>
		*  @param {string|Function} propOrFn The property to test against, or the function to test with
		*  @param {*} [value] The expected value - only applicable and required if using a property for the first argument
		*  @returns {*}
		*  @example
		*  collection.find('username', 'Bob');
	   	* @example
	   	* collection.find(val => val.username === 'Bob');
	        */
		public find(propOrFunc: string | void, value?: any): any;


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
