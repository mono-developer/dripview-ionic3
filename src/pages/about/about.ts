import {Component} from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {InAppBrowser} from '@ionic-native/in-app-browser';
import {Platform} from 'ionic-angular';
import {ToastProvider} from '../../providers/toast/toast';
import {ToolProvider} from '../../providers/tool/tool';

declare var chcp;

@IonicPage({
    name: 'about',
})
@Component({
    selector: 'page-about',
    templateUrl: 'about.html',
})
export class AboutPage {
    public qqQunUrl: string = '';
    public isUpdate: boolean = false;
    public isInstall: boolean = false;

    public appVersion: string = '--';
    public webVersion: string = '--';

    constructor(public navCtrl: NavController,
                private loadingCtrl: LoadingController,
                public navParams: NavParams,
                private iab: InAppBrowser,
                private toastProvier: ToastProvider,
                private toolProvider: ToolProvider,
                private alertCtrl: AlertController,
                public platform: Platform) {

        if (this.platform.is('ios')) {
            this.qqQunUrl = 'mqqapi://card/show_pslcard?src_type=internal&version=1&uin=7852084&key=ae5495ce139b42cc872fdd0da42fc3e6527731aa040ae569fa17ba6e17edd531&card_type=group&source=external';
        } else if (this.platform.is('android')) {
            this.qqQunUrl = 'mqqopensdkapi://bizAgent/qm/qr?url=http%3A%2F%2Fqm.qq.com%2Fcgi-bin%2Fqm%2Fqr%3Ffrom%3Dapp%26p%3Dandroid%26k%3D65XQJ2wNSi1AwllnyzOvIVQKO8rcgTtZ';
        } else {
            this.qqQunUrl = 'http://shang.qq.com/wpa/qunwpa?idkey=ae5495ce139b42cc872fdd0da42fc3e6527731aa040ae569fa17ba6e17edd531';
        }
    }

    ionViewDidLoad() {

        if (this.platform.is('cordova')) {

            chcp.getVersionInfo((err, data) => {

                console.log(err);
                console.log(data);

                if (data.currentWebVersion) {
                    this.webVersion = data.currentWebVersion.replace(/-/g, '');
                    this.webVersion = this.webVersion.replace(/\./g, '');
                }

                this.appVersion = data.appVersion;

                //请求服务器版本
                this.toolProvider.checkUpdate(data.appVersion, this.webVersion).then((res) => {
                    if (res) {
                        let confirm = this.alertCtrl.create({
                            title: '发现新版本，是否更新?',
                            message: data.message,
                            buttons: [
                                {
                                    text: '取消',
                                    handler: () => {
                                        console.log('Disagree clicked');
                                    }
                                },
                                {
                                    text: '确认',
                                    handler: () => {
                                        alert(res.type);
                                        if (res.type == 1) {
                                            let loading = this.loadingCtrl.create({
                                                content: '正在下载和安装更新包，安装结束后会自动重启APP...'
                                            });

                                            loading.present();

                                            setTimeout(() => {
                                                loading.dismiss();
                                            }, 5000);

                                            chcp.isUpdateAvailableForInstallation((error, data) => {
                                                if (error) {
                                                    console.log('未发现安装包，开始向服务器请求..');
                                                    chcp.fetchUpdate((error, data) => {
                                                        if (error) {
                                                            console.log('加载更新失败: ' + error.code);
                                                            console.log(error.description);
                                                            return;
                                                        }
                                                        console.log('更新已加载');
                                                    });
                                                    return;
                                                }

                                                console.log('当前版本: ' + data.currentVersion);
                                                console.log('最新版本: ' + data.readyToInstallVersion);

                                                chcp.installUpdate((error) => {
                                                    if (error) {
                                                        console.log('安装更新失败: ' + error.code);
                                                        console.log(error.description);
                                                    } else {
                                                        console.log('更新已安装!');
                                                    }
                                                },);

                                                // this.isUpdate = true;
                                                // this.isInstall = true;
                                            });

                                        } else if (res.type == 2) { //跳转更新
                                            this.iab.create("http://a.app.qq.com/o/simple.jsp?pkgname=me.growu.drip", '_blank', 'toolbar=yes');
                                        }
                                    }
                                }
                            ]
                        });
                        confirm.present();
                    }
                }).catch((err) => {

                });


            });


        }

    }

    openUrl(url: string) {
        this.iab.create(url, '_blank', 'toolbar=yes');
    }

    doUpdate() {

        if (this.isInstall) {
            chcp.installUpdate((error) => {
                if (error) {
                    console.log('安装更新失败: ' + error.code);
                    console.log(error.description);
                } else {
                    console.log('更新已安装!');
                }
            },);
        }
    }

    copyCallback() {
        this.toastProvier.show("公众号已复制到剪贴板", 'success');
    }

}
