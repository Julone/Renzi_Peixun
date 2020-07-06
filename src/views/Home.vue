<template>
  <div class="HOME-PAGE MODULE">
    <van-pull-refresh v-model="isLoading" success-text="刷新成功" @refresh="onRefresh">
      <header>
       
        <!-- <app-title>课程中心</app-title> -->
        <!-- <h1 class="page-title">课程中心</h1> -->
        <van-search @click="onSearch" v-model="key_word" placeholder="请输入搜索关键词" @search="onSearch" shape="" > </van-search>
      </header>

           
      <!-- 骨架屏 -->
      <div  v-if="isLoading">
          <div class="lunbo-container">
            <div class="lunbo">
              <van-image width="100%" height="100%"></van-image>
            </div>
          </div>
            <div class="LoadPanel">
          <van-cell  v-for="el in 3" :key="el" is-link>
            <template #title> <van-skeleton round  title :row="2" /> </template>
            <van-image width="100%" height="80"></van-image>
          </van-cell>
        </div>   
      </div>
      <!-- 轮播图 -->
      <div v-if="!isLoading" class="lunbo-container">
   <van-swipe class="lunbo" :autoplay="5000" indicator-color="white">
          <van-swipe-item v-for="el in lunboList" @click="onCourseClick(el)" :key="el.id">
            <img :src="el.rotation_image" width="100%" alt="">
          </van-swipe-item>
        </van-swipe>
      </div>

      <!-- list -->
      <van-list :finished="isFinished" @load="onLoad" v-model="listLoading"
       v-if="!isLoading"
        finished-text="没有更多了">
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
      </van-list>
      <!-- 空内容  -->
      <van-empty class="EmptyPanel" v-if="listLoading && !courseList.length" description="暂无课程"></van-empty>
    </van-pull-refresh>
  </div>
</template>

<script>
  import {
    home_getCourseList,
    home_getCourseDetail,
    home_getLunboList
  } from 'api'
  export default {
    data() {
      return {
        courseList: [],
        isLoading: true,
        listLoading: false,
        isFinished: false,
        key_word: '',
        lunboList: [],
        hasError:false
      }
    },
    methods: {
      onError(){
          this.hasError = true;
          this.isLoading = false;
          this.listLoading = false;
          this.isFinished = true;
          this.$toast('加载失败');
      },
      onLoad() {
        return home_getCourseList().then(r => {
          this.courseList.push(...r.data);
          this.listLoading = false;
          this.courseList.length >= 12 && (this.isFinished= true)
        }).catch(this.onError)
      },
      onRefresh() {
        this.courseList = [];
        this.isFinished = false;
        this.getLunboList();
        setTimeout(() => {
          this.onLoad().then(()=>{
          this.isLoading = false
        })
        }, 500)
      },
      onCourseClick(el){
        this.$store.dispatch('home_add_course_record', el)
        this.$router.push({name: 'videoByCourseId', params: {k_id: el.id} });
      },
      onSearch(){
        this.$router.push({name: 'search', query: {key_word: this.key_word} });
      },
      getLunboList(){
        return home_getLunboList().then(r=>{
          r.errcode == 0 && (this.lunboList = r.data.courseList);
        }).catch(this.onError)
      }
    },
    created() {
      this.onRefresh();
    },
    activated() {
      if (this.$route.meta.keepAlive && this.$route.meta.savedPosition) {
        this.$eventBus.$emit('triggerScroll', this.$route.meta.savedPosition)
      }
      console.log('activated', this.hasError);
      if(this.hasError) {
        this.$eventBus.$emit('refreshView')
      }
    },
    beforeRouteLeave(to, from, next) {
      if (this.$route.meta.keepAlive) {
        from.meta.savedPosition = {
          x: 0,
          y: this.$root.$el.scrollTop
        };
      }
      next()
    }
  }
</script>
<style lang="less" scoped>
  .HOME-PAGE {
    // .wh100();
    // margin: 0 auto;
    // box-sizing: border-box;
    padding: 0 10px;

    .van-pull-refresh__track {
      .flex();
    }
    .van-search{
      padding: 10px 0;
    }
    header {
      // width: 94%;
      margin: 0px auto;
      font-size: 20px;
      position: sticky;
      flex: none;
      top: 0;
    }
    .lunbo{
      overflow: hidden;
      height: 100%;
    }
    .lunbo-container{
      height: 130px;
        border-radius: 10px;
        position: relative;
        width: 100%;
        margin: 10px auto 10px;
        overflow: hidden;
        transform: translateY(0);
    }

    .van-list {
      // flex: 1;
      // min-height: 70vmax;

      .van-cell__title {
        font-size: 20px;
      }

      .van-cell__label {
        font-size: 16px;
        ;
      }

      // height: 100%;
      // overflow-y: auto;
    }
  }
</style>