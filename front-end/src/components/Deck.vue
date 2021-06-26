<template>
    <v-expansion-panel>
        <v-expansion-panel-header>
            <v-row align="center" class="hidden-md-and-down">
                <v-col class="col-md-2 col-sm-1 text-center">
                    <div :class="`tier__${deck.tier}`"><span>{{ deck.tier }}</span></div>
                </v-col>
                <v-col class="col-md-3 col-sm-1">
                    {{ deck.name }}
                </v-col>
                <v-col class="col-md-7 col-sm-10">
                    <DeckPreview :deck="CookieKeyList(deck.units)" img-size="big"/>
                </v-col>
            </v-row>
            <div class="hidden-lg-and-up hidden-xs-only">
                <v-row align="center">
                    <v-col cols="3" class="text-center">
                        <div :class="`tier__${deck.tier}`"><span>{{ deck.tier }}</span></div>
                    </v-col>
                    <v-col cols="9">
                        {{ deck.name }}
                    </v-col>
                </v-row>
                <v-row align="center">
                    <v-col>
                        <DeckPreview :deck="CookieKeyList(deck.units)" img-size="small"/>
                    </v-col>
                </v-row>
            </div>
            <div class="d-flex d-sm-none">
                <v-row align="center">
                    <v-col cols="3" class="text-center">
                        <div :class="`tier__${deck.tier}`"><span>{{ deck.tier }}</span></div>
                    </v-col>
                    <v-col cols="9">
                        {{ deck.name }}
                    </v-col>
                    <v-col cols="12">
                        <DeckPreview :deck="CookieKeyList(deck.units)" img-size="xs"/>
                    </v-col>
                </v-row>
            </div>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
            <v-row v-for="(unit, indexI) in deck.units" :key="`lg_xl_${indexI}`" class="mb-3 ml-5 hidden-md-and-down" align="center">
                <v-col cols="2">
                    <Cookie v-bind:cookie-key="unit.cookie" v-bind:img-size="`middle`"/>
                </v-col>
                <v-col cols="6" class="d-inline-block">
                    <Topping
                        v-for="(topping, indexJ) in unit.topping" :key="`lg_index_${indexJ}`"
                        class="float-left"
                        v-bind:topping-key="topping"
                        v-bind:img-size="`small`"
                    />
                </v-col>
                <v-col cols="4" class="text-right">
                    {{ unit.comment }}
                </v-col>
            </v-row>

            <div v-for="(unit, indexI) in deck.units" :key="`sm_md_${indexI}`" class="mb-3 ml-5 hidden-lg-and-up">
                <v-row justify="center" align="center">
                    <v-col cols="3">
                        <Cookie v-bind:cookie-key="unit.cookie" v-bind:img-size="`small`"/>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col cols="9" class="text-right">
                        {{ unit.comment }}
                    </v-col>
                </v-row>
                <v-row>
                    <Topping
                        v-for="(topping, indexJ) in unit.topping" :key="`sm_index_${indexJ}`"
                        class="float-left"
                        v-bind:topping-key="topping"
                        v-bind:img-size="`small`"
                    />
                </v-row>

            </div>
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
                ret.push(v[i].cookie);
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