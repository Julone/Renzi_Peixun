<template>
<div :style="{width,height}">
    <van-image v-if="!skeleton" :radius="radius" :height="height" :width="width" lazy-load :src="img" fit="cover">
        <template v-slot:loading>
            <van-loading type="circular" color="#1989fa" size="30" />
        </template>
    </van-image>
   
    <van-image v-if="skeleton" :radius="radius" class="van-skeleton--animate" :height="height" :width="width" >
         <template #loading>
            <van-icon :name="lunbo?'photo-o' :'video-o'" :style="{fontSize: lunbo? '1.3rem' : '0.6rem' } " />
         </template>
    </van-image>
</div>

</template>
<script>
export default {
    props: {
        img: {
            default: ''
        },
        width: {
            default: '100%'
        },
        height: {
            default: '2.2rem'
        },
        radius: {
            default: '0.1rem'
        },
        skeleton: {
            type:Boolean
        },
        lunbo: {
            type:Boolean
        }
    }
}
</script>