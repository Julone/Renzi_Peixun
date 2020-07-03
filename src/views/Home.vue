<template>
  <div class="HOME-PAGE MODULE">
    <van-pull-refresh v-model="isLoading" success-text="刷新成功" @refresh="onRefresh">
      <header>
        <app-title>课程中心</app-title>
        <!-- <h1 class="page-title">课程中心</h1> -->
      </header>
      <!-- 骨架屏 -->
      <div class="LoadPanel" v-if="isLoading">
        <van-cell  v-for="el in 3" :key="el" is-link>
          <template #title> <van-skeleton round  title :row="2" /> </template>
          <van-image width="100%" height="80"></van-image>
        </van-cell>
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
  import Vue from 'vue'
  import {
    home_getCourseList,
    home_getCourseDetail
  } from 'api'
  export default {
    data() {
      return {
        courseList: [],
        isLoading: true,
        listLoading: false,
        isFinished: false
      }
    },
    methods: {
      onLoad() {
        return home_getCourseList().then(r => {
          this.courseList.push(...r.data);
          this.listLoading = false;
          this.courseList.length >= 12 || (this.isFinished= true)
        }).catch(e => {
          this.isLoading = false;
          this.listLoading = false;
          this.isFinished = true;
          this.$toast('加载失败');
        })
      },
      onRefresh() {
        this.courseList = [];
        this.isFinished = false;
        setTimeout(() => {
          this.onLoad().then(r => {
            this.isLoading = false;
          })
        }, 500)
      },
      onCourseClick(el){
        this.$store.dispatch('home_add_course_record', el)
        this.$router.push({name: 'videoByCourseId', params: {k_id: el.id} });

      }
    },
    created() {
      this.onRefresh();
    },
    activated() {
      if (this.$route.meta.keepAlive && this.$route.meta.savedPosition) {
        this.$eventBus.$emit('triggerScroll', this.$route.meta.savedPosition)
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

    header {
      // width: 94%;
      margin: 0px auto;
      font-size: 20px;
      position: sticky;
      flex: none;
      top: 0;
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