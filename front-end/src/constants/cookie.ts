import {default as cookieList} from '@/assets/Cookie.json';

export default class CookieClass {
    static GetCookies(): any {
        let ret = [...cookieList];
        const tierOrder = ['legendary', 'ancient', 'epic', 'rare', 'common'];
        ret = ret.sort(function (a, b) {
            return tierOrder.indexOf(a.tier) - tierOrder.indexOf(b.tier);
        });
        return ret;
    }

    static GetCookieByKey(key: string): any {
        return {...cookieList.filter(x => x.key === key)[0]};
    }

    static OrderForDeck(a: string, b: string): number {
        const order = ['Front', 'Middle', 'Rear'];
        let ret = order.indexOf(this.GetCookieByKey(a).position) - order.indexOf(this.GetCookieByKey(b).position);
        if (ret === 0) {
            ret = a.localeCompare(b);
        }
        return ret;
    }
}