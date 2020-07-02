<template >
<div class="svg-container">
<!-- {{rem}} -->
<transition name="van-slide-down">

    <svg id="s9" v-if="rem" width="100%" :height="rem2px(1.3)">
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
        </defs>
        <circle :cx="rem2px(0.3)" :cy="rem2px(0.6)" :r="rem2px(0.25)"  fill="url(#g3)">

        </circle>
        <text  :x="rem2px(0.8)" :y="rem2px(1)" fill="url(#g3)">
            <slot></slot>
        </text>
    </svg>
</transition>

</div>
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
        
    }
}
</script>
<style lang="less" scoped>
.svg-container{
    margin: 10px 5px 10px;
    height: 13vmin;
    // width: 100%;
    svg{
        text { 
            font-weight:600;
            font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Segoe UI, Arial, Roboto, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft Yahei', sans-serif;
            font-size:1.1rem;
        }
    }
}

    
</style>