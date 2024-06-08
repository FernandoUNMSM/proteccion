<template>
    <div class="row">
        <div class="col-md-12">
            <b-jumbotron bg-variant="light" header-level="5" class="avoid-paddings">
                <template #header>{{ capitalize(title) }}</template>
                <hr class="my-4">
            </b-jumbotron>
        </div>
    </div>
</template>
<script lang="ts">
    import Vue from 'vue'
    import {Component, Prop} from 'vue-property-decorator'
    @Component
    export default class extends Vue{
        @Prop({default:''})
        title: string;

        capitalize(str: string) {
            const lower = str.toLowerCase()
            return str.charAt(0).toUpperCase() + lower.slice(1)
        }
    }
</script>
<style scoped lang="stylus">
    .subtitle--font-size
        font-size 50%
        color #989898
    .avoid-paddings
        padding 1px
        margin-bottom 0px

</style>