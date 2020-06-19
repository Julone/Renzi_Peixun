<template>
    <div class="PROGRESS_MODULE">
            <header>
        <h1>学习进度</h1>
        <van-divider></van-divider>

        </header>
        <main>
            <ul>
                
                    <li  v-for="el in progressList" :key="el">
                        <h3>{{el.course_name}}</h3>
                        <ol style="margin-left:20px">
                            <li  v-for="ele in el.chapterRecordList" :key="ele">
                                {{ele.chapter_name}} 总进度: {{ele.chapter_progress}}%
                                <ol style="margin-left:20px">
                                    <li v-for="v in ele.videoRecordList" :key="v">
                                        {{v.video_name}} 进度: {{v.video_progress}} %
                                    </li>
                                </ol>
                            </li>
                        </ol>

                    </li>
                    </ul>
        </main>
     

        
    </div>
</template>
<script>
    import {
        progress_getUserStudyProgress
    } from 'api';

    export default {
        data(){
            return {
              progressList: [],  

            }
        },
        methods: {
            getUserData() {
                return progress_getUserStudyProgress(1).then(r => {
                    console.log(r);
                    this.progressList = r.data;
                }).catch(e => {

                })
            },
        },
        async created() {
            this.getUserData();
        }
    }
</script>
<style lang="less">
.PROGRESS_MODULE {
    header{
        width: 94%;
        margin: 0 auto;
    }
    main{
        width: 94%;
        margin: 0 auto;
 li{
        margin: 10px auto;
    }
    }
   
}
</style>