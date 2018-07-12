import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import * as moment from 'moment'

@IonicPage({
    name: 'goal-create-date'
})
@Component({
    selector: 'page-goal-create-date',
    templateUrl: 'goal-create-date.html',
})
export class GoalCreateDatePage {

    public date_type = 1;
    public start_date = null;
    public end_date = null;

    public color = "primary";

    public expect_days = 0;
    public min: string = moment().format('YYYY-MM-DD');
    public max: string = moment().add(10, 'years').format('YYYY-MM-DD');

    constructor(public navCtrl: NavController,
                private viewCtrl: ViewController,
                public navParams: NavParams) {

        if (this.navParams.get('date_type')) {
            this.date_type = this.navParams.get('date_type');
        }

        if (this.navParams.get('start_date')) {
            this.date_type = this.navParams.get('start_date');
        }

        if (this.navParams.get('end_date')) {
            this.date_type = this.navParams.get('end_date');
        }

        if (this.navParams.get('color')) {
            this.color = this.navParams.get('color');
        }

    }

    ionViewDidLoad() {
    }

    getDays() {
        var a = moment(this.start_date);
        var b = moment(this.end_date);
        return b.diff(a, 'days') + 1;
    }

    // 日期修改监听
    onDateChange() {
        if (this.end_date < this.start_date) {
            this.end_date = this.start_date;
        }

        if (this.expect_days == 0 || this.expect_days > this.getDays()) {
            this.expect_days = this.getDays();
        }
    }

    // 日期类型切换监听
    onDateTypeChnage($event) {

        if ($event == 2) {
            this.start_date = this.min;
            this.end_date = moment().add(20, 'days').format('YYYY-MM-DD');
            this.expect_days = 21;
        }
    }

    cancel() {
        this.viewCtrl.dismiss();
    }

    save() {
        let data = {
            date_type: this.date_type,
            start_date: this.start_date,
            end_date: this.end_date,
            expect_days:this.expect_days,
        }

        this.viewCtrl.dismiss(data);
    }

}
