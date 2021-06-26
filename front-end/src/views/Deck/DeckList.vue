<template>
    <v-row class="mt-7" v-if="ValidConnection">
        <v-col lg="3" xl="3" md="3" cols="12">
            <CookieList v-on:element-select="AddIncludeCookie($event)"/>

            <v-card tile>
                <v-card-subtitle>포함할 쿠키</v-card-subtitle>
                <v-card-title>
                    <Cookie class="ml-1" v-for="c in includeCookies" :key="c" img-size="small" :cookie-key="c" @click.native="Delete(c)"/>
                </v-card-title>
            </v-card>
        </v-col>
        <v-col lg="9" xl="9" md="9" cols="12">
            <v-row>
                <v-spacer></v-spacer>
                <v-btn class="hidden-sm-and-down" color="success" @click="$router.push(`/deck/write?mode=${mode}`)">덱 추천 해주기</v-btn>
            </v-row>
            <div class="mt-7">
                <v-expansion-panels v-if="!loading && decks.length > 0">
                    <Deck class="mb-2" v-for="(deck, index) in decks" :key="index" :deck="deck"/>
                </v-expansion-panels>
                <v-card v-else-if="!loading" tile class="pa-3">
                    <v-card-text>아직 추천 덱이 없습니다..</v-card-text>
                </v-card>
                <v-skeleton-loader v-else class="mx-auto" type="card"></v-skeleton-loader>
            </div>
            <v-btn class="hidden-md-and-up" block color="success" @click="$router.push(`/deck/write?mode=${mode}`)">덱 추천 해주기</v-btn>
        </v-col>
    </v-row>
    <div v-else>
        올바른 접속이 아닙니다.
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Deck from "@/components/Deck.vue";
import CookieList from "@/components/CookieList.vue";

import DeckService from "@/service/deck";
import Cookie from "@/components/Cookie.vue";

export default Vue.extend({
    name: 'DeckList',

    components: {
        Cookie,
        CookieList,
        Deck,
    },

    props: {
        mode: {
            type: String,
            default: 'story',
        }
    },

    mounted() {
        this.FetchDeck();
    },

    data(): { decks: string[], loading: boolean, includeCookies: string[] } {
        return {
            decks: [],
            loading: false,
            includeCookies: [],
        }
    },
    methods: {
        FetchDeck() {
            this.loading = true;
            DeckService.GetDecks({
                mode: this.mode,
                include: this.includeCookies,
            }).then(response => {
                this.loading = false;
                this.decks = response.data.decks;
            })
        },
        AddIncludeCookie(cookie: string) {
            if (this.includeCookies.indexOf(cookie) > -1) return;
            if (this.includeCookies.length >= 5) return;
            this.includeCookies.push(cookie);
            this.FetchDeck();
        },
        Delete(e: string) {
            const idx = this.includeCookies.indexOf(e);
            if (idx > -1) {
                this.includeCookies.splice(idx, 1);
                this.FetchDeck();
            }
        }
    },
    computed: {
        ValidConnection(): boolean {
            const validMode: string[] = ['story', 'arena', 'guild'];
            const mode = this.mode;
            return validMode.indexOf(mode) !== -1;
        },
    },
    watch: {
        $route: function () {
            this.FetchDeck();
        }
    }
})
</script>