<template>
    <v-slider
        v-model="currentV"
        class="align-center"
        :max="max"
        :min="min"
        hide-details
    >
        <template v-slot:append>
            <v-text-field
                v-model="currentV"
                class="mt-0 pt-0"
                hide-details
                single-line
                type="number"
                style="width: 60px"
                :rules="currentRules"
            ></v-text-field>
        </template>
    </v-slider>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'SliderForm',

    props: {
        min: {
            type: Number,
            default: 0,
        },
        max: {
            type: Number,
            default: 100,
        },
        current: {
            type: Number,
            default: 0,
        },
    },

    components: {},

    data: () => {
        return {
            currentV: 1,
            currentRules: [],
        };
    },
    mounted() {
        this.currentV = this.current;
    },

    watch: {
        currentV(nv, ov) {
            if (nv !== ov && nv !== this.current) {
                this.$emit('update', nv);
            }
        }
    },
})
</script>