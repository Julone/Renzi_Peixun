<template>
    <div class="SCORE_MODULE">
         <header>
        <h1>成绩中心</h1>
      </header>
      <main class="score-list">
        <van-empty v-if="scoreList.length == 0 " description="暂无成绩" >
            <van-button type="info" round plain :to="{path: '/'}">开始学习</van-button>
        </van-empty>
        <div class="score-item" v-for="(el,index) in scoreList" :key="index">
            <van-cell clickable :title="el.sjName">
                {{el.zf+'/'+ el.sjzf}}
            </van-cell>
        </div>
      </main>
    </div>
</template>
<script>
import {score_getScoreList} from 'api' 
export default {
    data(){
        return  {
            scoreList: []
        }
    },
    methods:{
        initPage(){
            return score_getScoreList().then(r=>{
                this.scoreList = r.data;
            }).catch(e => {
                
            })
        }
    },
    created(){
        this.initPage();
        
    }
    
}
</script>
<style lang="less">
.SCORE_MODULE {
    width: 94%;
    margin: 0 auto;
}
</style>