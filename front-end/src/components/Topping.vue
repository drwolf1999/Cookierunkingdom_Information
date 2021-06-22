<template>
    <div :class="`img__${imgSize}`">
        <img :src="require(`@/assets/ToppingImage/${toppingKey}.png`)" alt=""/>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import CookieClass from "@/constants/cookie";

export default Vue.extend({
    name: 'Topping',

    props: {
        toppingKey: {
            type: String,
            default: 'Raspberry',
        },
        imgSize: {
            type: String,
            default: 'big',
        }
    },

    components: {
    },

    data: () => {
        return {
            tier: 'epic',
        };
    },

    computed: {
        Cookie() {
            return CookieClass.GetCookieByKey(this.toppingKey);
        }
    }
})
</script>