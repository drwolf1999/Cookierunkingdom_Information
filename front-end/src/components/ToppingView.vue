<template>
    <v-card outlined tile class="pa-1 my-2 align-center">
        <v-row align="center" class="pa-3 mt-2" justify="center">
            <v-col class="text-center">
                <v-row align="center" justify="center">
                    <Topping :img-size="imgSize" :topping-key="toppingKey"/>
                </v-row>
                <v-row align="center" justify="center"> {{ Topping.name }}
                </v-row>
            </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row align="center" class="pa-3 text-center">
            <v-col class="col-3">
                설명
            </v-col>
            <v-divider vertical></v-divider>
            <v-col class="col-9">
                {{ Topping.description }}
            </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row align="center" class="pa-3 text-center" justify="center">
            <v-col>
                <v-row>
                    <v-col>3세트 옵션</v-col>
                    <v-divider vertical></v-divider>
                    <v-col>5세트 옵션</v-col>
                </v-row>
                <v-divider class="my-3"></v-divider>
                <v-row>
                    <v-col>{{ Topping.firstOption }}</v-col>
                    <v-divider vertical></v-divider>
                    <v-col>{{ Topping.secondOption }}</v-col>
                </v-row>
            </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row align="center" class="pa-3 text-center" justify="center">
            <v-col>
                <v-row>
                    <v-col>초기 계수</v-col>
                    <v-divider vertical></v-divider>
                    <v-col>강화 계수</v-col>
                </v-row>
                <v-divider class="my-3"></v-divider>
                <v-row>
                    <v-col>{{ Topping.default }}%</v-col>
                    <v-divider vertical></v-divider>
                    <v-col>+ {{ Topping.upgrade }}%</v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import ToppingClass from "@/constants/topping.ts";
import Topping from "@/components/Topping.vue";

export default Vue.extend({
    name: 'ToppingView',
    data() {
        return {};
    },
    components: {Topping,},
    props: {
        toppingKey: {
            type: String,
            default: '',
        },
        imgSize: {
            type: String,
            default: 'small',
        }
    },
    computed: {
        Topping(): Record<string, unknown> {
            return ToppingClass.GetToppingByKey(this.toppingKey);
        },
    }
})
</script>