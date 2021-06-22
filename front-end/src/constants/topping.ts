import {default as toppingList} from '@/assets/Topping.json';

export default class ToppingClass {
    static GetToppings(): Array<Record<string, unknown>> {
        return [...toppingList];
    }

    static GetToppingByKey(key: string): Record<string, unknown> {
        return {...toppingList.filter(x => x.key === key)[0]};
    }
}