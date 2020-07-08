<template>
    <div class="SCORE-PAGE MODULE">
        <van-pull-refresh  success-text="已获取最新成绩" v-model="isLoading" @refresh="onRefresh">

            <header>
                <app-title>成绩中心</app-title>
                <!-- <h1 class="page-title">成绩中心</h1> -->
            </header>
            <main class="score-list">
                
                <div class="score-item" @click="onScoreClick(el)" v-for="(el,index) in scoreList" :key="index">
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
        <van-popup v-model="showPaper">
                <div class="paper-container">
                    <ul>
                        <li v-for="el in tmList" :key="el">
                            <!-- {{el}} -->
                            
                            <div class="jianda" v-if="el.tmType == 'J'" type="简答题">
                                <div class="title">{{el.tmSort}}: {{el.tmName}} (得分：{{el.tmDefen}})</div>
                                <ol>
                                    <li>
                                        你的答案：{{el.userAnswer}}
                                    </li>
                                    <li>
                                        参考答案：{{el.rightAnswer}}
                                    </li>
                                </ol>
                                <!-- <p class="info">你的答案：{{el.userAnswer}} , 正确答案：{{el.rightAnswer}}</p> -->

                            </div>
                            <div class="duoxuan" v-if="el.tmType== 'D'" type="多选题">
                                <div class="title">{{el.tmSort}}: {{el.tmName}} (得分：{{el.tmDefen}})</div>
                                <ol>
                                    <li v-for="o in el.options" :class="o.className" :key="o.id">
                                        {{o.xx}}.{{o.xxName}}
                                    </li>
                                </ol>
                                <p class="info">你的答案：{{el.userAnswer}} , 正确答案：{{el.rightAnswer}}</p>
                            </div>
                            <div class="xuanzhe" v-if="el.tmType== 'X'" type="选择题">
                                <div class="title">{{el.tmSort}}: {{el.tmName}} (得分：{{el.tmDefen}})</div>
                                <ol>
                                    <li v-for="o in el.options" :class="o.className" :key="o.id">
                                        {{o.xx}}.{{o.xxName}}
                                    </li>
                                </ol>
                                <p class="info">你的答案：{{el.userAnswer}} , 正确答案：{{el.rightAnswer}}</p>

                            </div>
                            <div class="panduan" v-if="el.tmType== 'P'" type="判断题">
                                <div class="title">{{el.tmSort}}: {{el.tmName}} (得分：{{el.tmDefen}})</div>
                                <ol>
                                    <li v-for="o in el.options" :class="o.className" :key="o.id">
                                        {{o.xx}}.{{o.xxName}}
                                    </li>
                                </ol>
                                <p class="info">你的答案：{{el.userAnswer}} , 正确答案：{{el.rightAnswer}}</p>

                            </div>
                        </li>
                    </ul>
                </div>
            </van-popup>
    </div>
</template>
<script>
    import {
        score_getScoreList,
        score_getTestResult,
        test_getTestPage
    } from 'api'
    import  {getStorage,setStorage} from './../utils/storage'
    export default {
        data() {
            return {
                scoreList: [],
                isLoading: false,
                jj: getStorage({name: 'm'}),
                showPaper: false,
                tmList: []
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
            onScoreClick(val){
                console.log(val);
                this.showPaper = true;
                test_getTestPage(val.sjid).then(r1=>{
                    // console.log(r);
                    if(r1.errcode == 0) {
                        score_getTestResult(val.sjid).then(r2=>{
                            if(r2.errcode == 0) {
                                r1.data.tms.forEach(el=>{
                                    var cur = r2.data.find(el2=>el2.tmSort == el.tmSort);
                                    el.rightAnswer = cur.tmResult;
                                    el.tmZonfen = cur.tmfz;;
                                    el.tmDefen = cur.df;
                                    el.userAnswer = cur.dt;
                                    el.options.forEach(o => {
                                        o.className = { 
                                            right: el.rightAnswer.includes(o.xx),
                                            userSelect: el.userAnswer.includes(o.xx) 
                                        }
                                    })
                                });
                                this.tmList = r1.data.tms;
                                console.log(this.tmList);
                            }
                        })
                    }else{
                        this.$toast.fail('查看试卷失败！')
                    }
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
        .van-popup{
            background: transparent;
        }
        .paper-container{
            width: 90vw;
            height: 70vh;
            display: block;
            overflow-y: auto;
            border-radius: .2rem;
            background: white;
            padding: 5px 10px;
            box-sizing: border-box;
            ul{
                &>li{
                    .title{
                        font-size: .5rem;
                    }
                    // border:1px solid gray;
                    padding: 10px 5px;;
                    margin: 10px auto 15px;
                    box-shadow:0 8px 12px #ebedf0;
                    .panduan{
                        ol{
                            .flex(@j:flex-start;);
                            li{
                                width: 50%;
                                padding: 5px 0 0;
                                box-sizing: border-box;
                            }
                        }
                    }
                    .jianda{
                        li{
                            line-height: .6rem;
                            font-size: .4rem;
                        }
                    }
                    .xuanzhe,.duoxuan{
                        ol{
                            .flex(@j:space-between;@w:wrap);
                            li{
                                // display: inline-block;
                                // flex: 1;
                                width:100%;
                                // white-space: nowrap;
                                // .flex(@w:wrap);
                            }

                        }
                       
                    }
                    ol{
                        &>li{
                            &.right{
                                background: @j_success_color !important;
                                color: white;
                                
                                // border-radius: 10px;
                            };
                            &.userSelect{
                                background: gray;
                            }
                            font-size: .45rem;
                            margin-bottom: 4px;
                            line-height: .8rem;
                            letter-spacing: 1px;;
                        }
                    }
                }
            }
            p.info{
                font-size: .5rem;
            }
        }
    }
</style>