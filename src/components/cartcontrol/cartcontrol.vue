<template>
  <div class="cartcontroll">
    <div class="cart-dec" @click.stop.prevent="decreaseCart" v-show="food.count>0" transition="move">
      <span class="inner icon-remove_circle_outline"></span>
    </div>
    <div class="count" v-show="food.count>0">{{ food.count }}</div>
    <div class="cart-ins icon-add_circle" @click.stop.prevent="addCart"></div>
  </div>
</template>
<script>
  import Vue from 'vue'
  export default {
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      addCart (event) {
        if (!event._constructed) {
          return
        }
        if (!this.food.count) {
          // 给food增加count属性且赋值为1
          Vue.set(this.food, 'count', 1)
        } else {
          this.food.count ++
        }
      },
      decreaseCart (event) {
        if (!event._constructed) {
          return
        }
        if (this.food.count) {
          this.food.count --
        }
      }
    }
  }

</script>
<style lang="stylus">
  .cartcontroll
    font-size 0
    .cart-dec
      display inline-block
      padding 6px
      // 设置按钮动画
      transition all 0.4s linear
      // 增添的class
      &.move-transition
        opacity 1
        transform translate3d(0,0,0)
        .inner
          display inline-block
          font-size 24px
          line-height 24px
          color rgb(0,160,220)
          transition all 0.4s linear
          transform rotate(0)
      &.move-enter, &.move-leave
        opacity 0
        transform translate3d(24px,0,0)
        .inner
          transform rotate(180deg)
    .count
      display inline-block
      vertical-align top
      padding-top 6px
      font-size 10px
      line-height 24px
      text-align center
      color rgb(147,153,159)
    .cart-ins
      display inline-block
      padding 6px
      font-size 24px
      line-height 24px
      color rgb(0,160,220)
</style>