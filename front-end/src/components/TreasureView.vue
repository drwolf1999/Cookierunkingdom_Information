<template>
    <v-card outlined tile class="pa-1 my-2 align-center">
        <v-row align="center" class="pa-3 mt-2" justify="center">
            <v-col class="text-center">
                <v-row align="center" justify="center">
                    <Treasure :img-size="imgSize" :treasure-key="treasureKey"/>
                </v-row>
                <v-row align="center" justify="center">{{ Treasure.name }}</v-row>
            </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row justify="center" align="center" class="pa-3">
            <v-col>설명</v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row class="pa-3">
            <v-col>{{ Treasure.description }}</v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row justify="center" align="center" class="pa-3">
            <v-col class="text-center" cols="2">효과</v-col>
            <v-divider vertical></v-divider>
            <v-col cols="10">{{ Treasure.effect }}</v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row justify="center" align="center" class="pa-3">
            <v-col class="text-center" cols="2">등급</v-col>
            <v-divider vertical></v-divider>
            <v-col cols="10" class="d-flex justify-center align-center">
                <v-img max-width="128px" :src="require(`@/assets/TierImage/${Treasure.tier}.png`)"></v-img>
            </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row justify="center" align="center" class="pa-3">
            <template v-if="TreasureType.length === 1">
                <v-col class="text-center" cols="2">유형</v-col>
                <v-divider vertical></v-divider>
                <v-col cols="10" class="d-flex justify-center align-center">
                    {{ TreasureType[0] }}
                </v-col>
            </template>
            <template v-else>
                <v-col cols="3" class="text-center">유형</v-col>
                <v-divider vertical></v-divider>
                <v-col cols="3" class="text-center">{{ TreasureType[0] }}</v-col>
                <v-divider vertical></v-divider>
                <v-col cols="3" class="text-center">쿨타임</v-col>
                <v-divider vertical></v-divider>
                <v-col cols="3" class="text-center">{{ TreasureType[1] }} 초</v-col>
            </template>
        </v-row>
    </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import TreasureClass from "@/constants/treasure.ts";
import Treasure from "@/components/Treasure.vue";
import ITreasure from "@/interface/treasure";

export default Vue.extend({
    name: 'TreasureView',
    data() {
        return {};
    },
    components: {Treasure,},
    props: {
        treasureKey: {
            type: String,
            default: '',
        },
        imgSize: {
            type: String,
            default: 'small',
        }
    },
    computed: {
        Treasure(): ITreasure {
            console.log(this.treasureKey)
            return TreasureClass.GetTreasureByKey(this.treasureKey);
        },
        TreasureType(): Array<string> {
            const treasure = this.Treasure;
            return treasure.type.split('_');
        }
    },
    filters: {
        ToUpper(v: string): string {
            return v.toUpperCase();
        }
    }
})
</script>