<template>
    <van-swipe-cell>
        <div class="comment-item" :class="className">
            <div class="title">
                <div class="left">
                    {{el.userName}} <span v-if="erji">回复了 {{el.parentUserName}}</span>
                </div>
                <div class="right">
                    {{el.createAt}}
                </div>
            </div>
            <div class="content" @click="openDialog({parentId,parentUserName: parentName})">
                {{el.content}}
            </div>
        </div>
        <template #right>
            <van-button v-if="el.canDel" square text="删除" @click="deleteComment(el.id)" type="danger" />
            <van-button square text="回复" @click="openDialog({parentId,parentUserName: parentName})" type="info" />
        </template>
    </van-swipe-cell>
</template>
<script>
    import {
        video_deleteCommentByCommentId
    } from 'api'
    export default {
        props: ['el', 'openDialog', 'className', 'parentId', "parentName", "erji", "refreshMethod"],
        methods: {
            deleteComment(id) {
                this.$dialog.confirm({
                    title: '是否删除',
                    message: '删除评论后将不可恢复，是否删除',
                    confirmButtonColor: '#ee0a24'
                }).then(res => {
                    return video_deleteCommentByCommentId(id).then(r => {
                        r.errcode == 0 ? this.$toast.success('评论删除成功！') : this.$toast.fail('评论删除失败！');
                    }).catch(e => e).finally(() => {
                        this.refreshMethod();
                    })
                }).catch(e => e)
            }
        }
    }
</script>