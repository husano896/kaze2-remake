import { Injector } from "@angular/core";
import { DialogueComponent } from "../pages/game/dialogue/dialogue.component";

export async function Ending1(component: DialogueComponent) {
    component.appServ.setBGM('victim')
    component.setBG('welcome')
    await component.appServ.fadeIn();
    console.log('runev')
}