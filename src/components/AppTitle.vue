<template >
    <svg id="s9" width="100%" height="1.3rem">
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
        <circle cx=".3rem" cy=".6rem" r=".25rem"  fill="url(#g3)"/>
        <!-- <rect width="400" height="100" x="50" y="150" fill="url(#g3)"></rect> -->
        <text  x=".8rem" y="1rem" fill="url(#g3)">
            <slot></slot>
        </text>
    </svg>
</template>
<script>
export default {
    mounted(){

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