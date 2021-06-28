<template>
    <div>
        <v-card class="pa-4">
            <v-card-title>
                <v-spacer></v-spacer>
                <v-text-field v-model="query" @keyup.enter="Search" label="게시물 검색" append-icon="mdi-magnify"></v-text-field>
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
                        <tbody v-if="fetchingBoard">
                        <tr>
                            <td class="text-center" colspan="4">로딩중...</td>
                        </tr>
                        </tbody>
                        <tbody v-else-if="boards.length">
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
                <v-pagination
                    total-visible="5"
                    :length="allBoardSize"
                    v-model="page"
                ></v-pagination>
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
    data(): { fetchingBoard: boolean, allBoardSize: number, page: number, boards: [], query: string } {
        return {
            fetchingBoard: false,
            allBoardSize: 1,
            page: 1,
            boards: [],
            query: ''
        };
    },
    mounted() {
        this.FetchBoard();
    },
    methods: {
        Search() {
            this.page = 1;
            this.FetchBoard();
        },
        FetchBoard() {
            this.fetchingBoard = true;
            board.GetBoards({
                query: this.query,
                page: this.page,
            })
                .then(response => {
                    this.fetchingBoard = false;
                    this.allBoardSize = response.data.allBoardSize;
                    this.boards = response.data.boards;
                });
        }
    },
    watch: {
        page() {
            this.FetchBoard();
        }
    }
})
</script>