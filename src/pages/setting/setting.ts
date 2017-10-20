import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {AppRate} from '@ionic-native/app-rate';
import {Storage} from '@ionic/storage';
import {ToastProvider} from '../../providers/toast/toast';

@IonicPage({
    name: "setting"
})
@Component({
    selector: 'page-setting',
    templateUrl: 'setting.html',
})
export class SettingPage {
    public user: any = {};

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public storage: Storage,
                public toastProvider: ToastProvider,
                private appRate: AppRate) {
    }

    ionViewDidLoad() {
        this.storage.get('user').then((data) => {
            this.user = data;
        });
    }

    goPage(name: string) {
        this.navCtrl.push(name);
    }

    clearCache() {
        this.toastProvider.show("清理成功", 'success');
    }

    goAppRate() {
        this.appRate.preferences = {
            storeAppURL: {
                ios: '1255579223',
                android: 'market://details?id=me.growu.drip',
                windows: 'ms-windows-store://review/?ProductId=me.growu.drip'
            },
            customLocale: {
                title: "为水滴评分评分",
                message: "请你对我们的程序作出评分，这将不会占用太长的时间。",
                cancelButtonLabel: "取消评分",
                laterButtonLabel: "再等等",
                rateButtonLabel: "立即评分",
                yesButtonLabel: "很喜欢!",
                noButtonLabel: "不是很喜欢",
                appRatePromptTitle: '喜欢 水滴打卡 吗？',
                feedbackPromptTitle: '是否愿意给予我们一些建议，以帮助我们更好地改进？',
            },
        };

        this.appRate.promptForRating(true);
    }

}
