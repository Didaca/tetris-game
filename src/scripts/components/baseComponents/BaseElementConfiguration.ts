import { injectable } from "tsyringe";
import { IElementConfiguration } from "../../interfaces/IElementConfiguration";

injectable()
export class BaseElementConfiguration {
    protected _config: IElementConfiguration = {
            elementHeight: 2,
            elementLenght: 3,
            position: 1,
            startPosition: 8,
            stoped: false,
        }
}