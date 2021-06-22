<template>
    <div :class="`cookie__border__${imgSize} cookie__${Cookie.tier} img__${imgSize}`">
        <img :src="require(`@/assets/CookieImage/${cookieKey}.png`)" alt="안녕"/>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import CookieClass from "@/constants/cookie";

export default Vue.extend({
    name: 'Cookie',

    props: {
        cookieKey: {
            type: String,
            default: 'Rye',
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
            return CookieClass.GetCookieByKey(this.cookieKey);
        }
    }
})
</script>

<style>
.cookie__common {
    border: #BA987C solid 3px;
}

.cookie__rare {
    border: #6EAFD9 solid 3px;
}

.cookie__epic {
    border: #D5598D solid 3px;
}
</style>