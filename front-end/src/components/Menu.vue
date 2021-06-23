<template>
    <div>
        <v-toolbar
            dark
            flat
        >
            <!--            <v-app-bar-nav-icon></v-app-bar-nav-icon>-->

            <v-toolbar-title style="cursor: pointer" @click="GoHome">CookieRun: Kingdom</v-toolbar-title>

            <v-toolbar-items>
                <v-btn text to="/deck?mode=story" exact>스토리 덱</v-btn>
                <v-btn text to="/deck?mode=arena" exact>아레나 덱</v-btn>
                <v-btn text to="/deck?mode=guild" exact>토벌 덱</v-btn>
                <v-btn text to="/calc/dragon/hp">용 체력 계산기</v-btn>
                <v-btn text to="/cookies">쿠키</v-btn>
                <v-btn text to="/topping">토핑</v-btn>
                <v-btn text to="/board/community">커뮤니티</v-btn>
<!--                <v-btn text to="/board/patch">패치내용</v-btn>-->
<!--                <v-btn text to="/board/event">이벤트</v-btn>-->
                <v-btn text to="/coupon">쿠폰 리스트</v-btn>
                <v-btn text href="https://game.devplay.com/coupon/ck/ko" target="_blank">쿠폰 입력</v-btn>
            </v-toolbar-items>

            <!--            <v-spacer></v-spacer>-->
        </v-toolbar>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'App',

    data: () => ({
        //
    }),

    components: {},

    methods: {
        GoHome() {
            const path = '/';
            if (this.$route.path === path) return;
            this.$router.push('/');
        }
    }
});
</script>