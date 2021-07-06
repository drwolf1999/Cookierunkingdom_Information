<template>
    <div>
        <v-row v-for="(i, indexI) in TreasureIterCount(3)" :key="`lg_row_${i}`" class="d-none d-lg-flex">
            <v-col class="col-4" v-for="(j, indexJ) in 3" :key="`lg_col_${j}`">
                <TreasureView v-if="(3 * indexI + indexJ) < TreasureCount" img-size="middle" :treasure-key="Treasures[3 * indexI + indexJ].key"/>
            </v-col>
        </v-row>

        <v-row v-for="(i, indexI) in TreasureIterCount(2)" :key="`md_row_${i}`" class="d-none d-lg-none d-md-flex">
            <v-col class="col-6" v-for="(j, indexJ) in 2" :key="`md_col_${j}`">
                <TreasureView v-if="(2 * indexI + indexJ) < TreasureCount" img-size="middle" :treasure-key="Treasures[2 * indexI + indexJ].key"/>
            </v-col>
        </v-row>

        <v-row v-for="treasure in Treasures" :key="`small_${treasure.key}`" class="d-lg-none d-md-none">
            <v-col class="col-12">
                <TreasureView img-size="middle" :treasure-key="treasure.key"/>
            </v-col>
        </v-row>
    </div>
</template>
<script lang="ts">
import TreasureClass from "@/constants/treasure.ts";
import Vue from "vue";
import TreasureView from "@/components/TreasureView.vue";
import ITreasure from "@/interface/treasure";

export default Vue.extend({
    name: 'TreasureIndex',
    components: {TreasureView},
    methods: {
        TreasureIterCount(split: number): number {
            let ret = TreasureClass.GetTreasures().length;
            ret = (ret + split - 1) / split;
            ret = Math.floor(ret);
            return ret;
        },
    },
    computed: {
        Treasures(): Array<ITreasure> {
            return TreasureClass.GetTreasures();
        },
        TreasureCount(): number {
            return TreasureClass.GetTreasures().length;
        }
    }
})
</script>