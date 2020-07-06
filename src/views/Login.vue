<template>
    <div class="LOGIN-PAGE MODULE">
        <div class="wrapper">
            正在获取身份...
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
            
        },
        created(){
           this.$store.dispatch('login_getToken');
        },
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