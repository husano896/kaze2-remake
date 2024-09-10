import { Injector } from "@angular/core";
import { DialogueComponent } from "../pages/game/dialogue/dialogue.component";
import { delay, firstValueFrom, of, timer } from "rxjs";

export async function Opening(component: DialogueComponent) {
    component.setBG('welcome')
    component.setDragonCG('nomal01');
    component.setDragonCGOpticity(1);
}