/// <reference path='../../typings/tsd.d.ts' />

import {Injectable} from 'angular2/core'
//import {EventBus} from 'vertx-eventbus'

@Injectable()
export class SocketService {
    
    constructor() {
    };

    initListeners(callback: (err,msg) => void) {
        console.log(`Initialize`);
        var eb = new EventBus(`http://localhost:8082/eventbus`);

        eb.onopen = function() {
            eb.registerHandler(`news-feed`, callback);
        }
    }
}
