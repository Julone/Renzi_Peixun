<template >
    <svg id="s9" width="100%" :height="rem2px(1.3)">
        <!--渐变对象属于一种特效对象-->
        <defs>
            <linearGradient id="g3" x1="0%" y1="0%" x2="100%" y2="30%">
                <!-- <stop offset="0%" stop-color="red"></stop>
                <stop offset="17%" stop-color="orange"></stop>
                <stop offset="34%" stop-color="yellow"></stop>
                <stop offset="51%" stop-color="green"></stop>
                <stop offset="68%" stop-color="cyan"></stop>
                <stop offset="85%" stop-color="blue"></stop>
                <stop offset="100%" stop-color="purple"></stop> -->
                <stop stop-color="#458dff" offset="0%" />
                <stop stop-color="rgb(57,222,227)" offset="100%"/>
            </linearGradient>
            <!--<radialGradient id="g4">此标签为放射性渐变</radialGradient>-->
        </defs>
        <circle :cx="rem2px(0.3)" :cy="rem2px(0.6)" :r="rem2px(0.25)"  fill="url(#g3)"/>
        <!-- <rect width="400" height="100" x="50" y="150" fill="url(#g3)"></rect> -->
        <text  :x="rem2px(0.8)" :y="rem2px(1)" fill="url(#g3)">
            <slot></slot>
        </text>
    </svg>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
    data(){
        return {

        }
    },
    computed:{
        ...mapGetters({
            rem: 'htmlFontSize'
        })
    },
    methods: {
        rem2px(ratio){
            return ratio * this.rem + 'px';
        }
    },
    mounted(){
        console.log(this.$store.getters.htmlFontSize);
        
    }
}
</script>
<style lang="less" scoped>
svg{
    margin: 20px 5px 10px;
    text { 
        font-weight:600;
        font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Segoe UI, Arial, Roboto, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft Yahei', sans-serif;
        font-size:1.1rem;
    }
}
    
</style>