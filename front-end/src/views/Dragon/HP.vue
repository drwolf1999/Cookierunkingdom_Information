<template>
    <div>
        <v-row>
            <v-col class="col-3 text-left">
                용 레벨
            </v-col>
            <v-col class="col-9">
                <SliderForm v-bind:min="dragonLevel.min" v-bind:max="dragonLevel.max" v-bind:current="dragonLevel.current" v-on:update="dragonLevel.current = parseInt($event)"/>
            </v-col>
        </v-row>
        <v-row>
            <v-col class="col-3 text-left">
                남은 체력 %
            </v-col>
            <v-col class="col-9">
                <SliderForm v-bind:min="percentage.min" v-bind:max="percentage.max" v-bind:current="percentage.current" v-on:update="percentage.current = parseInt($event)"/>
            </v-col>
        </v-row>
        <v-row>
            <v-col>남은 용 체력</v-col>
            <v-col>{{ Calc(-1) | ToNatural }}~{{ Calc(0) | ToNatural }}</v-col>
            <v-col>{{ Calc(-1).toLocaleString() }}~{{ Calc(0).toLocaleString() }}</v-col>
        </v-row>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import SliderForm from "@/components/SliderForm.vue";

const HPList: Array<number> = [
    // 1~10
    3000000, 3150000, 3474000, 3648000, 3830000, 4022000, 4224000, 4436000, 4658000, 4890000,
    // 11~20
    5134000, 5390000, 5660000, 5944000, 6242000, 6554000, 6882000, 7226000, 7588000, 8366000,
    // 21~30
    9224000, 10170000, 11212000, 12360000, 13626000, 15024000, 16564000, 18262000, 20134000, 22198000,
    // 31~40
    24474000, 26982000, 29748000, 32798000, 35472000, 37632000, 39922000, 42354000, 44932000, 47206000,
    // 41~50
    49114000, 50980000, 53162000, 55310000, 57262000, 58992000, 60774000, 62612000, 64506000, 66456000,
    // 51~60
    68464000, 70532000, 72664000, 74860000, 77122000, 79452000, 81854000, 84328000, 86876000, 89502000,
    // 61~70
    92206000, 94994000,
]

export default Vue.extend({
    name: 'CalculatorDragonHP',

    props: {},

    components: {
        SliderForm
    },

    data: () => {
        return {
            dragonLevel: {
                min: 1,
                max: HPList.length,
                current: 1,
            },
            percentage: {
                min: 0,
                max: 100,
                current: 0,
            }
        };
    },

    computed: {},
    methods: {
        Calc(v: number): number {
            const cHP = HPList[this.dragonLevel.current - 1];
            let mul = (this.percentage.current + v);
            if (mul < 0) mul = 0;
            let ret = cHP * mul / 100;
            if (v === -1 && mul > 0) ret = ret + 1;
            return ret;
        }
    },
    filters: {
        ToNatural(v: number) {
            let k = v / 10000;
            k = Math.round(k);
            return `${k}만`;
        }
    }
})
</script>