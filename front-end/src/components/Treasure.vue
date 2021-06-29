<template>
    <div :class="`img__${imgSize}`">
        <img :src="require(`@/assets/TreasureImage/${treasureKey}.png`)" :alt="Treasure.name"/>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import TreasureClass from "@/constants/treasure";

export default Vue.extend({
    name: 'Treasure',

    props: {
        treasureKey: {
            type: String,
            default: 'OldPilgrimsScroll',
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
        Treasure() {
            return TreasureClass.GetTreasureByKey(this.treasureKey);
        }
    }
})
</script>