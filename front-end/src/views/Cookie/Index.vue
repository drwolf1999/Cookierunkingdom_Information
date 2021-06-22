<template>
    <div>
        <v-row>
            <v-col class="col-3">
                <CookieList img-size="middle" :selected="selectedCookie" v-on:element-select="selectedCookie = $event"/>
            </v-col>
            <v-col class="col-9">
                <v-card :class="SelectedCookie.tier">
                    <v-card-title>{{ SelectedCookie.name }}맛 쿠키</v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>
                        <v-row>
                            <v-col>스킬</v-col>
                        </v-row>
                        <v-row class="pa-2 new__line" :class="`${SelectedCookie.tier}__sub`">
                            <v-col>{{ SelectedCookie.description }}</v-col>
                        </v-row>
                        <v-row>
                            <v-col>등급</v-col>
                            <v-divider vertical></v-divider>
                            <v-col>역할</v-col>
                        </v-row>
                        <v-row class="pa-2" :class="`${SelectedCookie.tier}__sub`">
                            <v-col>{{ SelectedCookie.tier }}</v-col>
                            <v-divider vertical></v-divider>
                            <v-col>{{ SelectedCookie.type }}</v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
                <v-card class="mt-5">
                    <v-card-subtitle>추천 토핑</v-card-subtitle>
                    <v-card-text>
                        <div class="d-inline-block pa-1" style="width: 100%;">
                            <div class="float-left ma-1" v-for="topping in goodTopping" :key="topping">
                                <Topping :topping-key="topping" img-size="small"/>
                            </div>
                        </div>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import CookieList from "@/components/CookieList.vue";
import CookieClass from "@/constants/cookie";
import Topping from "@/components/Topping.vue";

export default Vue.extend({
    name: 'Cookies',

    props: {},

    components: {
        Topping,
        CookieList
    },

    data: () => {
        return {
            selectedCookie: 'Vampire',
            goodTopping: [
                'Raspberry',
                'Chocolatechip'
            ]
        };
    },

    computed: {
        SelectedCookie() {
            return CookieClass.GetCookieByKey(this.selectedCookie);
        }
    },
    methods: {},
    filters: {}
})
</script>