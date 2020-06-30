<template>
    <div class="LOGIN-PAGE MODULE">
        <div class="wrapper">
            <van-divider></van-divider>
            <h1>用户登录</h1>
            <van-form ref="form" @submit="onSubmit">
                <van-field clearable required v-model="userName" name="用户名" label="用户名" placeholder="用户名"
                    :rules="[{ required: true, message: '请填写用户名' }]" class="form-item" />
                <van-field clearable required v-model="password" type="password" name="密码" label="密码" placeholder="密码"
                    :rules="[{ required: true, message: '请填写密码' }]" class="form-item" />
                <van-button block type="info" native-type="submit"> 登录 </van-button>
                <van-button native-type="button" borderless block bgless to="/">跳过登录</van-button>
            </van-form>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                userName: 'panhq',
                password: 'phq',
            };
        },
        methods: {
            onSubmit() {
                this.$store.dispatch('login_requestToken', {
                    userName: this.userName,
                    password: this.password
                }).then(r => {
                    console.log(r);
                    this.$router.push('/')
                }).catch(e => {
                    console.log(e);
                })
            }
        }
    }
</script>
<style lang="less">
    .LOGIN-PAGE{
        .wh100() !important;
        // padding: 15px;
        background: rgb(241, 241, 241);
        box-sizing: border-box;
        .wrapper {
            // width: 94%;
            // margin: 0 auto;
            box-sizing: border-box;

            .form-item {
                margin: 30px 0;
            }
        }

    }
</style>