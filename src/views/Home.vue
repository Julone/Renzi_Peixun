<template>
  <div class="HOME_MODULE">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <header>
        <h1>课程中心</h1>
      </header>
      <van-list>
        <van-divider></van-divider>

        <van-cell v-for="el in courseList" :key="el.id" :title="el.teacher + '-' + el.course_name" :label="el.info"
          is-link @click="$router.push({name: 'video', params: {v_id: el.id} })">
          <div>
            <img
              src="//10.url.cn/qqcourse_logo_ng/ajNVdqHZLLAQGiaAQQmvkevV3FQsiblO77BPM8mVv4chCKC1fC3FuZibobA0a22Eia2MCNnibFKy4UvU/"
              width="160" alt="">
          </div>
        </van-cell>

      </van-list>

    </van-pull-refresh>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {
    home_getCourseList,
    home_getCourseDetail
  } from '@/global/api'
  export default {
    data() {
      return {
        courseList: [],
        isLoading: false

      }
    },
    methods: {
      getDetail(id) {
        home_getCourseDetail(id).then(r => {
          console.log(r);
        })
      },
      onRefresh() {

        setTimeout(() => {
          home_getCourseList().then(r => {
            this.courseList = r.data;
            this.$toast.success('刷新成功');
            this.isLoading = false
          })
        }, 300)

      },

    },
    mounted() {
      home_getCourseList().then(r => {
        this.courseList = r.data;
      })
    },
    activated() {
      if (this.$route.meta.keepAlive && this.$route.meta.savedPosition) {
        this.$eventBus.$emit('triggerScroll', this.$route.meta.savedPosition)
      }
    },
    beforeRouteLeave(to, from, next) {
      if (this.$route.meta.keepAlive) {
        from.meta.savedPosition = {x:0,y:this.$root.$el.scrollTop};
      }
      next();
    },
  }
</script>
<style lang="less" scoped>
  .HOME_MODULE {
    // .wh100();
    margin: 0 auto;
    box-sizing: border-box;

    .van-pull-refresh__track {
      .flex();
    }

    header {
      width: 94%;
      margin: 20px auto;
      font-size: 20px;
      position: sticky;
      flex: none;
      top: 0;
    }

    .van-list {
      flex: 1;

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