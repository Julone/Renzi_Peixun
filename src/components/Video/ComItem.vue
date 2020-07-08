<template>
    <van-swipe-cell ref="swipe_cell" @open="oepn">
        <div class="comment-item" :class="className">
            <div class="title">
                <div class="left">
                    {{el.userName}} <span v-if="erji">回复了 {{el.parentUserName}}</span>
                </div>
                <div class="right">
                    {{el.createAt}}
                </div>
            </div>
            <div class="content" @click="openSwipeCell">
                
                {{el.content}}
            </div>
        </div>
        <template #right>
            <van-button v-if="el.canDel" square text="删除" @click="deleteComment(el.id)" type="danger" />
            <van-button square text="回复" @click="openDialog({parentId,parentUserName: parentName})" type="info" />
        </template>

            <van-popup
            v-model="showPopup"
            position="bottom"
            :style="{ height: '3rem' }"
            :get-container="()=>this.$root.$el"
            >
            <div class="com_item_container">
                <div class="com_item_wrapper">
                    <div class="com_btn_item" v-for="el in options" :key="el.name">
                <van-icon :name="el.icon"></van-icon>
            </div>
                </div>
            </div>
            
            </van-popup>
    </van-swipe-cell>
</template>
<script>
    import {
        video_deleteCommentByCommentId
    } from 'api'
    export default {
        props: ['el', 'openDialog', 'className', 'parentId', "parentName", "erji", "refreshMethod"],
        data(){
            return {
                showPopup:false,
                options: [
                    {name: 'reply',icon:'edit', label: '评论'},
                    {name: 'delete',icon:'delete', label: '删除'},
                    {name: 'report',icon:'warn-o', label: '举报'},
               
                ]
            }
        },
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
            },
            async  openSwipeCell(){
                // this.$toast('推荐右划进行操作');
                // this.showPopup = true;
                this.openDialog({parentId:this.parentId,parentUserName: this.parentName});
    
            },
            oepn(){
                // console.log(arguments);
            }
        },
        mounted(){
        }
    }
</script>
<style lang="less">
.com_item_container{
    padding: 20px 10px;
    width: 100%;
    box-sizing: border-box;
    overflow-x: auto;
    .com_item_wrapper{
        // .flex(@j:flex-start;@w:nowrap);
        width: auto;
        white-space: nowrap;
        .com_btn_item{
            @size:1.5rem;
    width: @size;
    height: @size;
    border-radius: 100px;
    flex:none;
    background: gray;
    .flex();
    display: inline-flex;
    font-size: @size / 3;
    margin-right: 10px;
}

    }

}

</style>