<template>
    <div class="d-inline-block">
        <Treasure
            class="float-left ml-2 mb-2"
            :img-size="imgSize"
            v-for="treasure in Treasures" :key="treasure.key"
            v-bind:treasure-key="treasure.key"
            style="cursor:pointer;"
            @click.native="$emit('element-select', treasure.key)"
        />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import TreasureClass from "@/constants/treasure";
import Treasure from "@/components/Treasure.vue";
export default Vue.extend({
    name: 'TreasureList',

    props: {
        imgSize: {
            type: String,
            default: 'big',
        }
    },

    components: {
        Treasure,
    },

    data: () => {
        return {
        };
    },

    computed: {
        Treasures() {
            return TreasureClass.GetTreasures();
        }
    }
})
</script>