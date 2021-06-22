<template>
    <div>
        <v-row v-for="(i, indexI) in ToppingIterCount(3)" :key="`lg_row_${i}`" class="d-none d-lg-flex">
            <v-col class="col-4" v-for="(j, indexJ) in 3" :key="`lg_col_${j}`">
                <ToppingView v-if="(3 * indexI + indexJ) < ToppingCount" img-size="middle" :topping-key="Toppings[3 * indexI + indexJ].key"/>
            </v-col>
        </v-row>

        <v-row v-for="(i, indexI) in ToppingIterCount(2)" :key="`md_row_${i}`" class="d-none d-lg-none d-md-flex">
            <v-col class="col-6" v-for="(j, indexJ) in 2" :key="`md_col_${j}`">
                <ToppingView v-if="(2 * indexI + indexJ) < ToppingCount" img-size="middle" :topping-key="Toppings[2 * indexI + indexJ].key"/>
            </v-col>
        </v-row>

        <v-row v-for="topping in Toppings" :key="`small_${topping.key}`" class="d-lg-none d-md-none">
            <v-col class="col-12">
                <ToppingView img-size="middle" :topping-key="topping.key"/>
            </v-col>
        </v-row>
    </div>
</template>
<script lang="ts">
import ToppingClass from "@/constants/topping.ts";
import Vue from "vue";
import ToppingView from "@/components/ToppingView.vue";

export default Vue.extend({
    name: 'ToppingIndex',
    components: {ToppingView},
    methods: {
        ToppingIterCount(split: number): number {
            let ret = ToppingClass.GetToppings().length;
            ret = (ret + split - 1) / split;
            ret = Math.floor(ret);
            return ret;
        },
    },
    computed: {
        Toppings(): Array<Record<string, unknown>> {
            return ToppingClass.GetToppings();
        },
        ToppingCount(): number {
            return ToppingClass.GetToppings().length;
        }
    }
})
</script>