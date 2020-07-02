<template>
    <div class="SCORE-PAGE MODULE">
        <van-pull-refresh  success-text="已获取最新成绩" v-model="isLoading" @refresh="onRefresh">

            <header>
                <app-title>成绩中心</app-title>
                <!-- <h1 class="page-title">成绩中心</h1> -->
            </header>
            <main class="score-list">
                
                <div class="score-item" v-for="(el,index) in scoreList" :key="index">
                    <van-cell clickable :title="el.sjName">
                        得分: {{el.zf}} 总分:{{el.sjzf}}
                    </van-cell>
                    <van-progress :percentage="el.rate" :pivot-text="el.zf + '分'"/>
                </div>
                <van-empty v-if="scoreList.length == 0 " description="暂无成绩">
                    <van-button type="info" plain :to="{path: '/'}">开始学习</van-button>
                </van-empty>
                <van-divider v-else>没有更多了</van-divider>
            </main>
        </van-pull-refresh>
    </div>
</template>
<script>
    import {
        score_getScoreList
    } from 'api'
    import  {getStorage,setStorage} from './../utils/storage'
    export default {
        data() {
            return {
                scoreList: [],
                isLoading: false,
                jj: getStorage({name: 'm'})
            }
        },
        methods: {
            onRefresh() {
                this.onLoad();
            },
            onLoad() {
                return score_getScoreList().then(r => {
                    this.scoreList = r.data.map(el=>{
                        console.log(el);
                        el.rate = Math.round(el.zf / el.sjzf * 100);
                        return el;
                    });
                    this.isLoading = false
                }).catch(e => {

                })
            },
            initPage() {
                setStorage({name: 'm',content: new Date()})
                console.log( getStorage({name: 'm'}).getTime() );
                this.onLoad();
            }
        },
        created() {
            this.initPage();

        }

    }
</script>
<style lang="less">
    .SCORE-PAGE {
        padding: 5px 10px 0;

        // box-sizing: border-box;
        // width: 94%;
        // margin: 0 auto;
        .score-list {
            // min-height: 70vmax;
        }
    }
</style>