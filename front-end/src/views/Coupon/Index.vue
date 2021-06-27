<template>
    <div>
        <v-simple-table>
            <template v-slot:default>
                <thead>
                <tr>
                    <th class="text-left">쿠폰 정보</th>
                    <th class="text-left">사용가능 여부</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="coupon in coupons" :key="coupon.name">
                    <td>{{ coupon.name }}</td>
                    <td>{{ coupon.active }}</td>
                </tr>
                </tbody>
            </template>
        </v-simple-table>
    </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    name: 'Coupon',
    data() {
        return {
            coupons: [{name: 'OPENSILVERBUTTON', active: true,}, {name: '12THBRAVEDAY0612', active: true,}, {name: 'COOKIECHICKENRUN', active: true,}],
        }
    }
})
</script>