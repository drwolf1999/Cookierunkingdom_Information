<template>
    <v-row class="mt-7" v-if="ValidConnection">
        <v-col class="col-3">
            <CookieList/>
        </v-col>
        <v-col class="col-9">
            <v-row>
                <v-spacer></v-spacer>
                <v-btn color="success" @click="$router.push(`/deck/write?mode=${mode}`)">새로운 덱 추천</v-btn>
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

export default Vue.extend({
    name: 'DeckList',

    components: {
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

    data() {
        return {
            decks: [],
            loading: false,
        }
    },
    methods: {
        FetchDeck() {
            this.loading = true;
            DeckService.GetDecks(this.mode).then(response => {
                this.loading = false;
                this.decks = response.data.decks;
            })
        },
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