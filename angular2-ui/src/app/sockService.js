/// <reference path='../../typings/tsd.d.ts' />
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
//import {EventBus} from 'vertx-eventbus'
var SocketService = (function () {
    function SocketService() {
    }
    ;
    SocketService.prototype.initListeners = function (callback) {
        console.log("Initialize");
        var eb = new EventBus("http://localhost:8082/eventbus");
        eb.onopen = function () {
            eb.registerHandler("news-feed", callback);
        };
    };
    SocketService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], SocketService);
    return SocketService;
})();
exports.SocketService = SocketService;
//# sourceMappingURL=sockService.js.map