import {default as treasureList} from '@/assets/Treasure.json';

export default class TreasureClass {
    static GetTreasures(): Array<Record<string, unknown>> {
        return [...treasureList];
    }

    static GetTreasureByKey(key: string): Record<string, unknown> {
        return {...treasureList.filter(x => x.key === key)[0]};
    }
}