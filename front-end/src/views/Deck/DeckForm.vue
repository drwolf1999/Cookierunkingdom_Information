<template>
    <div v-if="ValidConnection">
        <v-alert type="info" dismissible>
            쿠키를 클릭하여 덱에 추가해보세요.
            <br>
            추가한 쿠키를 다시 클릭하면 덱에서 제거됩니다.
            <br>
            덱 정렬기준은 실제 게임과 다를 수 있습니다.
        </v-alert>
        <v-row class="mt-4">
            <v-col class="col-4">
                <CookieList img-size="middle" v-on:element-select="AddUnit"/>
                <ToppingList class="mt-5" img-size="middle" v-on:element-select="AddTopping"/>
            </v-col>
            <v-col class="col-8">
                <v-alert
                    type="warning"
                    v-model="showMsg"
                    dismissible
                    class="mb-2"
                >
                    {{ errMsg }}
                </v-alert>
                <v-row class="mb-2">
                    <v-col class="col-3">
                        <v-text-field v-model="deckName" label="덱 이름" type="text"></v-text-field>
                    </v-col>
                    <v-col class="col-9">
                        <DeckPreview :deck="deck" v-on:element-click="Delete($event)"/>
                    </v-col>
                </v-row>
                <template v-if="deck.length !== 0">
                    <v-alert type="info">왼쪽에 쿠키 이미지를 클릭하여 쿠키를 선택하고 토핑을 주세요!</v-alert>
                    <v-card v-for="(topping, cookieKey) in toppings" :key="cookieKey" class="mt-4 pa-3" outlined tile :class="cookieKey === selectCookie ? 'active' : ''">
                        <v-row>
                            <v-col class="col-2">
                                <Cookie img-size="middle" :cookie-key="cookieKey" @click.native="selectCookie = cookieKey"></Cookie>
                            </v-col>
                            <v-col class="col-6">
                                <Topping
                                    @click.native="DeleteTopping(cookieKey, index)"
                                    class="ml-1 float-left"
                                    v-for="(t, index) in topping" :key="`${t}${index}${cookieKey}`"
                                    img-size="small"
                                    :topping-key="t"></Topping>
                            </v-col>
                            <v-col class="col-4">
                                <v-text-field
                                    label="부가 설명 (부옵션 등등)"
                                    v-model="comment[cookieKey]"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-card>
                </template>
                <div class="mt-4" v-if="alreadyDecks.length > 0">
                    <v-divider></v-divider>
                    <div class="mt-4">
                        <span>유사한 덱</span>
                        <v-expansion-panels>
                            <Deck
                                v-for="(deck, index) in alreadyDecks" :key="`already_${index}`"
                                :deck="deck"
                            ></Deck>
                        </v-expansion-panels>
                    </div>
                </div>

                <v-row class="mt-5" v-if="deck.length > 0">
                    <v-spacer></v-spacer>
                    <v-btn color="success" @click="Upload">작성 완료</v-btn>
                </v-row>
            </v-col>
        </v-row>
    </div>
    <div v-else>
        올바른 접속이 아닙니다.
    </div>
</template>
<script lang="ts">
import Vue from "vue";
import CookieList from "@/components/CookieList.vue";
import DeckPreview from "@/components/DeckPreview.vue";
import CookieClass from "@/constants/cookie";
import ToppingList from "@/components/ToppingList.vue";
import Topping from "@/components/Topping.vue";
import Cookie from "@/components/Cookie.vue";
import deck from "@/service/deck";
import Deck from "@/components/Deck.vue";
import DeckService from "@/service/deck";

const ALREADY_EXIST = '해당 쿠키는 이미 덱에 존재합니다.';
const MAX_COOKIE_5 = '팀원의 최대 수는 5입니다.';
const MAX_TOPPING_5 = '토핑 최대 수는 5입니다.';
export default Vue.extend({
    name: 'DeckForm',
    props: {
        mode: {
            type: String,
            default: 'story',
        }
    },
    components: {Deck, Cookie, Topping, ToppingList, DeckPreview, CookieList},
    data(): { selectCookie: string, deckName: string, alreadyDecks: [], deck: string[], comment: Record<string, string>, toppings: Record<string, string[]>, errMsg: string, showMsg: boolean, } {
        return {
            selectCookie: '',
            deckName: '',
            alreadyDecks: [],
            deck: [],
            toppings: {},
            comment: {},
            errMsg: '',
            showMsg: false,
        };
    },
    methods: {
        SetMsg(v: string) {
            this.errMsg = v;
            this.showMsg = true;
        },
        AddUnit(v: string) {
            if (this.deck.indexOf(v) > -1) {
                this.SetMsg(ALREADY_EXIST);
                return;
            }
            if (this.deck.length >= 5) {
                this.errMsg = MAX_COOKIE_5;
                this.SetMsg(MAX_COOKIE_5);
                return;
            }
            this.deck.push(v);
            this.$set(this.toppings, v, []);
            this.deck.sort(function (a, b) {
                return CookieClass.OrderForDeck(a, b);
            });
        },
        AddTopping(v: string) {
            if (this.selectCookie === '') {
                return;
            }
            let r = this.toppings[this.selectCookie];
            if (r.length >= 5) {
                this.SetMsg(MAX_TOPPING_5);
                return;
            }
            r.push(v);
            this.$set(this.toppings, this.selectCookie, r);
        },
        DeleteTopping(c: string, t: number) { // cookie, toppingIndex
            let r = this.toppings[c];
            r.splice(t, 1);
            this.$set(this.toppings, c, r);
        },
        Delete(v: string) {
            this.deck.splice(this.deck.indexOf(v), 1);
            delete this.toppings[v];
        },
        Upload() {
            let dName = this.deckName;
            if (dName.trim().length === 0) {
                this.SetMsg('덱 이름을 적어주세요');
                return;
            }
            let units = [];
            const dSize = this.deck.length;
            for (let i = 0; i < dSize; i++) {
                units.push({
                    name: this.deck[i],
                    topping: this.toppings[this.deck[i]],
                })
            }
            let data = {
                tier: '',
                name: this.deckName,
                units: units,
                type: this.mode,
            };
            deck.CreateDeck(data)
                .then(response => {
                    console.log(response.data.message);
                    this.$router.push(`/deck?mode=${this.mode}`);
                });
        },
        ClearAlreadyDecks() {
            this.alreadyDecks.splice(0, this.alreadyDecks.length);
        },
        LoadAlreadyDeck() {
            console.log('loadAlreadyDeck()')
            this.ClearAlreadyDecks();
            DeckService.GetDecksByCookie({
                mode: this.mode,
                include: this.deck,
            }).then(response => {
                this.alreadyDecks = response.data.decks;
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
        deck(nv) {
            console.log('watch : deck');
            if (nv.length > 0) {
                this.LoadAlreadyDeck();
            } else {
                this.ClearAlreadyDecks();
            }
        }
    }
})
</script>