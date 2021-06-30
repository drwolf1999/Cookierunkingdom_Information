<template>
    <div>
        <v-alert dismissible type="warning" v-model="message.view">{{ message.content }}</v-alert>
        <v-card class="pa-4">
            <v-card-title>글쓰기</v-card-title>
            <v-card-text>
                <v-row justify="center" align="center">
                    <v-col cols="5">
                        <v-text-field label="아이디" v-model="post.username"></v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field label="비번" type="password" v-model="post.password"></v-text-field>
                    </v-col>
                    <v-col cols="1">
                        <v-tooltip bottom class="text-center">
                            <template v-slot:activator="{ on, attrs }">
                                <v-icon
                                    color="black"
                                    dark
                                    v-bind="attrs"
                                    v-on="on"
                                >
                                    mdi-help-circle-outline
                                </v-icon>
                            </template>
                            <span>아이디 비번은 글 수정시 필요합니다.</span>
                        </v-tooltip>
                    </v-col>
                </v-row>
                <v-text-field outlined label="제목" v-model="post.title"></v-text-field>
                <Editor :key="post.content" label="본문" v-bind:content="post.content" v-on:input="post.content = $event"/>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn v-if="board === null" text color="success" @click="DoPost">작성</v-btn>
                <v-btn v-else text color="success" @click="Update">수정하기</v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>
<script lang="ts">
import Vue from "vue";
import Editor from "@/components/Form/Editor.vue";
import board from "@/service/board";
import {IBoard, IBoardForm} from "@/interface/board";

export default Vue.extend({
    components: {Editor},
    props: {
        board: {
            type: Object,
            default: null,
        }
    },
    data(): { message: { content: string, view: boolean }, post: IBoard } {
        return {
            post: {
                id: null,
                date: null,
                username: '',
                password: '',
                title: '',
                content: '',
            },
            message: {
                content: '...',
                view: false,
            },
        };
    },
    mounted() {
        if (this.board !== null)
            this.post = this.board;
    },
    methods: {
        IsValid(e: string) {
            return e !== '';
        },
        SetMsg(msg: string) {
            this.message.content = msg;
            this.message.view = true;
        },
        async DoPost() {
            if (!this.IsValid(this.post.username) || !this.IsValid(this.post.password) || !this.IsValid(this.post.title) || !this.IsValid(this.post.content)) {
                this.SetMsg('모든 필드는 채워져야 합니다');
                return;
            }
            const response = await board.CreateBoard(this.post);
            this.$router.push('/board/community');

        },
        Update() {
            if (!this.IsValid(this.post.username) || !this.IsValid(this.post.password) || !this.IsValid(this.post.title) || !this.IsValid(this.post.content)) {
                this.SetMsg('모든 필드는 채워져야 합니다');
                return;
            }
            board.UpdateBoard(this.post).then(response => {
                this.$emit('update', response.data.board);
            })
        },
    }
})
</script>