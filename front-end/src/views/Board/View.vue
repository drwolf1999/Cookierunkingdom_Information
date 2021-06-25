<template>
    <div>
        <v-card class="pa-3" v-if="!boardLoading">
            <v-card-title>{{ board.title }}</v-card-title>
            <v-card-subtitle>
                <div class="hidden-md-and-down">
                    <v-row>
                        <span>{{ board.username }}</span>
                        <v-divider class="mx-2" vertical></v-divider>
                        <span>{{ board.date }}</span>
                        <v-spacer></v-spacer>
                        <v-chip>댓글 {{ commentLength }}</v-chip>
                    </v-row>
                </div>
                <div class="hidden-lg-and-up">
                    <v-row>
                        <span>{{ board.username }}</span>
                        <v-divider class="mx-2" vertical></v-divider>
                        <span>{{ board.date }}</span>
                    </v-row>
                    <v-row class="mt-5">
                        <v-chip>댓글 {{ commentLength }}</v-chip>
                    </v-row>
                </div>
            </v-card-subtitle>
            <v-divider></v-divider>
            <v-card-text class="mt-2">
                <div id="board__content" v-html="board.content"></div>
            </v-card-text>
        </v-card>

        <v-skeleton-loader type="card" v-else></v-skeleton-loader>

        <v-card class="mt-5" outlined v-if="!commentLoading">
            <v-card-title>댓글</v-card-title>
            <v-card-text>
                <div v-for="(comment, index) in comments" :key="`comment_${comment.id}`" class="mb-2">
                    <v-divider></v-divider>
                    <v-row class="pa-1 hidden-md-and-down cursor__pointer" @click="ToggleComment(index)">
                        <v-col cols="1" lg="2" class="font-weight-bold">{{ comment.username }}</v-col>
                        <v-col cols="9" lg="8">{{ comment.content }}</v-col>
                        <v-col cols="2" lg="2" class="text-right"><small>{{ comment.date }}</small></v-col>
                    </v-row>
                    <div class="pa-1 hidden-lg-and-up cursor__pointer" @click="ToggleComment(index)">
                        <div class="font-weight-bold">{{ comment.username }}</div>
                        <div>{{ comment.content }}</div>
                        <div class="text-right"><small>{{ comment.date }}</small></div>
                    </div>
                    <CommentForm v-if="index === replyVisible" :board-id="boardId" class="ml-4" :parent-comment="comment.id" v-on:update="FetchComment"/>
                    <v-card tile outlined class="ml-4" v-for="reply in comment.reply" :key="`comment_reply_${reply.id}`">
                        <v-card-text>
                            <v-row class="pa-1 hidden-md-and-down">
                                <v-col cols="1" lg="2" class="font-weight-bold">{{ reply.username }}</v-col>
                                <v-col cols="9" lg="8">{{ reply.content }}</v-col>
                                <v-col cols="2" lg="2" class="text-right"><small>{{ reply.date }}</small></v-col>
                            </v-row>
                            <div class="pa-0 hidden-lg-and-up">
                                <div class="font-weight-bold">{{ reply.username }}</div>
                                <div>{{ reply.content }}</div>
                                <div class="text-right"><small>{{ reply.date }}</small></div>
                            </div>
                        </v-card-text>
                    </v-card>
                </div>
            </v-card-text>
        </v-card>
        <v-skeleton-loader type="card" class="mt-5" v-else></v-skeleton-loader>
        <CommentForm label="댓글 달기" :board-id="boardId" v-on:update="FetchComment"/>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import board from "@/service/board";
import CommentForm from "@/components/CommentForm.vue";
import CommentService from "@/service/comment";

interface comment {
    username: string,
    content: string,
    date: string,
    reply: []
}

export default Vue.extend({
    name: 'BoardView',
    components: {CommentForm},
    props: {
        boardId: {
            type: [Number, String],
            required: true,
        }
    },
    mounted() {
        this.FetchBoard();
        this.FetchComment();
    },
    data(): { replyVisible: number, boardLoading: boolean, commentLoading: boolean, board: { username: string, title: string, content: string, date: string }, comments: comment[], commentLength: number } {
        return {
            replyVisible: -1,
            boardLoading: false,
            commentLoading: false,
            board: {
                username: '이름',
                title: '제목',
                content: '내용',
                date: '2020.01.20',
            },
            comments: [],
            commentLength: 0,
        };
    },
    methods: {
        FetchBoard() {
            this.boardLoading = true;
            board.GetBoardById(this.boardId)
                .then(response => {
                    this.boardLoading = false;
                    this.board = response.data.board;
                })
        },
        FetchComment() {
            this.commentLoading = true;
            CommentService.GetComments(this.boardId)
                .then(response => {
                    this.commentLoading = false;
                    this.comments = response.data.comments;
                    this.commentLength = response.data.length;
                    this.replyVisible = -1;
                })
        },
        ToggleComment(index: number) {
            if (this.replyVisible === index) this.replyVisible = -1;
            else this.replyVisible = index;
        },
    },
    watch: {
        $route() {
            this.FetchBoard();
        }
    },
})
</script>

<style>
#board__content > p {
    margin-bottom: 4px;
}

.cursor__pointer {
    cursor: pointer;
}
</style>