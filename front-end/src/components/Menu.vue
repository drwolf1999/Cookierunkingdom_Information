<template>
    <div>
        <v-toolbar
            dark
            flat
        >
            <v-app-bar-nav-icon @click.stop="sideNav = !sideNav" v-if="windowWidth <950"></v-app-bar-nav-icon>

            <v-toolbar-title style="cursor: pointer" @click="GoHome">CookieRun: Kingdom</v-toolbar-title>

            <v-toolbar-items v-if="windowWidth >= 950">
                <v-btn
                    v-for="link in linkList" :key="link.url"
                    text
                    :to="link.url"
                    :exact="link.exact"
                    :target="link.target"
                >{{ link.name }}
                </v-btn>
                <v-btn text href="https://game.devplay.com/coupon/ck/ko" target="_blank">쿠폰 입력</v-btn>
            </v-toolbar-items>

            <!--            <v-spacer></v-spacer>-->
        </v-toolbar>

        <v-navigation-drawer v-model="sideNav" absolute temporary>
            <v-list dense>
                <v-subheader class="red--text accent-4">DANGEROUS ZONE</v-subheader>
                <v-list-item
                    v-for="link in linkList"
                    :key="link.url"
                    link
                    :exact="link.exact"
                    :target="link.target"
                    :to="link.url"
                >
                    <v-list-item-content>
                        <v-list-item-title>{{ link.name }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item
                    href="https://game.devplay.com/coupon/ck/ko"
                    target="_blank"
                    link
                >
                    <v-list-item-content>
                        <v-list-item-title>쿠폰 입력</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

interface LINK {
    url: string,
    exact: boolean,
    name: string,
    target: string,
}

export default Vue.extend({
    name: 'App',

    data: (): { sideNav: boolean, windowWidth: number, linkList: LINK[] } => ({
        sideNav: false,
        windowWidth: 0,
        linkList: [
            {url: '/deck?mode=story', exact: true, name: '스토리 덱', target: '_self'},
            {url: '/deck?mode=arena', exact: true, name: '아레나 덱', target: '_self'},
            {url: '/deck?mode=guild', exact: true, name: '길드 덱', target: '_self'},
            {url: '/calc/dragon/hp', exact: true, name: '용 체력 계산기', target: '_self'},
            {url: '/cookies', exact: true, name: '쿠키', target: '_self'},
            {url: '/topping', exact: true, name: '토핑', target: '_self'},
            {url: '/board/community', exact: true, name: '커뮤니티', target: '_self'},
            {url: '/coupon', exact: true, name: '쿠폰 리스트', target: '_self'},
            // {url: 'https://game.devplay.com/coupon/ck/ko', exact: true, name: '쿠폰 입력', target: '_blank'},
        ]
    }),

    components: {},
    mounted() {
        this.windowWidth = window.innerWidth;
        window.addEventListener('resize', () => {
            this.windowWidth = window.innerWidth;
        })
    },
    methods: {
        GoHome() {
            const path = '/';
            if (this.$route.path === path) return;
            this.$router.push('/');
        }
    }
});
</script>