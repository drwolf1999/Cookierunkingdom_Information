<template>
    <div class="d-inline-block">
        <Topping
            class="float-left ml-2 mb-2"
            :img-size="imgSize"
            v-for="topping in Toppings" :key="topping.key"
            v-bind:topping-key="topping.key"
            style="cursor:pointer;"
            @click.native="$emit('element-select', topping.key)"
        />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Topping from "@/components/Topping.vue";
import ToppingClass from "@/constants/topping.ts";
export default Vue.extend({
    name: 'ToppingList',

    props: {
        imgSize: {
            type: String,
            default: 'big',
        }
    },

    components: {
        Topping,
    },

    data: () => {
        return {
        };
    },

    computed: {
        Toppings() {
            return ToppingClass.GetToppings();
        }
    }
})
</script>