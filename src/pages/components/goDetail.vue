<template>
    <view @click="handleClick">
        <slot></slot>
    </view>
</template>

<script>
export default {
    props:{
        list: Array,
        index: Number
    },
    mounted(){
        
    },
    methods:{
        handleClick(){
            getApp().globalData.imageList=this.list
            getApp().globalData.imageIndex=this.index
            uni.navigateTo({
                url: '/pages/image_detail/index'
            })
        }
    }
}
</script>