<template>
    <div class="d-inline-block">
        <Cookie
            class="float-left ml-2 mb-2"
            v-for="cookie in CookieClass.GetCookies()" :key="cookie.key"
            v-bind:cookie-key="cookie.key"
            v-bind:img-size="imgSize"
            style="cursor:pointer;"
            @click.native="Select(cookie.key)"
        />
    </div>
</template>
<script lang="ts">
import Vue from 'vue';
import Cookie from "@/components/Cookie.vue";
import CookieClass from "@/constants/cookie.ts";

export default Vue.extend({
    props: {
        imgSize: {
            type: String,
            default: `small`
        },
        selected: {
            type: String,
            default: 'Vampire',
        }
    },
    components: {Cookie},
    data() {
        return {};
    },
    methods: {
        Select(v: string) {
            this.$emit('element-select', v);
        }
    },
    computed: {
        CookieClass() {
            return CookieClass;
        }
    }
})
</script>