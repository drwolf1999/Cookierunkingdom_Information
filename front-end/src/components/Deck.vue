<template>
    <v-expansion-panel>
        <v-expansion-panel-header>
            <v-row align="center" justify="center">
                <v-col class="col-md-2 col-sm-1 text-center">
                    <div :class="`tier__${deck.tier}`"><span>{{ deck.tier }}</span></div>
                </v-col>
                <v-col class="col-md-3 col-sm-1">
                    {{ deck.name }}
                </v-col>
                <v-col class="col-md-7 col-sm-10">
                    <DeckPreview :deck="CookieKeyList(deck.units)"/>
                </v-col>
            </v-row>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
            <v-row v-for="(unit, indexI) in deck.units" :key="indexI" class="mb-3 ml-5">
                <Cookie v-bind:cookie-key="unit.name" v-bind:img-size="`small`"/>
                <Topping
                    v-for="(topping, indexJ) in unit.topping" :key="`index_${indexJ}`"
                    v-bind:topping-key="topping"
                    v-bind:img-size="`small`"
                />
            </v-row>
        </v-expansion-panel-content>
    </v-expansion-panel>
</template>

<script lang="ts">
import Vue from 'vue';
import Cookie from "@/components/Cookie.vue";
import Topping from "@/components/Topping.vue";
import DeckPreview from "@/components/DeckPreview.vue";

export default Vue.extend({
    name: 'Deck',

    props: {
        deck: {
            type: Object,
        }
    },

    components: {
        DeckPreview,
        Topping,
        Cookie,
    },

    data: () => {
        return {};
    },
    methods: {
        CookieKeyList(v: Array<any>): string[] {
            let ret: string[] = [];
            let Size = v.length;
            for (let i = 0; i < Size; i++) {
                ret.push(v[i].name);
            }
            return ret;
        }
    }
})
</script>

<style>
.tier__S {
    background: red;
}

.tier__A {
    background: darkred;
}

.tier__B {
    background: deepskyblue;
}

.tier__C {
    background: grey;
}

.tier__S, .tier__A, .tier__B, .tier__C {
    display: table;
    width: 50px;
    height: 50px;
    text-align: center;
    border-radius: 10px;
    color: white;
}

*[class^='tier__'] > span, *[class*=' tier__'] > span {
    vertical-align: middle;
    display: table-cell;
}
</style>