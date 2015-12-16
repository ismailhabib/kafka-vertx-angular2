/// <reference path='../../typings/tsd.d.ts' />

import {bootstrap, Component, View } from 'angular2/angular2';
import {SocketService} from './sockService';
//import {EventBus} from 'eventbus';

@Component({
    selector: 'my-app',
    //viewBindings: [],
    providers: [SocketService]
})
@View({
    template: `<div class="news">Stages</div>
<br>
<form action="">
    <input id="CreateProject" type="checkbox" name="stages" value="Modeler" [checked]="isCreateProject" (click)="toggleCreateProject()">Create Project<br>
    <input id="PostMessage" type="checkbox" name="stages" value="Invite" [checked]="isPostMessage">Post Message<br>
    <input id="Invite" type="checkbox" name="stages" value="Invite" [checked]="isInviteTeamMember">Invite Team Members<br>
    <input id="CreateStory" type="checkbox" name="stages" value="Invite" [checked]="isCreateStory">Create Story<br>
    <input id="Commit" type="checkbox" name="stages" value="Invite" [checked]="isCommit">Commit<br>
</form>`
})
export class AppComponent {
    isCreateProject = false;
    isInviteTeamMember = false;
    isPostMessage = false;
    isCreateStory = false;
    isCommit = false;
    constructor(sockSvc: SocketService) {
        sockSvc.initListeners((err, msg) => {
            var object = JSON.parse(msg.body);
            console.log(msg);

            if (object.Payload.EventType === 'ProjectCreated') {
                this.isCreateProject = true;
            } else if (object.Payload.EventType === 'ProjectInviteSent') {
                this.isInviteTeamMember = true;
            } else if (object.Payload.EventType === 'MessagePosted') {
                this.isPostMessage = true;
            } else if (object.Payload.EventType === 'StoryCreated') {
                this.isCreateStory = true;
            } else if (object.Payload.EventType === 'TeamserverCommit') {
                this.isCommit = true;
            }
        });
    }
    
    toggleCreateProject() {
        console.log(`toggle create project`);
        //this.isCreateProject = !this.isCreateProject;
    }
}

bootstrap(AppComponent, [SocketService]);

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

