<template>
  <div class="SETTING-PAGE MODULE">
    <app-title>设置中心</app-title>
    <!-- <h1 class="page-title">设置中心</h1> -->
    <main>
      <!-- <van-cell title="用户名" @click="$store.dispatch('login_logout')">
        dfa
      </van-cell> -->
      <van-cell class="zuijin ">
        <template #title>
          <div class="title">
            <div class="left">
             <van-icon name="chart-trending-o" /> 最近看过
            </div>
            <div class="right">

            </div>
          </div>
        </template>
        <template #label>
          <div class="course_container">
            <div style="display:flex;height:100%" v-if="course_record.length">
              <div v-for="el in course_record" @click="onCourseClick(el)" class="course_item van-cell--clickable" :key="el.id">
                <img :src="el.image" alt="">
                <div class="text" >
                  {{el.course_name}}
                </div>
              </div>
            </div>
            <div v-else>
              暂无
            </div>
          </div>
        </template>
      </van-cell>
      <van-cell-group title="">
        <van-cell title="软件版本">
          {{$store.state.setting.app_version}}
        </van-cell>
        <van-cell title="清除缓存" is-link @click="$store.dispatch('setting_clearCache')">
        </van-cell>
      </van-cell-group>
      <van-cell title="注销登录" is-link @click="$store.dispatch('login_logout')">
      </van-cell>
    </main>
  </div>
</template>
<script>
  import {
    mapGetters
  } from 'vuex'
  import {
    setting_getUserInfo
  } from 'api'
  export default {
    computed: {
      ...mapGetters({
        'course_record': 'getters_home_course_record'
      })
    },
    methods: {
      onCourseClick(el) {
        this.$store.dispatch('home_add_course_record', el)
        // console.log(this.$store.getters.getters_home_course_record);
        this.$router.push({
          name: 'videoByCourseId',
          params: {
            k_id: el.id
          }
        });
      }


    },
    created() {
      setting_getUserInfo().then(r => {
        console.log(r);
      })
    }
  }
</script>
<style lang="less">
  .SETTING-PAGE {
    padding: 5px 10px 0;

    // box-sizing: border-box;
    // width: 94%;
    // margin: 0 auto;
    .zuijin {
      background:#fbfbfb;
      .van-cell__title {
        width: 100%;
        .title{
          font-size: .5rem;
        }
        .course_container{
          overflow-x: auto;
          height:90px;
          .course_item{
            margin-right:.3rem;width:100px;
            .flex(@d:column;@a:flex-start);
            img{
              // flex:1;
              width:100px
              // max-width:100%;
              // max-height:100%;
            }
            .text{
              height:.5rem;line-hight:.5rem;font-size:0.25rem;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              width: 100%;;
              flex:none;
            }

          }
        }
       
      }
    }
  }
</style>