import { TextCenter } from "./cTextCenter";


export class Pause extends TextCenter {
    readonly x: number = 220; //225

    constructor(txt: string) {
        super(txt)
        this.text.anchor.set(0.5);
        this.text.x = this.x;
    }
}