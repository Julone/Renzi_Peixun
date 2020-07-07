<template>
    <div class="PROGRESS-PAGE MODULE">
        <van-pull-refresh success-text="已获取最新进度" v-model="isLoading" @refresh="onRefresh">
            <header>
                <app-title>学习进度</app-title>
                <!-- <h1 class="page-title">学习进度</h1> -->
            </header>
            <main>
                <van-collapse v-model="activeNames" :border="false">
                    <van-collapse-item size="large" v-for="(el,index1) in progressList" :key="index1" :name="index1">
                        <template #title>
                            <div class="col-title">
                                <div>
                                    <van-icon name="sign" />{{el.course_name}}</div>
                                <div>{{el.course_progress}}%</div>
                            </div>
                        </template>
                        <li style="font-size:1.2em" v-for="(ele,index2) in el.chapterRecordList" :key="index2">
                            <div class="li-title">
                                <div>{{ele.chapter_name}}</div>
                                <div>进度: {{ele.chapter_progress}}%</div>
                            </div>

                            <van-cell clickable :title="v.video_name" v-for="(v,index3) in ele.videoRecordList"
                                :key="index3">
                                <span style="float:right">进度: {{v.video_progress}} %</span>
                            </van-cell>
                        </li>
                    </van-collapse-item>
                </van-collapse>
                <van-empty v-if="progressList.length == 0 " description="暂无进度" >
                    <van-button type="info" round plain :to="{path: '/'}">开始学习</van-button>
                </van-empty>
                <van-divider v-else>没有更多了</van-divider>
            </main>
        </van-pull-refresh>
    </div>
</template>
<script>
    import {
        progress_getUserStudyProgress
    } from 'api';

    export default {
        data() {
            return {
                progressList: [],
                activeNames: [0],
                  isLoading: false


            }
        },
        methods: {
            getUserData() {
                return progress_getUserStudyProgress(1).then(r => {
                    console.log(r);
                    this.progressList = r.data.map(el => {
                        console.log(el);
                        el.chapterRecordList.forEach(element => {
                            element.chapter_progress = (element.chapter_progress).toFixed(2)
                        });
                        el.course_progress = (el.course_progress).toFixed(2)
                        return el
                    })
                    return Promise.resolve(true)
                }).catch(e => {
                    return Promise.reject(false)
                })
            },
            onRefresh(){
                this.getUserData().then(r=>{
                    
                }).catch(e=>{
                    this.$toast.fail('刷新失败!')
                }).finally(()=>{
                    this.isLoading = false
                })
            }
        },
        async created() {
            this.getUserData();
        }
    }
</script>
<style lang="less">
    .PROGRESS-PAGE{
    padding: 5px 10px 0;
        header {
            margin: 0 auto;
        }

        main {
            margin: 0 auto;
            // min-height: 70vmax;
            .van-collapse-item__title--expanded {
                background: #f8f8f8;
            }
            .col-title {
                .flex(@j: space-between);
                &>div {
                    i {
                        margin-right: 5px;
                    }
                    .flex();
                }
            }

            li {
                margin: 0px auto 10px;
                color: black;
                list-style: none;
                padding-left: 20px;
                .li-title {
                    .flex(@j: space-between);
                    margin-bottom: 5px;
                }
            }
        }

    }
</style>