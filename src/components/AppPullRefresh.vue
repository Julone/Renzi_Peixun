<template>
    <van-pull-refresh v-model="loading" success-text="刷新成功" :head-height="50" @refresh="onRefresh">
        <template #pulling="props">
            <slot name="pulling">
                <!-- <van-loading :style="{ transform: `scale(${props.distance / 50})` }"></van-loading> -->
                <van-loading :size="props.distance / 50 * 35" color="#1989fa"></van-loading>
            </slot>
        </template>
        <template #loosing>
            <slot name="loosing">

                <van-loading color="#1989fa"></van-loading>
            </slot>
        </template>
        <template #loading>
            <slot name="loading">
                <van-loading color="#1989fa"></van-loading>
            </slot>
        </template>
        <slot></slot>
    </van-pull-refresh>
</template>
<script>
    export default {
        props: ['refresh'],
        data() {
            return {
                loading: false
            }
        },
       methods:{
           async onRefresh(){
              await this.refresh();
               this.loading = false;
           }
       }

    }
</script>