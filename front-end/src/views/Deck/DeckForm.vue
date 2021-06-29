<template>
    <div v-if="ValidConnection && Allow">
        <v-alert type="info" dismissible>
            쿠키를 클릭하여 덱에 추가해보세요.
            <br>
            추가한 쿠키를 다시 클릭하면 덱에서 제거됩니다.
            <br>
            덱 정렬기준은 실제 게임과 다를 수 있습니다.
        </v-alert>
        <v-row class="mt-4" justify="center">
            <v-col cols="12">
                <v-tabs v-model="tab">
                    <v-tab href="#cookie">쿠키</v-tab>
                    <v-tab href="#topping">토핑</v-tab>
                    <v-tab href="#treasure">보물</v-tab>
                </v-tabs>
                <v-tabs-items v-model="tab">
                    <v-tab-item value="cookie">
                        <v-card flat>
                            <v-card-text>
                                <CookieList :img-size="GetImgSize" v-on:element-select="AddUnit"/>
                            </v-card-text>
                        </v-card>
                    </v-tab-item>
                    <v-tab-item value="topping">
                        <v-card flat>
                            <v-card-text>
                                <ToppingList class="mt-5" :img-size="GetImgSize" v-on:element-select="AddTopping"/>
                            </v-card-text>
                        </v-card>
                    </v-tab-item>
                    <v-tab-item value="treasure">
                        <v-card flat>
                            <v-card-text>
                                <TreasureList class="mt-5" :img-size="GetImgSize" v-on:element-select="AddTreasure"/>
                            </v-card-text>
                        </v-card>
                    </v-tab-item>
                </v-tabs-items>
            </v-col>
            <v-col cols="12">
                <v-alert
                    type="warning"
                    v-model="showMsg"
                    dismissible
                    class="mb-2"
                >
                    {{ errMsg }}
                </v-alert>
                <v-row class="mb-2">
                    <v-col :cols="GetImgSize === 'xs' ? 12 : 6">
                        <v-text-field v-model="deckName" label="덱 이름" type="text"></v-text-field>
                    </v-col>
                    <v-col :cols="GetImgSize === 'xs' ? 12 : 6">
                        <v-text-field v-model="password" label="비밀번호(수정을 위해 필요합니다.)" type="password"></v-text-field>
                    </v-col>
                    <v-col cols="7">
                        <DeckPreview :img-size="GetImgSize" :deck="deck" v-on:element-click="Delete($event)"/>
                    </v-col>
                    <v-col cols="5">
                        <Treasure class="float-left" v-for="treasure in treasures" :key="treasure" :treasure-key="treasure" :img-size="GetImgSize" @click.native="DeleteTreasure(treasures)"/>
                    </v-col>
                </v-row>
                <template v-if="deck.length !== 0">
                    <v-alert type="info">아래에서 쿠키를 선택(클릭)하고 토핑을 주세요!</v-alert>
                    <v-card v-for="(topping, cookieKey) in toppings" :key="cookieKey" class="mt-4 pa-3" outlined tile :class="cookieKey === selectCookie ? 'active' : ''"
                            @click.native="selectCookie = cookieKey; tab = TAB[1]"
                    >
                        <v-row>
                            <v-col :cols="GetImgSize === 'xs' ? 12 : 3">
                                <Cookie :img-size="GetImgSize" :cookie-key="cookieKey"></Cookie>
                            </v-col>
                            <v-col :cols="GetImgSize === 'xs' ? 12 : GetImgSize === 'small' ? 9 : 6">
                                <Topping
                                    @click.native="DeleteTopping(cookieKey, index)"
                                    class="ml-1 float-left"
                                    v-for="(t, index) in topping" :key="`${t}${index}${cookieKey}`"
                                    :img-size="GetImgSize"
                                    :topping-key="t"></Topping>
                            </v-col>
                            <v-col :cols="GetImgSize === 'xs' ? 12 : GetImgSize === 'small' ? 12 : 3">
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
    <div v-else-if="ValidConnection && !Allow">
        <v-card>
            <v-card-title>비밀번호 확인</v-card-title>
            <v-card-text>
                <v-row justify="center" align="center">
                    <v-col cols="3">비밀번호 입력</v-col>
                    <v-col cols="9">
                        <v-text-field type="password" v-model="confirmPassword"></v-text-field>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text @click="CheckAllow">확인</v-btn>
            </v-card-actions>
        </v-card>
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
import TreasureList from "@/components/TreasureList.vue";
import Treasure from "@/components/Treasure.vue";

const ALREADY_EXIST = '해당 쿠키는 이미 덱에 존재합니다.';
const MAX_COOKIE_5 = '팀원의 최대 수는 5입니다.';
const MAX_TOPPING_5 = '토핑 최대 수는 5입니다.';
const DUPLICATE_TREASURE = '같은 보물을 끼울 수 없습니다.';
const MAX_TREASURE_3 = '보물 최대 수는 3입니다.';
export default Vue.extend({
    name: 'DeckForm',
    props: {
        id: {
            type: [Number, String],
            default: -1,
        },
        mode: {
            type: String,
            default: '',
        }
    },
    components: {Treasure, TreasureList, Deck, Cookie, Topping, ToppingList, DeckPreview, CookieList},
    data(): { confirmPassword: string, allow: boolean, password: string, TAB: string[], treasures: string[], windowWidth: number, tab: number, selectCookie: string, deckName: string, alreadyDecks: [], deck: string[], comment: Record<string, string>, toppings: Record<string, string[]>, errMsg: string, showMsg: boolean, } {
        return {
            confirmPassword: '',
            allow: false,
            password: '',
            TAB: ['cookie', 'topping', 'treasure'],
            treasures: [],
            windowWidth: 0,
            tab: 1,
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
    mounted() {
        this.windowWidth = window.innerWidth;
        window.addEventListener('resize', () => {
            this.windowWidth = window.innerWidth;
        });
        if (this.id !== -1) {
            this.Load();
        }
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
            this.selectCookie = v;
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
        async Load() {
            const res = await deck.GetDeckById(this.id);
            const deckInfo = res.data.deck;
            this.treasures = deckInfo.treasures;
            const deckSize = deckInfo.units.length;
            for (let i = 0; i < deckSize; i++) {
                const cookie = deckInfo.units[i].cookie;
                this.deck.push(cookie);
                Vue.set(this.toppings, cookie, deckInfo.units[i].topping);
                Vue.set(this.comment, cookie, deckInfo.units[i].comment);
            }
            this.deckName = deckInfo.name;
            this.password = deckInfo.password === undefined ? '' : deckInfo.password;
        },
        async Upload() {
            let dName = this.deckName;
            if (dName.trim().length === 0) {
                this.SetMsg('덱 이름을 적어주세요');
                return;
            }
            let password = this.password;
            if (password.trim().length === 0) {
                this.SetMsg('비밀번호를 설정해야 문제 발생시 덱을 수정할 수 있습니다.');
                return;
            }
            let units = [];
            const dSize = this.deck.length;
            for (let i = 0; i < dSize; i++) {
                units.push({
                    cookie: this.deck[i],
                    topping: this.toppings[this.deck[i]],
                    comment: this.comment[this.deck[i]] || '',
                })
            }
            let data = {
                name: this.deckName,
                units: units,
                type: this.mode,
                password: this.password,
                treasures: this.treasures,
            };
            const id = parseInt(this.id);
            if (id !== -1) {
                data["id"] = id;
                await deck.Update(data);
            } else {
                await deck.CreateDeck(data);
            }

            await this.$router.push(`/deck?mode=${this.mode}`);
        },
        ClearAlreadyDecks() {
            this.alreadyDecks.splice(0, this.alreadyDecks.length);
        },
        LoadAlreadyDeck() {
            this.ClearAlreadyDecks();
            DeckService.GetDecksByCookie({
                mode: this.mode,
                include: this.deck,
            }).then(response => {
                this.alreadyDecks = response.data.decks;
            })
        },
        AddTreasure(t) {
            if (this.treasures.indexOf(t) > -1) {
                this.SetMsg(DUPLICATE_TREASURE);
                return;
            }
            if (this.treasures.length >= 3) {
                this.SetMsg(MAX_TREASURE_3);
                return;
            }
            this.treasures.push(t);
        },
        DeleteTreasure(t) {
            this.treasures.splice(this.treasures.indexOf(t), 1);
        },
        CheckAllow() {
            if (this.confirmPassword === this.password) {
                this.allow = true;
            } else {
                alert('비밀번호가 틀립니다. 다시 시도해 주세요');
            }
        },
    },
    computed: {
        Allow(): boolean {
            if (this.id === -1) return true;
            return this.allow;
        },
        ValidConnection(): boolean {
            const validMode: string[] = ['story', 'arena', 'guild'];
            const mode = this.mode;
            return validMode.indexOf(mode) !== -1 || this.id !== -1;
        },
        GetImgSize(): string {
            if (this.windowWidth <= 420) return 'xs'
            else if (this.windowWidth <= 780) return 'small';
            else return 'middle';
        },
    },
    watch: {
        deck(nv) {
            if (nv.length > 0) {
                this.LoadAlreadyDeck();
            } else {
                this.ClearAlreadyDecks();
            }
        }
    }
})
</script>