import {default as treasureList} from '@/assets/Treasure.json';
import ITreasure from "@/interface/treasure";

export default class TreasureClass {
    static GetTreasures(): Array<ITreasure> {
        return [...treasureList];
    }

    static GetTreasureByKey(key: string): ITreasure {
        return {...treasureList.filter(x => x.key === key)[0]};
    }
}