<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar">
      </div>
      <div class="content">
        <div class="title">
          <div class="brand"></div>
          <div class="name">{{ seller.name }}</div>
        </div>
        <div class="description">
          {{ seller.description }}/{{ seller.deliveryTime }}分钟送达
        </div>
        <div v-if="seller.supports" class="support">
          <div class="icon" :class="classMap[seller.supports[0].type]"></div>
          <div class="text">{{ seller.supports[0].description }}</div>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count" @click="showDetail">
        <span class="count">{{ seller.supports.length }}</span>
        <li class="icon-keyboard_arrow_right"></li>
      </div>
    </div>
    <div class="bulletin-wrapper">
      <!-- 消除空白 -->
      <span class="bulletin-title"></span><span class="bulletin-text">
        {{ seller.bulletin }}
      </span>
      <li class="icon-keyboard_arrow_right" @click="showDetail"></li>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>
    <div v-show="detailShow" class="detail" transition="fade">
      <!-- sticky footer -->
      <div class="detail-wrapper clearfix">
        <div class="detail-main">
          <h1 class="name">{{ seller.name }}</h1>
          <div class="star-wrapper">
            <star :size="48" :score="seller.score"></star>
          </div>
          <div class="title">
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
          </div>
          <ul v-if="seller.supports" class="support">
            <li v-for="item in seller.supports" class="support-item">
              <span class="icon" :class="classMap[seller.supports[$index].type]"></span>
              <span class="text">{{ seller.supports[$index].description }}</span>
            </li>
          </ul>
          <div class="title">
            <div class="line"></div>
            <div class="text">商家公告</div>
            <div class="line"></div>
          </div>
          <div class="bulletin">
            <p class="content">{{ seller.bulletin }}</p>
          </div>
        </div>
      </div>
      <div class="detail-close" @click="hideDetail">
        <i class="icon-close"></i>
      </div>
    </div>
  </div>
</template>
<script>
  // 引入star组件之后还需要注册
  import star from 'components/star/star.vue'
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    // 在view中data永远是一个方法
    data () {
      return {
        detailShow: false
      }
    },
    methods: {
      showDetail () {
        this.detailShow = true
      },
      hideDetail () {
        this.detailShow = false
      }
    },
    created () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    },
    components: {
      // 注册star组件
      star
    }
  }
</script>
<style lang="stylus">
  @import  "../../common/stylus/mixin.styl"
  .header
    color #ffffff
    position relative
    overflow hidden
    background rgba(7,17,27,0.5)

    .content-wrapper
      // 小框框相对于整体是觉得定位
      position relative
      padding 24px 12px 18px 24px
      font-size 0
      .avatar
        display inline-block
        vertical-align top
        img   
          border-radius 2px
      .content
        margin-left 16px
        display inline-block
        .title
          margin 2px 0 8px 0
          .brand
            // 垂直方向顶部对齐
            vertical-align top
            display inline-block
            width 30px
            height 18px
            bg-image('brand')
            background-size 30px 18px
            background-repeat none
          .name
            display inline-block
            margin-left 6px
            font-size 14px
            font-weight bold
            line-height 18px
        .description
          margin-bottom 10px
          font-size 12px
          line-height 12px
        .support
          .icon
            display inline-block
            vertical-align top
            width 12px
            height 12px
            margin-right 4px
            background-size 12px 12px
            background-repeat no-repeat
            &.decrease
              bg-image('decrease_1')
            &.discount
              bg-image('discount_1')
            &.guarantee
              bg-image('guarantee_1')
            &.invoice
              bg-image('invoice_1')
            &.special
              bg-image('special_1')
          .text
            display inline-block
            font-size 10px
            line-height 12px
      .support-count
        // 小框框是绝对定位的，要将父元素改成相对
        position absolute
        right 12px
        bottom 18px
        padding 0 8px
        height 24px
        line-height 24px
        border-radius 14px
        background rgba(0,0,0,0.2)
        text-align center
        .count
          display inline-block
          vertical-align top
          font-size 10px 
        .icon-keyboard_arrow_right
          line-height 24px
          margin-left 2px
          display inline-block
          font-size 10px
    .bulletin-wrapper
      position relative
      height 28px
      line-height 28px
      padding 0 22px 0 12px
      background rgba(7,17,27,0.2)
      // 设置省略
      white-space nowrap
      overflow hidden
      text-overflow ellipsis
      .bulletin-title
        margin-top 7px
        vertical-align top
        display inline-block
        width 22px
        height 12px
        bg-image('bulletin')
        background-size 22px 12px
        background-repeat no-repeat
      .bulletin-text
        vertical-align top
        margin 0 4px
        font-size 10px
      .icon-keyboard_arrow_right
        position absolute
        font-size 10px
        right 12px
        top 8px
    .background
      position absolute
      top 0
      left 0
      width 100%
      height 100%
      z-index -1
      filter blur(10px)
    .detail
      position fixed
      // 此属性参数值越大，则被层叠在最上面。
      z-index 100
      top 0
      left 0
      width 100%
      height 100%
      // 如果内容被修剪，则浏览器会显示滚动条以便查看其余的内容。
      overflow auto
      backdrop-filter blur(10px)
      // 使用css实现渐变动画
      transition all 0.5s
      &.fade-transition
        background rgba(7,17,27,0.8)
        opacity: 1
      &.fade-enter, &.fade-leave
        background rgba(7,17,27,0)
        opacity: 0
      .detail-wrapper
        min-height 100%
        width 100%
        .detail-main
          margin-top 64px
          padding-bottom 64px
          .name
            font-size 16px
            line-height 16px
            font-weight 700px
            text-align center
          .star-wrapper
            margin-top 16px
            padding 2px 0
            text-align center
          .title
            display flex
            margin 28px auto 24px auto
            width 80%
            .line
              flex 1
              position relative
              top -6px
              border-bottom 1px solid rgba(255,255,255,0.2)
            .text
              padding 0 12px
              font-weight 700
              font-size 14px
          .support
            width 80%
            margin 0 auto 
            .support-item
              padding 0 12px
              margin-bottom 12px
              &:last-child
                margin-bottom 0
              foot-size 0
              .icon
                display inline-block
                width 16px
                height 16px
                background-size 16px 16px
                margin-right 6px
                vertical-align top
                background-repeat no-repeat
                &.decrease
                  bg-image('decrease_2')
                &.discount
                  bg-image('discount_2')
                &.guarantee
                  bg-image('guarantee_2')
                &.invoice
                  bg-image('invoice_2')
                &.special
                  bg-image('special_2')
              .text
                vertical-align top
                font-size 12px
                line-height 16px
                font-weight 200
          .bulletin
            width 80%
            margin 0 auto
            .content
              padding 0 12px
              font-size 12px
              line-height 24px
              font-weight 200
      .detail-close
        position relative
        width 32px
        height 32px
        margin -64px auto 0 auto 
        clear both
        font-size 32px
        
      
      

      




</style>



