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
var angular2_1 = require('angular2/angular2');
var sockService_1 = require('./sockService');
//import {EventBus} from 'eventbus';
var AppComponent = (function () {
    function AppComponent(sockSvc) {
        var _this = this;
        this.isCreateProject = false;
        this.isInviteTeamMember = false;
        this.isPostMessage = false;
        this.isCreateStory = false;
        this.isCommit = false;
        sockSvc.initListeners(function (err, msg) {
            var object = JSON.parse(msg.body);
            console.log(msg);
            if (object.Payload.EventType === 'ProjectCreated') {
                _this.isCreateProject = true;
            }
            else if (object.Payload.EventType === 'ProjectInviteSent') {
                _this.isInviteTeamMember = true;
            }
            else if (object.Payload.EventType === 'MessagePosted') {
                _this.isPostMessage = true;
            }
            else if (object.Payload.EventType === 'StoryCreated') {
                _this.isCreateStory = true;
            }
            else if (object.Payload.EventType === 'TeamserverCommit') {
                _this.isCommit = true;
            }
        });
    }
    AppComponent.prototype.toggleCreateProject = function () {
        console.log("toggle create project");
        //this.isCreateProject = !this.isCreateProject;
    };
    AppComponent = __decorate([
        angular2_1.Component({
            selector: 'my-app',
            //viewBindings: [],
            providers: [sockService_1.SocketService]
        }),
        angular2_1.View({
            template: "<div class=\"news\">Stages</div>\n<br>\n<form action=\"\">\n    <input id=\"CreateProject\" type=\"checkbox\" name=\"stages\" value=\"Modeler\" [checked]=\"isCreateProject\" (click)=\"toggleCreateProject()\">Create Project<br>\n    <input id=\"PostMessage\" type=\"checkbox\" name=\"stages\" value=\"Invite\" [checked]=\"isPostMessage\">Post Message<br>\n    <input id=\"Invite\" type=\"checkbox\" name=\"stages\" value=\"Invite\" [checked]=\"isInviteTeamMember\">Invite Team Members<br>\n    <input id=\"CreateStory\" type=\"checkbox\" name=\"stages\" value=\"Invite\" [checked]=\"isCreateStory\">Create Story<br>\n    <input id=\"Commit\" type=\"checkbox\" name=\"stages\" value=\"Invite\" [checked]=\"isCommit\">Commit<br>\n</form>"
        }), 
        __metadata('design:paramtypes', [sockService_1.SocketService])
    ], AppComponent);
    return AppComponent;
})();
exports.AppComponent = AppComponent;
angular2_1.bootstrap(AppComponent, [sockService_1.SocketService]);
//OLD CODE
// import {bootstrap, Component, View } from 'angular2/angular2';
// import {SocketService} from './sockService';
// //import {EventBus} from 'eventbus';
// @Component({
//     selector: 'my-app',
//     //viewBindings: [],
//     providers: [SocketService]
// })
// @View({
//     template: '<h1>Event Bus Consumer Example: {{message.body}}</h1>'
// })
// export class AppComponent {
//     message = { body: `Initial Message` };
//     constructor(sockSvc: SocketService) {
//         sockSvc.initListeners((err, msg) => {
//             console.dir(msg.body);
//             this.setMsg(msg.body);
//         });
//     }
//     setMsg(text: string) {
//         this.message.body = text;
//     }
// }
// bootstrap(AppComponent, [SocketService]);
//# sourceMappingURL=app.js.map