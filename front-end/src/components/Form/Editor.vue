<template>
    <div>
        <v-subheader>{{ label }}</v-subheader>
        <vue-editor v-model="Content" :editorToolbar="Config"></vue-editor>
    </div>
</template>

<script>
import Vue from "vue";
import { VueEditor } from "vue2-editor";
export default Vue.extend({
    name: 'Editor',
    data() {
        return {
            Content: this.content === null || this.content === undefined ? '' : this.content,
        }
    },
    computed: {
        Config() {
            return [["bold", "italic", "underline"], [{ list: "ordered" }, { list: "bullet" }]];
        }
    },
    props: {
        content: {
            type: [Object, String],
            default: null,
        },
        label: {
            type: String,
            default: '',
        },
    },
    methods: {
        onInput() {
            if (this.readOnly) return;
            this.$emit('input', this.Content);
        },
    },
    components: {
        VueEditor
    },
    watch: {
        Content(n) {
            this.$emit('input', n);
        }
    }
})
</script>

