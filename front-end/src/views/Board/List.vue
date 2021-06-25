<template>
    <div>
        <v-card class="pa-4">
            <v-card-title>
                <v-spacer></v-spacer>
                <v-text-field v-model="Query" @keyup.enter="SearchBoard" label="게시물 검색" append-icon="mdi-magnify"></v-text-field>
            </v-card-title>
            <v-card-text>
                <v-simple-table>
                    <template v-slot:default>
                        <thead>
                        <tr>
                            <th class="text-left">#</th>
                            <th class="text-left">제목</th>
                            <th class="text-left">닉네임</th>
                            <th class="text-left">날짜</th>
                        </tr>
                        </thead>
                        <tbody v-if="boards.length">
                        <tr v-for="(board, index) in boards" :key="index">
                            <td class="col-1">{{ index + 1 }}</td>
                            <td class="col-7">
                                <router-link style="text-decoration-line: none; color: black;" :to="{name: 'BoardView',params: {boardId: board.id}}">{{ board.title }}</router-link>
                                &nbsp;
                                <span style="color: grey;">[{{ board.commentSize }}]</span>

                            </td>
                            <td class="col-2">{{ board.username }}</td>
                            <td class="col-2">{{ board.date }}</td>
                        </tr>
                        </tbody>
                        <tbody v-else>
                        <tr>
                            <td class="text-center" colspan="4">아직 내용이 없어요!</td>
                        </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text color="success" :to="{name: 'BoardWrite'}">글 쓰기</v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import board from "@/service/board";

export default Vue.extend({
    name: 'BoardList',
    data(): { page: number, boards: [], Query: string } {
        return {
            page: 1,
            boards: [],
            Query: ''
        };
    },
    mounted() {
        this.FetchBoard();
    },
    methods: {
        SearchBoard() {
            // do something
        },
        FetchBoard() {
            board.GetBoards({
                query: this.Query,
            })
                .then(response => {
                    this.boards = response.data.boards;
                    console.log(this.boards)
                });
        }
    }
})
</script>