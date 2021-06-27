<template>
    <div>
        <v-row v-if="cookieInfo !== null && windowWidth > 1256">
            <v-col cols="3">
                <CookieList img-size="middle" :selected="selectedCookie" v-on:element-select="selectedCookie = $event"/>
            </v-col>
            <v-col cols="9">
                <v-card :class="cookieInfo.tier">
                    <v-card-title>{{ cookieInfo.name }}맛 쿠키</v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>
                        <v-row justify="center">
                            <v-col>스킬</v-col>
                        </v-row>
                        <v-row class="pa-2 new__line" :class="`${cookieInfo.tier}__sub`">
                            <v-col>{{ cookieInfo.description }}</v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="6">등급</v-col>
                            <v-divider vertical></v-divider>
                            <v-col cols="6">역할</v-col>
                        </v-row>
                        <v-row class="pa-2 d-flex" :class="`${cookieInfo.tier}__sub`" justify="center" align="center">
                            <v-col cols="6" class="d-flex justify-center align-center">
                                <v-img contain width="30%" max-width="128px" :src="require(`@/assets/TierImage/${cookieInfo.tier}.png`)"/>
                            </v-col>
                            <v-divider vertical></v-divider>
                            <v-col cols="6" class="d-flex justify-center align-center">
                                <v-img class="float-left" contain max-width="30px" max-height="30px" :src="require(`@/assets/JobImage/${cookieInfo.type}.png`)"/>
                                <span class="float-left">{{ cookieInfo.type | Korean }}</span>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
                <v-card class="mt-5">
                    <v-card-subtitle>
                        <v-row class="pa-3">
                            추천 토핑
                            <v-spacer></v-spacer>
                            <v-tooltip bottom class="text-center">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-icon
                                        color="black"
                                        dark
                                        v-bind="attrs"
                                        v-on="on"
                                    >
                                        mdi-help-circle-outline
                                    </v-icon>
                                </template>
                                <span>추천덱에서 자료를 생성하기 때문에 없을 수 있습니다.</span>
                            </v-tooltip>
                        </v-row>
                    </v-card-subtitle>
                    <v-card-text>
                        <div class="d-inline-block pa-1" style="width: 100%;" v-if="goodTopping.length > 0">
                            <div class="float-left ma-1" v-for="topping in goodTopping" :key="topping">
                                <Topping :topping-key="topping" img-size="small"/>
                            </div>
                        </div>
                        <div class="pa-1" v-else>
                            아직 아무 정보가 없어요...ㅜㅜ
                        </div>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <div v-else-if="cookieInfo !== null && windowWidth <= 1256">
            <v-row>
                <v-col>
                    <CookieList :img-size="windowWidth <= 394 ? 'xs' : 'middle'" :selected="selectedCookie" v-on:element-select="selectedCookie = $event"/>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-card :class="cookieInfo.tier">
                        <v-card-title>{{ cookieInfo.name }}맛 쿠키</v-card-title>
                        <v-divider></v-divider>
                        <v-card-text>
                            <v-row justify="center">
                                <v-col>스킬</v-col>
                            </v-row>
                            <v-row class="pa-2 new__line" :class="`${cookieInfo.tier}__sub`">
                                <v-col>{{ cookieInfo.description }}</v-col>
                            </v-row>
                            <template v-if="windowWidth >= 360">
                                <v-row>
                                    <v-col cols="6">등급</v-col>
                                    <v-divider vertical></v-divider>
                                    <v-col cols="6">역할</v-col>
                                </v-row>
                                <v-row class="pa-2" :class="`${cookieInfo.tier}__sub`" justify="center" align="center">
                                    <v-col cols="6" class="d-flex justify-center align-center">
                                        <v-img width="30%" contain max-width="128px" :src="require(`@/assets/TierImage/${cookieInfo.tier}.png`)"/>
                                    </v-col>
                                    <v-divider vertical></v-divider>
                                    <v-col cols="6" class="d-flex justify-center align-center">
                                        <v-img class="float-left" contain max-width="30px" max-height="30px" :src="require(`@/assets/JobImage/${cookieInfo.type}.png`)"/>
                                        <span style="vertical-align: center" class="float-left">{{ cookieInfo.type | Korean }}</span>
                                    </v-col>
                                </v-row>
                            </template>
                            <template v-else>
                                <v-row>
                                    <v-col cols="12">등급</v-col>
                                </v-row>
                                <v-row class="pa-2" :class="`${cookieInfo.tier}__sub`" justify="center" align="center">
                                    <v-col cols="12" class="d-flex justify-center align-center">
                                        <v-img width="30%" max-width="128px" :src="require(`@/assets/TierImage/${cookieInfo.tier}.png`)"/>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="12">역할</v-col>
                                </v-row>
                                <v-row class="pa-2" :class="`${cookieInfo.tier}__sub`" justify="center" align="center">
                                    <v-col cols="12" class="d-flex justify-center align-center">
                                        <v-img class="float-left" contain max-width="30px" max-height="30px" :src="require(`@/assets/JobImage/${cookieInfo.type}.png`)"/>
                                        <span class="float-left">{{ cookieInfo.type | Korean }}</span>
                                    </v-col>
                                </v-row>
                            </template>
                        </v-card-text>
                    </v-card>
                    <v-card class="mt-5">
                        <v-card-subtitle>
                            <v-row class="pa-3">
                                추천 토핑
                                <v-spacer></v-spacer>
                                <v-tooltip bottom class="text-center">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-icon
                                            color="black"
                                            dark
                                            v-bind="attrs"
                                            v-on="on"
                                        >
                                            mdi-help-circle-outline
                                        </v-icon>
                                    </template>
                                    <span>추천덱에서 자료를 생성하기 때문에 없을 수 있습니다.</span>
                                </v-tooltip>
                            </v-row>
                        </v-card-subtitle>
                        <v-card-text>
                            <div class="d-inline-block pa-1" style="width: 100%;" v-if="goodTopping.length > 0">
                                <div class="float-left ma-1" v-for="topping in goodTopping" :key="topping">
                                    <Topping :topping-key="topping" img-size="small"/>
                                </div>
                            </div>
                            <div class="pa-1" v-else>
                                아직 아무 정보가 없어요...ㅜㅜ
                            </div>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </div>
        <div v-else>
            loading...
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import CookieList from "@/components/CookieList.vue";
import CookieClass from "@/constants/cookie";
import Topping from "@/components/Topping.vue";
import CookieService from "@/service/cookie";

export default Vue.extend({
    name: 'Cookies',

    props: {},

    components: {
        Topping,
        CookieList
    },

    data: () => {
        return {
            selectedCookie: '',
            cookieInfo: null,
            goodTopping: [
                'Raspberry',
                'Chocolatechip'
            ],

            windowWidth: 0,
        };
    },
    mounted() {
        this.windowWidth = window.innerWidth;
        window.addEventListener('resize', () => {
            this.windowWidth = window.innerWidth;
        })

        this.selectedCookie = CookieClass.GetCookies()[0].key;
        this.UpdateSelectedCookie();
    },

    methods: {
        UpdateSelectedCookie() {
            this.cookieInfo = CookieClass.GetCookieByKey(this.selectedCookie);
            this.goodTopping.splice(0, this.goodTopping.length); // clear
            CookieService.GetGoodTopping(this.selectedCookie)
                .then(response => {
                    this.goodTopping = response.data.goodTopping;
                })
        },
    },
    filters: {
        Korean(e: string): string {
            if (e === 'Bomber') return '폭발형';
            return '';
        },
    },
    watch: {
        selectedCookie() {
            this.UpdateSelectedCookie();
        }
    }
})
</script>