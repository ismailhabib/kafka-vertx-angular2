interface EventBus {
	onopen: () => void;
	registerHandler: (topic: string, callback: (err: string, msg: string) => void) => void;
}

declare var EventBus: {
	new (m: string): EventBus;
}

// declare module "vertx-eventbus" {

// 	interface A_EventBus {

// 		new (m: string): A_EventBus;
// 		onopen: () => void;
// 		registerHandler: (topic: string, callback: (err: string, msg: string) => void) => void;

// 	}

// 	export var EventBus: A_EventBus;
// }
