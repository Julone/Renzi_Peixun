<template>
  <div class="SETTING-PAGE MODULE">
    <app-title>设置中心</app-title>
    <!-- <h1 class="page-title">设置中心</h1> -->
    <main>
      <van-cell class="userInfo-cell" title="用户名">
        <template #title>
          <div class="userInfo-container">
               <div class="userInfo-title">
              <van-icon size="25" name="https://b.yzcdn.cn/vant/icon-demo-1126.png" />
              <span style="font-size:20px">
                {{userName || '未登录'}}
              </span>
          </div>
          
            <van-button v-if="userId" plain type="danger" size="mini" @click="$store.dispatch('login_logout')">注销</van-button>
            <van-button v-else plain type="info" size="mini" @click="onLoginClick">登录</van-button>
          </div>
       
        </template>
        
      </van-cell>
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
              <van-divider>暂无观看记录</van-divider>
            </div>
          </div>
        </template>
      </van-cell>
      <van-cell-group title="  "  :border="false">
        <van-cell title="软件版本">
          {{$store.state.setting.app_version}}
        </van-cell>
        <van-cell title="清除缓存" is-link @click="$store.dispatch('setting_clearCache')">
        </van-cell>
      </van-cell-group>
      <!-- <van-cell title="注销登录" is-link @click="$store.dispatch('login_logout')">
      </van-cell> -->
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
        'course_record': 'getters_home_course_record',
        "userName":"userName",
        "userId":"userId",
        "headImg": "headImg"
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
      },
      onLoginClick(){
        this.$store.dispatch('login_getToken').then(r=>{
          this.getUserInfo();
        })
        
      },
      getUserInfo(){
        return setting_getUserInfo().then(r => {
            if(r.errcode == 0) {
              this.$store.commit('setting_set_userInfo', {
                userName: r.data.userName,
                userId: r.data.userId
              })
            }
            console.log(r);
          })
      }


    },
    created() {
      this.getUserInfo();
      
    }
  }
</script>
<style lang="less">
  .SETTING-PAGE {
    padding: 5px 10px 0;

    // box-sizing: border-box;
    // width: 94%;
    // margin: 0 auto;
    .userInfo-cell{
      padding: 10px 5px;
      margin-bottom: 15px;
      .userInfo-container{
        .flex(@j:space-between);

        .userInfo-title{
        .flex(@j:flex-start);

          span{
              margin-left: 5px;;
          }
        }

      }
      
    }
    .zuijin {
      background:#fbfbfb;
      .van-cell__title {
        width: 100%;
        .title{
          font-size: .5rem;
        }
        .course_container{
          overflow-x: auto;
          // height:90px;
          height: auto;
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