import {MyShareComponent} from './my-share.component';
import {App, NavOptions, ViewController} from "ionic-angular";
import {MyShareOptions} from "./my-share.options";

// import { Config } from '../../config/config';
// import { isPresent } from '../../util/util';
// import { NavOptions } from '../../navigation/nav-util';
// import { ViewController } from '../../navigation/view-controller';


export class MyShare extends ViewController {
    private _app: App;

    constructor(app: App, opts: MyShareOptions) {
        super(MyShareComponent, opts, null);
        this._app = app;
    }

    present(navOptions: NavOptions = {}): Promise<any> {
        let opts = {
            direction: "Enter",
        };
        return this._app.present(this, opts);
    }

    /**
     * @hidden
     */
    getTransitionName(direction: string): string {
        const key = 'actionSheet' + (direction === 'back' ? 'Leave' : 'Enter');
        return this._nav && this._nav.config.get(key);
    }
}