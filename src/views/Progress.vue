<template>
    <div class="PROGRESS_MODULE">
            <header>
        <h1>学习进度</h1>
        <van-divider></van-divider>

        </header>
        <main>
            <ul>
                
                    <li  v-for="(el,index1) in progressList" :key="index1">
                        <h3>{{el.course_name}}</h3>
                        <ol style="margin-left:20px">
                            <li  v-for="(ele,index2) in el.chapterRecordList" :key="index2">
                                {{ele.chapter_name}} 总进度: {{ele.chapter_progress}}%
                                <ol style="margin-left:20px">
                                    <li v-for="(v,index3) in ele.videoRecordList" :key="index3">
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
                    this.progressList = r.data.map(el=>{
                        console.log(el);
                        el.chapterRecordList.forEach(element => {
                            element.chapter_progress = (element.chapter_progress).toFixed(2)
                        });
                        // el.chapter_progress = (el.chapter_progress).toFixed(2)
                        return el
                    })
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