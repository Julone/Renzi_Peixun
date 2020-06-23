<template>
    <div class="VIDEO_MODULE">
        <van-sticky>

        <van-nav-bar style="width:100%" title="培训考试" left-text="返回" left-arrow @click-left="onClickLeft">
        </van-nav-bar>
        <div class="video_container">
            <video ref="video" :key="video_url" :src="video_url"
                poster="https://cdn4.buysellads.net/uu/1/3386/1525189943-38523.png" autoplay controls width="100%"
                x5-playsinline playsinline webkit-playsinline></video>
        </div>
        </van-sticky>


        <div class="main">
            <van-tabs ref="vanTab" scrollspy  @change="tabChange" animated :offset-top="350" v-model="activeTab" color="rgb(25,137,250)">
                <van-tab name="info" title="课程信息">
                    <div class="course_info">
                        <h1>课程名称: {{courseInfo.course_name}}
                            <van-button type="info" :to="{name: 'test_page', params: {paper_id: courseInfo.paper_id}}">前往考试</van-button>
                        </h1>
                        <div>
                            评分:
                            <van-rate v-model="courseInfo.course_rate" />
                        </div>
                    </div>
                </van-tab>
                <van-tab name="video" title="视频列表">
                    <div class="chapters-list">
                        <van-collapse v-model="activeNames">
                            <van-collapse-item :name="ele.id" :title="ele.chapter_name" v-for="ele in chapters"
                                :key="ele.id">
                                <div align="center" v-if="ele.videos.length == 0"> 暂无视频 </div>
                                <div v-else v-for="(v,index) in ele.videos" @click="playVideo(v,ele)" :key="index">
                                    <van-cell :title="v.video_name" clickable
                                        :label="v.video_url == video_url? '正在播放中': ''">
                                        <van-icon name="play-circle-o" v-if="v.video_url != video_url" />
                                        <van-icon name="pause-circle-o" v-else />
                                    </van-cell>
                                </div>
                            </van-collapse-item>
                        </van-collapse>
                    </div>
                </van-tab>
                <van-tab name="comment" title="课程评论">
                    <van-pull-refresh v-model="commentLoading" @refresh="getCommentList">
                        <van-list>
                            <van-button class="sendCommentBtn" type="info" block
                                @click="openDialog({parentId: '',parentUserName: ''})">我也要评论</van-button>
                            <div class="list-item" v-for="(el,ind) in commentList" :key="ind">
                                <van-swipe-cell>
                                    <div class="comment-item parentNode">
                                        <div class="title">
                                            <div class="left">
                                                {{el.userName}}
                                            </div>
                                            <div class="right">
                                                {{el.createAt}}
                                            </div>
                                        </div>
                                      
                                        <div class="content">
                                            {{el.content}}
                                        </div>
                                    </div>
                                    <template #right>
                                        <van-button square text="回复"
                                            @click="openDialog({parentId: el.id,parentUserName: el.userName})"
                                            type="info" />
                                    </template>
                                </van-swipe-cell>
                                <van-swipe-cell v-for="(ele,index) in el.children"
                                    v-show="el.expandAll? true :index < 3" :key="index">
                                    <div class="comment-item childNode">
                                       <div class="title">
                                            <div class="left">
                                            {{ele.userName}} 回复了 {{ele.parentUserName}}
                                        </div>
                                        <div class="right">
                                            {{ele.createAt}}
                                        </div>
                                       </div>
                                        <div class="content">
                                            {{ele.content}}
                                        </div>
                                    </div>
                                    <template #right>
                                        <van-button square text="回复"
                                            @click="openDialog({parentId: el.id,parentUserName: ele.userName})"
                                            type="info" />
                                    </template>
                                </van-swipe-cell>

                                <div class="expandBtn" v-if=" el.children.length > 3"
                                    @click="el.expandAll = !el.expandAll">
                                    <span v-show="!el.expandAll">展开评论</span>
                                    <span v-show="el.expandAll">收起评论</span>
                                </div>
                            </div>
                            <van-divider>没有更多了</van-divider>
                        </van-list>
                        <van-popup v-model="showReply" get-container="body" closeable round position="bottom"
                         :style="{ height: '35vh' }">
                            <div style="padding:10px;margin-top:40px;">
                                {{parentId}} {{parentUserName}}
                                <van-field v-model="commentContent" rows="3" type="textarea" maxlength="100"
                                    placeholder="请输入评论" show-word-limit autofocus clickable/>
                                <van-button type="info" block @click="submitComment">评论</van-button>
                            </div>
                        </van-popup>
                    </van-pull-refresh>

                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>
<script>
    import {
        home_getCourseList,
        home_getCourseDetail,
        video_getCommentById,
        video_saveVideoProgress,
        video_addCommentByInfo
    } from '@/global/api'
    import Vue from 'vue';
    import {
        Swipe,
        SwipeItem,
        Rate
    } from 'vant';
    Vue.use(Swipe).use(SwipeItem).use(Rate)
    import {
        setStorage,
        getStorage
    } from './../utils/storage'
    import {
        timeAgo
    } from './../utils/utils'

    export default {
        data() {
            return {
                activeNames: [],
                chapters: [],
                courseInfo: {},
                video_url: '',
                video_name: '',
                activeTab: 'info',
                showReply: false,
                commentList: [],
                courseId: 0,
                chapterId: 0,
                videoId: 0,
                commentLoading: false,
                parentId: null,
                parentUserName: null,
                commentContent: ''
            }
        },
        props: ['v_id'],
        methods: {
            tabChange(){
           },
            onClickLeft() {
                this.$router.push('/')
            },
            openDialog({
                parentId,
                parentUserName
            }) {
                this.showReply = true;
                this.parentId = parentId;
                this.parentUserName = parentUserName;
            },
            submitComment() {
                var l = this.$toast.loading()
                return video_addCommentByInfo({
                    parentId: this.parentId,
                    parentUserName: this.parentUserName,
                    content: this.commentContent,
                    courseId: this.v_id
                }).then(r => {
                    r.errcode == 0 ? this.$toast.success(r.errmsg) : this.$toast.fail(r.errmsg)
                    l.close();
                }).catch(e => {
                    this.$toast.fail(e)
                }).finally(() => {
                    this.parentId = '';
                    this.parentUserName = '';
                    this.commentContent = "";
                    this.showReply = false;
                    this.getCommentList();
                })
            },
            async playVideo(v, c) {
                console.log(v);
                var {
                    video_url,
                    video_name
                } = v;
                this.video_url = video_url;
                this.video_name = video_name;
                v.isPlaying = true;
                this.chapterId = c.id;
                this.videoId = v.id
                await this.$nextTick();
                var video = this.$refs.video;
                 setStorage({
                    name: 'video_max_percent',
                    content: 0
                })
                this.progressTimer= setInterval(()=>{
                     var p = getStorage({name: 'video_max_percent'});
                     console.log('progres' + p);
                     this.saveProgress(p);
                },10 * 1000)
                video.addEventListener('timeupdate', function () {
                    var time = video.currentTime;
                    v.progress = time / video.duration * 100;
                    if(v.progress > getStorage({name: 'video_max_percent'})){
                        setStorage({
                            name: 'video_max_percent',
                            content: time / video.duration * 100
                        })
                    }
                }, false)
                var _this = this
                video.addEventListener('ended', function ad() {
                    _this.saveProgress();
                    clearInterval(this.progressTimer)
                    // video.removeEventListener('ended', ad,false);    
                }, false)

            },
            saveProgress(progress = 100) {
                var _this = this
                video_saveVideoProgress({
                    courseId: _this.courseId,
                    chapterId: _this.chapterId,
                    videoId: _this.videoId,
                    progress: progress
                }).then(r => {
                    console.log(r);
                })
            },
            getCommentList() {
                return video_getCommentById(this.v_id).then(r => {
                    this.commentList = r.data.map(function mapChildren(el) {
                        el.createAt = timeAgo(el.createAt);
                        el.expandAll = false;
                        if (el.children.length) {
                            el.children = el.children.map(mapChildren);
                        }
                        return el;
                    })
                    this.commentLoading = false;
                }).catch(e => e)
            }
        },
        created() {
            this.getCommentList()
            home_getCourseDetail(this.v_id).then(r => {
                this.chapters = r.data.chapters.map(el => {
                    el.isPlaying = false;
                    el.progress = 0;
                    return el;
                });
                var {
                    course_name,
                    id,
                    info,
                    paper_id,
                    teacher
                } = r.data;
                this.courseId = id
                this.$set(this.$data, 'courseInfo', {
                    course_name,
                    id,
                    info,
                    paper_id,
                    teacher,
                    course_rate: 5
                })
            })
        },
        beforeDestroy(){
            clearInterval(this.progressTimer)
        }
    }
</script>
<style lang="less">
    .VIDEO_MODULE {
        .flex(@d: column; @j: flex-start; @a: stretch);
        .wh100();

        .video_container {
            // position: sticky;
            top: 0;
            background: black;
            z-index: 111;
            width: 100%;
            flex: none;
            height: 30vh;
            .flex(@d: column);

            video {
                border: 1px solid gray;
                max-width: 100%;
                max-height: 100%;
            }
        }

        .main {
            flex: 1;
            width: 100%;
            overflow: auto;
            height: 300px;

            .van-tabs {

                .flex(@d: column);


                .wh100;
                // height: auto;
                overflow: hidden;

                .van-tabs__wrap {
                    flex: none;
                    z-index: 100;
                    align-self: stretch;
                    // border-bottom: 1px solid red
                    box-shadow: 0 0 39px -10px #0000002e
                }

                .van-tabs__content {
                    overflow-y: auto;
                    // min-height: 300px;
                    padding: 10px 5px;
                    flex: 1;
                    align-self: stretch;
                    box-sizing: border-box;
                    overflow-x: hidden;
                    .van-tab__pane-wrapper {
                        overflow-y: auto;
                    }
                }

            }

            .chapter-item {
                border: 1px solid red;
                margin: 30px auto;
                padding: 10px;
                width: 90%;

            }

            .chapters-list {
                flex: 1;
                width: 100%;
                overflow-y: auto;

                .van-cell__title {
                    font-size: 20px;
                    letter-spacing: 1px;
                }

                .van-cell__value {
                    font-size: 20px;
                    ;
                }
            }

            .sendCommentBtn {
                box-shadow: none;
                width: 90%;
                margin: 0 auto;
                // background: rgb(91, 91, 91);
                height: 40px;
                .flex();

            }

            .list-item {
                box-shadow: 0px 12px 20px 0 #00000017;
                // padding: 0 4px;
                // border: 1px solid red;
                width: 90%;
                border-radius: 3px;
                margin: 10px auto 30px;
                border: 1px solid #1989fa40;

                // border: 1px solid gray;
                .van-swipe-cell {
                    &:not(:last-child) {
                        border-bottom: 1px solid rgba(128, 128, 128, 0.279);

                    }
                }

                .van-swipe-cell__right {
                    right: -2px;

                    button {
                        height: 100%;
                    }
                }

                .expandBtn {
                    height: 40px;
                    .flex();
                    color: @j_main_color;
                }

                .comment-item {
                
                    .title {
                        font-size: .8em;
                        .flex(@j: space-between);
                        
                        .left {
                            word-break: break-all;
                            text-transform: uppercase;
                        }

                        .right {
                            flex: none;
                            align-self: stretch;
                        }

                     

                    }
                       .content {
                           margin-top: 5px;
                           width: 100%;
                           word-break: break-word;
                           text-align: justify;
                           font-size: .9em;
                        //    white-space: pre-wrap;

                       }
                        padding: 9px;;


                    margin: 0 auto;
                    // border:1px solid gray;
                    height: auto;
                    ;



                    &.parentNode {
                        // border-left: 3px solid rgb(59, 108, 253);
                        // background: rgb(226, 226, 226);

                    }

                    &.childNode {
                        padding-left: 20px;
                        &::before{
                            content: '';
                            width: 10px;
                            height: 10px;
                            background: rgb(230, 230, 230);
                            display: block;
                            position: absolute;
                            left: 2px;
                            border-radius: 10px;
                        }
                        // border-left: px solid rgb(90, 92, 99);
                    }
                }
            }
        }

    }
</style>