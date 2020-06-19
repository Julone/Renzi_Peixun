<template>
    <div class="VIDEO_MODULE">
        <van-sticky>
            <van-nav-bar style="width:100%" title="培训考试" left-text="返回" left-arrow @click-left="onClickLeft">
            </van-nav-bar>
            <div class="video_container">

                <video ref="video" :src="video_url" poster="https://cdn4.buysellads.net/uu/1/3386/1525189943-38523.png"
                    autoplay controls width="100%" x5-playsinline playsinline webkit-playsinline></video>
            </div>
        </van-sticky>

        <div class="main">
            <van-tabs v-model="activeTab" swipeable color="rgb(25,137,250)">
                <van-tab name="info" title="课程信息">
                    <div class="course_info">
                        <h1>课程名称: {{courseInfo.course_name}}
                            <van-button type="info" :to="{name: 'test_page'}">前往考试</van-button>
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
                                <div v-else v-for="(v,index) in ele.videos" @click="playVideo(v)" :key="index">
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
                <van-tab name="comment" title="评论信息">
                    评论
                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>
<script>
    import {
        home_getCourseList,
        home_getCourseDetail
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

    export default {
        data() {
            return {
                activeNames: [],
                chapters: [],
                courseInfo: {},
                video_url: '',
                video_name: '',
                activeTab: 'info',
            }
        },
        props: ['v_id'],
        methods: {
            onClickLeft() {
                this.$router.push('/')
            },
            async playVideo(v) {
                console.log(v);
                var {
                    video_url,
                    video_name
                } = v;
                this.video_url = video_url;
                this.video_name = video_name;
                v.isPlaying = true
                await this.$nextTick();
                var video = this.$refs.video;
                console.dir(this.$refs.video);
                video.addEventListener('timeupdate', function () {
                    var time = video.currentTime;
                    v.progress = time / video.duration * 100
                    setStorage({
                        name: 'video_cur_percent',
                        content: time / video.duration * 100
                    })
                    // console.log('current: ' + time);
                    // console.log('percent: ' + time / video.duration * 100);
                }, false)
                video.addEventListener('ended', function () {
                    var time = Math.floor(video.currentTime);
                    console.log('end current: ' + time);
                    console.log('end percent: ' + time / video.duration * 100);
                }, false)
            }
        },
        created() {
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
                this.$set(this.$data, 'courseInfo', {
                    course_name,
                    id,
                    info,
                    paper_id,
                    teacher,
                    course_rate: 5
                })
            })
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
            height: 220px;
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
                .van-sticky {
                    position: sticky;
                    top: 0;
                }

                .wh100;

                .van-tabs__wrap {
                    position: sticky;
                    top: 0;
                    z-index: 100;
                    // border-bottom: 1px solid red
                    box-shadow: 0 0 39px -10px #0000002e
                }

                .van-tabs__content {
                    //         overflow-y: auto;
                    min-height: 300px;
                    padding: 10px 15px;
                    box-sizing: border-box;
                    overflow-x: hidden;
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
        }

    }
</style>