<template>
    <div class="deck">
        <div class="deck__item" v-for="cookie in deck" :key="cookie">
            <Cookie v-bind:cookie-key="cookie" @click.native="$emit('element-click', cookie)" :img-size="imgSize"/>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Cookie from "@/components/Cookie.vue";

export default Vue.extend({
    name: 'DeckPreview',

    props: {
        deck: {
            type: Array,
        },
        imgSize: {
            type: String,
            default: 'big'
        }
    },

    components: {
        Cookie,
    },

    data: () => {
        return {
        };
    }
})
</script>

<style>
.deck:after {
    content: '';
    clear: both;
    display: table;
}

.deck__item {
    float: left;
}

.deck__item:not(:first-child) {
    margin-left: 10px;
}
</style>