<template>
    <div>
        <v-card class="mt-5 hidden-md-and-down" outlined>
            <v-card-title v-if="label !== ''">{{ label }}</v-card-title>
            <v-card-text>
                <v-row class="px-3" align="center" justify="center">
                    <v-col cols="2">
                        <v-row class="mb-5">
                            <v-text-field hide-details dense outlined label="아이디" v-model="username"></v-text-field>
                        </v-row>
                        <v-row>
                            <v-text-field type="password" hide-details dense outlined label="비밀번호" v-model="password"></v-text-field>
                        </v-row>
                    </v-col>
                    <v-col cols="9">
                        <v-textarea hide-details dense outlined height="100" label="내용" v-model="content"></v-textarea>
                    </v-col>
                    <v-col cols="1">
                        <v-btn text block tile class="py-12" color="info" @click="Submit">작성</v-btn>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>

        <v-card class="mt-1 hidden-lg-and-up" outlined>
            <v-card-title v-if="label !== ''">{{ label }}</v-card-title>
            <v-card-text>
                <v-row class="px-0" align="center" justify="center">
                    <v-col cols="6">
                        <v-text-field hide-details dense outlined label="아이디" v-model="username"></v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field type="password" hide-details dense outlined label="비밀번호" v-model="password"></v-text-field>
                    </v-col>
                </v-row>
                <v-row class="px-0" align="center" justify="center">
                    <v-col>
                        <v-textarea hide-details dense outlined height="100" label="내용" v-model="content"></v-textarea>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text color="info" @click.native="Submit">작성</v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import comment from "@/service/comment";

export default Vue.extend({
    name: 'CommentForm',
    props: {
        label: {
            type: String,
            default: '',
        },
        boardId: {
            type: [Number, String],
            required: true,
        },
        parentComment: {
            type: [Number, String],
            default: -1,
        }
    },
    data(): { username: string, content: string, password: string } {
        return {
            username: '',
            content: '',
            password: '',
        };
    },
    methods: {
        Submit() {
            console.log('init')
            comment.CreateComment(this.boardId, {
                username: this.username,
                content: this.content,
                password: this.password,
                parentComment: this.parentComment
            })
                .then(() => {
                    this.$emit('update');
                })
                .catch(() => {
                    // some error
                })
        }
    }
})
</script>