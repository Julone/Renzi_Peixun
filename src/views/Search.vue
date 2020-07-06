<template>
    <div class="SEARCH-PAGE MODULE">
         <van-search
            v-model="key_word"
            show-action
            placeholder="请输入搜索关键词"
            @search="onSearch"
        >
        <template #left> 
            <div class="backBtn" @click="$store.dispatch('app_go_back')" >
               <van-icon name="arrow-left" /> 返回
            </div>
        </template>
          <template #action>
            <div @click="onSearch" class="searchBtn">搜索</div>
        </template>
        </van-search>
        
        <template v-if="!isSearch">
            <div>
                      <van-list v-if="courseList.length">
            <van-cell v-bind="{border: index != courseList.length - 1}" v-for="(el,index) in courseList" :key="el.id"
                :title="el.teacher + '-' + el.course_name" :label="el.info" is-link
                @click="onCourseClick(el)">
                <!-- <img v-lazy="el.image" width="100%" :alt="el.course_name"> -->
                <van-image height="80" width="100%" lazy-load :src="el.image" fit="scale-down">
                    <template v-slot:loading>
                    <van-loading type="circular" color="#1989fa" size="40" />
                    </template>
                </van-image>
            </van-cell>
            <van-divider>没有更多了</van-divider>
        </van-list>
        <van-empty class="EmptyPanel" v-if="!courseList.length" description="查不到课程"></van-empty>
            </div>
        </template>
  
    </div>
</template>
<script>
import {search_getServerTime} from 'api';
export default {
    data(){
        return {
            key_word: this.$route.query.key_word,
            courseList: [],
            isSearch: false
        }
    },
    watch:{
        isSearch(val){
            this.$toast.clear();
            val && this.$toast.loading('正在查询');
        }
    },
    methods: {
        onCancel(e){
            this.$router.go(-1)
        },
        onSearch(){
            this.isSearch = true
            setTimeout(()=>{
                search_getServerTime(this.key_word).then(r=>{
                    this.courseList = r.data.courseList;
                }).catch(e=>{

                }).finally(()=>{
                    this.isSearch = false;
                })
            },500)
        },
        onCourseClick(el){
            this.$store.dispatch('home_add_course_record', el)
            this.$router.push({name: 'videoByCourseId', params: {k_id: el.id} });
        },
    },
    created(){
        this.onSearch();
    }
}
</script>
<style lang="less">
.SEARCH-PAGE{
    .van-search{
        padding: 10px 0;
    }
    .backBtn{
        .flex();
        padding-right:10px;
        font-size: .4rem;
        color: @j_main_color !important;
    }
    .searchBtn{
        font-size: .4rem;
    }
}

</style>