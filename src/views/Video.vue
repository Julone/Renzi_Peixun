<template>
    <div class="VIDEO-PAGE NO_PADDING">
        <div class="top">
            <van-nav-bar style="width:100%" :title="courseInfo.course_name" left-text="返回" left-arrow
                @click-left="$store.dispatch('app_go_back')">
                <template #right>
                    <van-icon class="rotate360" @click="$eventBus.$emit('refreshView',400)" name="replay"
                        size=".5rem" />
                </template>
            </van-nav-bar>
            <div class="video_container">
                <video ref="video_dom" :key="video_id" :src="video_url" :poster="video_poster" autoplay controls
                    width="100%" x5-playsinline playsinline webkit-playsinline></video>
            </div>
        </div>

        <div class="main">
            <van-tabs ref="vanTab" scrollspy :swipeable="activeTab !='comment'" animated :offset-top="350"
                v-model="activeTab" color="rgb(25,137,250)">
                <van-tab name="info" title="课程信息">
                    <div class="course_info">
                        <!-- {{courseInfo}} -->
                        <van-cell :label="courseInfo.info">
                            <b slot="title" style="font-size:2em;line-height:2.2em">
                                {{courseInfo.course_name || "课程名称"}}
                            </b>
                        </van-cell>
                        <van-cell title="课程老师">
                            {{courseInfo.teacher}}
                        </van-cell>
                        <van-cell title="课程评分">
                            <van-rate v-model="courseInfo.course_rate" />
                        </van-cell>
                        <van-cell title="课程考试"
                            v-bind='courseInfo.paper != -1 ? { "is-link":true ,to: { name: "test_page", params: {paper_id: courseInfo.paper_id} } }: null'>
                            <span v-if="courseInfo.paper == -1" @click.stop>该课程已考过
                                <van-button size="medium" type="danger" :to='{ name: "test_page", params: {paper_id: courseInfo.paper_id} }'>模拟考试</van-button>
                            </span>
                            <span v-else style="color:#1989fa">前往考试</span>
                        </van-cell>
                    </div>
                </van-tab>
                <van-tab name="video" title="视频列表">
                    <div class="chapters-list">
                        <van-collapse v-model="activeVideo">
                            <van-collapse-item :name="ele.id" v-for="ele in chapters" :key="ele.id">
                                <template #title>
                                    <div style="font-size:.6rem;padding-left:5px;">
                                        {{ele.chapter_name}}
                                    </div>
                                </template>
                                <div align="center" v-if="ele.videos.length == 0"> 暂无视频 </div>
                                <div class="video-item" v-else v-for="(v,index) in ele.videos" @click="playVideo(v,ele)"
                                    :key="index">
                                    <van-cell clickable :label="v.id == video_id? '点击开始学习': ''"
                                        icon-prefix="play-circle-o"
                                        :title-style="{color: v.id == video_id? '#1989fa' : ''}">
                                        <template #title>
                                            <div class="flexbox">
                                                <div class="left">
                                                    <van-icon name="notes-o" />
                                                    {{v.video_name}}
                                                </div>
                                                <div class="right">
                                                    {{v.video_progress}}%
                                                </div>
                                            </div>
                                        </template>
                                    </van-cell>
                                </div>
                            </van-collapse-item>
                        </van-collapse>
                    </div>
                </van-tab>
                <van-tab name="comment" title="课程评论">
                    <van-pull-refresh v-model="commentLoading" success-text="刷新成功" :head-height="50"
                        @refresh="getCommentList">
                        <van-list>
                            <!-- <div style="width:90%;margin:10px auto 0"> -->
                                <van-notice-bar left-icon="volume-o" text="在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。"
                                    mode="closeable" />
                            <!-- </div> -->

                            <van-button class="sendCommentBtn" type="info" block
                                @click="openDialog({parentId: '',parentUserName: ''})">我也要评论</van-button>
                            <transition-group name="van-slide-right">

                                <div class="list-item" v-for="(el) in commentList" :key="el.id">
                                    <video-com-item :el="el" className="parentNode" :parentId="el.id"
                                        :parentName="el.userName" :refreshMethod="getCommentList"
                                        :openDialog="openDialog" />
                                    <!--父节点-->
                                    <transition-group name="van-slide-right">
                                        <video-com-item v-for="(ele,index) in el.children"
                                            v-show="el.expandAll? true :index < 6" :key="ele.id" :el="ele"
                                            className="childNode" :parentId="el.id" :erji="true"
                                            :parentName="ele.userName" :refreshMethod="getCommentList"
                                            :openDialog="openDialog" />
                                        <!--子节点-->
                                    </transition-group>
                                    <div class="expandBtn van-button" v-if=" el.children.length > 6"
                                        @click="el.expandAll = !el.expandAll">
                                        <span v-show="!el.expandAll">
                                            <van-icon name="arrow-down" /> 展开评论</span>
                                        <span v-show="el.expandAll">
                                            <van-icon name="arrow-up" /> 收起评论</span>
                                    </div>
                                </div>
                            </transition-group>

                            <van-divider>没有更多了</van-divider>

                        </van-list>

                        <van-popup v-model="showReply" transition="van-slide-up" get-container="body"
                            safe-area-inset-bottom position="bottom" close-on-popstate :style="{ height: '5.3rem'}"
                            @closed="$eventBus.$emit('triggerScroll', {})">
                            <div class="reply-component" style="padding:10px;margin-top:5px">
                                <van-field v-model="commentContent" rows="3" type="textarea" maxlength="100"
                                    :placeholder="ReplyPlaceholder" show-word-limit clickable />
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
        video_getCourseDetail,
        video_getCommentById,
        video_saveVideoProgress,
        video_addCommentByInfo
    } from 'api'
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
                activeVideo: [],
                chapters: [],
                courseInfo: {},
                video_url: '',
                video_name: '',
                video_poster: '',
                video_id: 0,
                activeTab: '',
                showReply: false,
                commentList: [],
                courseId: 0,
                chapterId: 0,
                commentLoading: false,
                parentId: null,
                parentUserName: null,
                commentContent: '',
                curVideoInfo: {},
                lastVideoProcess: 0
            }
        },
        props: ['v_id', 'c_id', 'k_id'],
        computed: {
            ReplyPlaceholder() {
                return this.parentUserName ? '回复 ' + this.parentUserName + ' ' : '我要评论'
            }
        },
        methods: {

            openDialog({
                parentId,
                parentUserName
            }) {
                this.showReply = true;
                this.parentId = parentId;
                this.parentUserName = parentUserName;
            },
            submitComment() {
                if (this.commentContent.trimEnd() == "") {
                    return this.$toast('请输入评论内容!');
                }
                var l = this.$toast.loading();
                return video_addCommentByInfo({
                    parentId: this.parentId,
                    parentUserName: this.parentUserName,
                    content: this.commentContent,
                    courseId: this.k_id
                }).then(r => {
                    l.close();
                    r.errcode == 0 ? this.$toast.success(r.errmsg) : this.$toast.fail(r.errmsg)
                    this.commentContent = "";
                }).catch(e => {
                    console.log(e);
                    this.$toast.fail('评论发送失败!')
                }).finally(() => {
                    this.showReply = false;
                    this.getCommentList();

                })
            },
            startInterval() {
                return setInterval(() => {
                    var p = this.lastVideoProcess;
                    // console.log('progres' + p);
                    this.saveProgress(p);
                }, 5 * 1000)
            },
            async playVideo(v, c) {
                //onchange
                this.video_url = v.video_url;
                this.video_name = v.video_name;
                this.chapterId = c.id;
                this.video_id = v.id;
                if (this.v_id != v.id) { //点击视频与现在视频不一样
                    this.saveProgress(this.lastVideoProcess);
                    this.$router.replace({
                        name: 'videoByVideoId',
                        params: {
                            v_id: v.id,
                            c_id: c.id
                        }
                    });
                    this.lastVideoProcess = 0;
                }
                await this.$nextTick();
                var videoDOM = this.$refs.video_dom;
                videoDOM.addEventListener('timeupdate', () => {
                    var ratio = Math.round(videoDOM.currentTime / videoDOM.duration * 100);
                    v.progress = isNaN(v.progress) ? 0 : ratio;
                    this.lastVideoProcess = v.progress;
                    if (v.video_progress == 100) {
                        clearInterval(this.progressTimer);
                    } else {
                        v.video_progress = Math.max(v.video_progress, v.progress);
                    }
                }, false)
                videoDOM.addEventListener('ended', () => {
                    this.saveProgress(100);
                    clearInterval(this.progressTimer);
                }, false)
                videoDOM.addEventListener('pause', () => {
                    clearInterval(this.progressTimer);
                })
                videoDOM.addEventListener('play', () => {
                    clearInterval(this.progressTimer)
                    this.progressTimer = this.startInterval();
                    if (v.video_progress > 0 && v.video_progress < 98 && v.isAutoAnchor) {
                        console.log(v);
                        videoDOM.currentTime = (isNaN(videoDOM.duration) ? 0 : videoDOM.duration) * v
                            .video_progress / 100;
                        v.isAutoAnchor = false;
                    }
                })
            },
            saveProgress(progress = 0) {
                var _this = this
                video_saveVideoProgress({
                    courseId: _this.courseId,
                    chapterId: _this.chapterId,
                    videoId: _this.video_id,
                    progress: progress
                }).then(r => {
                    // console.log(r);
                })
            },
            getCommentList() {
                return video_getCommentById(this.k_id).then(r => {
                    this.commentList = r.data.map(function mapChildren(el) {
                        el.createAt = timeAgo(el.createAt);
                        el.expandAll = false;
                        el.children = el.children ? el.children : []
                        if (el.children && el.children.length) {
                            el.children = el.children.map(mapChildren);
                        }
                        return el;
                    })
                    this.commentLoading = false;
                }).catch(e => e)
            },
            getVideoInfo() {
                return video_getCourseDetail({
                    c_id: this.k_id,
                    v_id: this.v_id
                }).then(r => {
                    this.chapters = r.data.chapters.map(el => {
                        el.progress = 0;
                        el.videos.map(v => {
                            v.isAutoAnchor = true; //首次自动定位
                            v.video_progress = v.video_progress || 0;
                            return v;
                        })
                        return el;
                    });
                    var courseInfo = r.data.courseInfo;
                    let curVideoInfo = r.data.curVideoInfo;
                    this.courseId = courseInfo.id;
                    if (this.v_id) {
                        this.activeTab = "video";
                        this.activeVideo = [curVideoInfo.chapter_id];
                        this.video_id = curVideoInfo.id;
                        // this.video_url = curVideoInfo.video_url;
                        this.video_poster = curVideoInfo.image;
                    } else {
                        this.video_poster = courseInfo.image;
                    }
                    this.$set(this.$data, 'courseInfo', {
                        ...courseInfo,
                        course_rate: 5
                    });
                    this.$set(this.$data, 'curVideoInfo', {
                        ...curVideoInfo
                    });

                })
            }
        },
        created() {
            this.getVideoInfo();
            this.getCommentList();
        },
        beforeDestroy() {
            clearInterval(this.progressTimer)
        }
    }
</script>
<style lang="less">
    // .reply-component{
    // padding:10px;margin-top:5px;
    // .flex(@d:column);
    // .van-cell{
    //     flex:1
    // }
    // .van-button{
    //     flex:none
    // }
    // }
    .VIDEO-PAGE {

        .flex(@d: column; @j: flex-start; @a: stretch);
        .wh100();
        // min-height: 100% !important;

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

        .top {
            flex: none;
        }

        .main {
            flex: 1;
            width: 100%;
            overflow: auto;
            // height: 300px;

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
                    // padding: 0px 5px 0;
                    flex: 1;
                    align-self: stretch;
                    box-sizing: border-box;
                    overflow-x: hidden;

                    .van-tab__pane-wrapper {
                        overflow-y: auto;

                        .van-pull-refresh__track {
                            min-height: 40vmax;
                        }
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

                .video-item {
                    .van-cell {
                        padding: 5px;
                        ;
                    }
                }

                .van-cell__title {
                    font-size: 20px;
                    letter-spacing: 1px;

                    .flexbox {
                        font-size: .45rem;
                        .flex(@j: space-between; @a: flex-start);

                        .right {
                            flex: none;
                            margin-left: 10px;
                            ;
                        }
                    }
                }

                .van-cell__value {
                    font-size: 20px;
                }
            }

            .sendCommentBtn {
                .flex();
                box-shadow: none;
                width: 90%;
                margin: 14px auto 5px;
                height: 40px;
                // position: sticky;
                // bottom: 5px;
            }

            .list-item {
                box-shadow: 0px 12px 20px 0 #00000017;
                // padding: 0 4px;
                // border: 1px solid red;
                width: 90%;
                // border-radius: 3px;
                margin: 15px auto 20px;
                border: 1px solid rgba(128, 128, 128, 0.333);
                // border-left: 5px solid #6799cc;

                // border: 1px solid gray;
                .van-swipe-cell {
                    &:not(:last-child) {
                        // border-bottom: 1px solid rgba(128, 128, 128, 0.279);
                    }
                }

                .van-swipe-cell__right {
                    right: -2px;

                    button {
                        height: 100%;
                    }
                }

                .expandBtn {
                    height: 35px;
                    .flex();

                    span {
                        .flex();
                    }

                    color: @j_main_color;
                    font-size: 12px;

                }

                .comment-item {

                    .title {
                        font-size: .7em;
                        .flex(@j: space-between);
                        color: rgb(98, 98, 98);

                        .left {
                            word-break: break-all;
                            // text-transform: uppercase;
                        }

                        .right {
                            flex: none;
                            align-self: stretch;
                        }
                    }

                    .content {
                        margin: 5px auto 2px;
                        width: 100%;
                        word-break: break-word;
                        text-align: justify;
                        font-size: .9em;
                        line-height: 1.4em;

                        &:active {
                            background: rgba(128, 128, 128, 0.1);
                        }
                    }

                    padding: 9px;
                    margin: 0 auto;
                    height: auto;

                    &.parentNode {
                        border-left: 5px solid #6799cc;

                        // border-left: 3px solid rgb(59, 108, 253);
                        // background: rgb(226, 226, 226);
                    }

                    &.childNode {
                        // padding-left: 20px;
                        border-left: 5px solid #67cc99;
                        border-top: 1px solid rgba(128, 128, 128, 0.279);

                        // margin-left: 5px;;
                        // &::before {
                        //     content: '';
                        //     width: 10px;
                        //     height: 10px;
                        //     background: rgb(230, 230, 230);
                        //     display: block;
                        //     position: absolute;
                        //     left: 2px;
                        //     border-radius: 10px;
                        // }

                        // border-left: px solid rgb(90, 92, 99);
                    }
                }
            }
        }

    }
</style>