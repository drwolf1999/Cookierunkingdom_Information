<template>
    <v-app>
        <Menu/>
        <v-container>
            <router-view/>
        </v-container>
    </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Menu from './components/Menu.vue';

export default Vue.extend({
    name: 'App',

    data: () => ({
        //
    }),

    components: {
        Menu,
    }
});
</script>

<style>
@import "./assets/cookierunkingdom.css";
</style>