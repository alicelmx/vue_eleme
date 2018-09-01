<template>
  <div class="goods">
    <div class="menu-wrapper" v-el:menu-wrapper>
      <ul>
        <li v-for="item in goods" class="menu-item" :class="{'current':currentIndex === $index}" @click="selectMenu($index, $event)">
          <span class="text border-1px">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
             {{ item.name }}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" v-el:foods-wrapper>
      <ul>
        <li v-for="item in goods" class="food-list foot-list-hook">
          <h1 class="title">{{ item.name }}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item border-1px">
              <div class="icon">
                <img :src="food.icon" width="57px" height="57px">
              </div>
              <div class="content">
                <h2 class="name">{{ food.name }}</h2>
                <p class="desc">{{ food.description }}</p>
                <div class="extra">
                  <span class="count">月售{{ food.sellCount }}份</span><span>好评率{{ food.rating }}%</span>
                </div>
                <div class="price">
                  <span class="new">¥{{ food.price }}</span><span class="old" v-show="food.oldPrice">¥{{ food.oldPrice }}</span>
                  <div class="cartcontrol-wrapper">
                    <cartcontrol :food="food"></cartcontrol>
                  </div>
                </div>
                <!-- <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food"></cartcontrol>
                </div> -->
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
  </div>
</template>
<script>
  import BScroll from 'better-scroll'
  import shopcart from 'components/shopcart/shopcart'
  import cartcontrol from 'components/cartcontrol/cartcontrol'
  const ERR_OK = 0
  export default {
    data () {
      return {
        goods: [],
        // 定义每个区间的高度
        listHeight: [],
        scrollY: 0
      }
    },
    props: {
      seller: {
        type: Object
      }
    },
    created () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
      this.$http.get('/api/goods').then((response) => {
        response = response.body
        if (response.errno === ERR_OK) {
          this.goods = response.data
          this.$nextTick(() => {
            this._initScroll()
            this._calculateHeight()
          })
        }
      })
    },
    computed: {
      currentIndex () {
        for (let index = 0; index < this.listHeight.length; index++) {
          let height1 = this.listHeight[index]
          let height2 = this.listHeight[index + 1]
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return index
          }
        }
        return 0
      },
      selectFoods () {
        let foodList = []
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foodList.push(food)
            }
          })
        })
        return foodList
      }
    },
    methods: {
      selectMenu (index, event) {
        // 防止PC端返回两次
        if (!event._constructed) {
          return
        }
        let foodList = this.$els.foodsWrapper.getElementsByClassName('foot-list-hook')
        let el = foodList[index]
        this.foodsScroll.scrollToElement(el, 300)
      },
      _initScroll () {
        this.menuScroll = new BScroll(this.$els.menuWrapper, {
          click: true
        })
        this.foodsScroll = new BScroll(this.$els.foodsWrapper, {
          // 增加点击事件
          click: true,
          // 实时告诉滚动位置
          probeType: 3
        })
        // 在滚动的时候获取位置高度
        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y))
        })
      },
      _calculateHeight () {
        let foodList = this.$els.foodsWrapper.getElementsByClassName('foot-list-hook')
        let height = 0
        this.listHeight.push(height)
        for (let index = 0; index < foodList.length; index++) {
          let item = foodList[index]
          height += item.clientHeight
          this.listHeight.push(height)
        }
      }
    },
    components: {
      // 引入组件后需要注册
      shopcart,
      cartcontrol
    }
  }
</script>
<style lang="stylus">
  @import  "../../common/stylus/mixin.styl"
  .goods
    display flex
    position absolute
    top 174px
    bottom 46px
    width 100%
    overflow hidden
    .menu-wrapper
      flex 0 0 80px
      width 80px
      background-color #f3f5f7
      .menu-item
        display table
        height 54px
        width 56px
        padding 0 12px
        line-height 14px
        &.current
          position relative
          z-index 10
          margin-top -1px
          background #ffffff
          font-weight 700
          .text
            border-none()
        .icon
          display inline-block
          vertical-align top
          width 12px
          height 12px
          background-size 12px 12px
          background-repeat no-repeat
          margin-right 2px
          &.decrease
            bg-image('decrease_3')
          &.discount
            bg-image('discount_3')
          &.guarantee
            bg-image('guarantee_3')
          &.invoice
            bg-image('invoice_3')
          &.special
            bg-image('special_3')
        .text
          display table-cell
          vertical-align middle
          width 56px
          font-size 12px
          color rgb(77,85,93)
          font-weight 200
          line-height 14px
          border-1px(rgba(7,17,27,0.1))
    .foods-wrapper
      flex 1
      .title
        height 26px
        padding-left 14px
        background-color #f3f5f7
        border-left 2px solid #d9dde1
        line-height 26px
        font-size 12px
        color rgb(147,153,159)  
      .food-item
        display flex
        margin 18px
        padding-bottom 18px
        border-1px(rgba(7,17,27,0.1))
        &:last-child
          border-none()
          padding-bottom 0
        .icon
          flex 0 0 57px
          margin-right 10px
        .content
          flex 1
          .name
            margin 2px 0 8px 0
            font-size 14px
            line-height 14px
            color rgb(7,17,27)
          .desc, .extra
            color rgb(147,153,159)
            font-size 10px
            line-height 10px
          .desc
            line-height 12px
            margin-bottom 8px
          .extra
            .count
              margin-right 12px
          .price
            height 36px
            position relative
            line-height 36px
            .new
              margin-right 8px
              font-size 14px
              color rgb(240,20,20)
              font-weight 700
            .old
              text-decoration line-through
              font-size 10px
              color rgb(147,153,159)
              font-weight 700
            .cartcontrol-wrapper
              display: inline-block
              position absolute
              right  0
</style>



