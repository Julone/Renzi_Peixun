<template>
    <div class="FEEDBACK-PAGE MODULE">
        <van-sticky>
            <van-nav-bar title="培训考试" left-text="返回" left-arrow @click-left="$store.dispatch('app_go_back')"
                @click-right="onClickRight">
                <template #right>
                    <van-button type="info" size="mini" block plain>提交</van-button>
                </template>
            </van-nav-bar>
        </van-sticky>
        <main>
            <van-form>
                <van-field name="rate" label="满意度评分">
                    <template #input>
                        <van-rate v-model="rate" />
                    </template>
                </van-field>
                <van-field v-model="message" rows="5" autosize label="留言" type="textarea" placeholder="请输入留言" />
                <van-field name="uploader" label="截图上传">
                    <template #input>
                        <van-uploader v-model="uploader" />
                    </template>
                </van-field>
                <van-field v-model="value" label="联系方式" placeholder="请输入邮件、手机号码或QQ号码等任意联系方式" />
            </van-form>
        </main>
    </div>
</template>
<script>
    import {
        Uploader
    } from 'vant'
    export default {
        components: {
            'van-uploader': Uploader
        },
        data(){
            return {
                uploader: {},
                message: '',
                rate: ''
            }
        },
        methods: {
            onClickRight() {

            }
        }
    }
</script>
<style lang="less">
    .FEEDBACK-PAGE {}
</style>