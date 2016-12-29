<template>
  <div class="goods">
    <div class="menu-warper" ref="menuWrapper">
      <ul>
        <li v-for="(item, index) in goods" class="menu-item" :class="{active: currentIndex===index}" @click="selectMenu(index,$event)">
          <span class="text border-1px">
            <span v-if="item.type>0" class="icon" :class="classMap[item.type]"></span>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>

    <div class="foods-warper" ref="foodsWrapper">
      <ul>
        <li v-for="item in goods" class="food-list" ref="food-list-hook">
          <h2 class="title">{{item.name}}</h2>
          <ul>
            <li v-for="food in item.foods" class="food-item border-1px">
              <div class="icon">
                <img width="57" :src="food.icon">
              </div>
              <div class="content">
                <h3 class="name">{{food.name}}</h3>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span v-if="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-warper">
                  <cartcontrol :food="food"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
import shopcart from 'components/shopcart/shopcart';
import cartcontrol from 'components/cartcontrol/cartcontrol';

const ERR_OK = 0;
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      goods: [],
      listHeight: [],
      scrollY: 0
    };
  },
  computed: {
    currentIndex() {
      for (let i = 0, len = this.listHeight.length; i < len; i++) {
        let height1 = this.listHeight[i];
        let height2 = this.listHeight[i + 1];

        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i;
        }
      }
      return 0;
    }
  },
  created() {
    this.$http.get('/api/goods')
    .then((res) => {
      return res.json();
    }).then((res) => {
      if (res.errno === ERR_OK) {
        this.goods = res.data;
        this.$nextTick(() => {
          this._initScroll();
          this._calculateHeight();
        });
      }
    });
    this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
  },
  methods: {
    selectMenu(index, event) {
      if (!event._constructed) {
        return;
      }
      let foodlist = this.$refs['food-list-hook'];
      let el = foodlist[index];
      this.foodScroll.scrollToElement(el, 300);
    },
    _initScroll() {
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {
        click: true
      });
      this.foodScroll = new BScroll(this.$refs.foodsWrapper, {
        probeType: 3,
        click: true
      });
      this.foodScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y));
      });
    },
    _calculateHeight() {
      let foodlist = this.$refs['food-list-hook'];
      let height = 0;
      this.listHeight.push(height);
      for (let i = 0, len = foodlist.length; i < len; i++) {
        height += foodlist[i].clientHeight;
        this.listHeight.push(height);
      }
    }
  },
  components: {
    shopcart,
    cartcontrol
  }
};
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../common/scss/mixin';
  .goods{
    display: flex;
    position: absolute;
    width: 100%;
    top: 174px;
    bottom: 46px;
    overflow: hidden;
    .menu-warper{
      flex: 0 0 80px;
      width: 80px;
      background-color: #f3f5f7;
      .menu-item{
        display: table;
        width: 100%;
        height: 54px;
        line-height: 14px;
        &.active{
          position: relative;
          z-index: 10;
          margin-top: -1px;
          font-weight: 700;
          background-color: #fff;
          .text{
            border: none;
          }
        }
        .icon{
          float: left;
          display: inline-block;
          width:12px;
          height: 12px;
          margin-right: 2px;
          vertical-align: middle;
          background-size: 12px 12px;
          background-repeat: no-repeat;
          &.decrease{
            @include bg-image('decrease_3');
          }
          &.discount{
            @include bg-image('discount_3');
          }
          &.guarantee{
            @include bg-image('guarantee_3');
          }
          &.invoice{
            @include bg-image('invoice_3');
          }
          &.special{
            @include bg-image('special_3');
          }
        }
        .text{
          font-size: 12px;
          display: table-cell;
          padding: 0 10px;
          vertical-align: middle;
          @include border-1px(rgba(7,17,27,0.1));
        }
      }
    }
    .foods-warper{
      flex: 1;
      // overflow:auto;
      // overflow: auto;
      .title{
        padding-left: 12px;
        height: 26px;
        line-height: 26px;
        border-left: 2px solid #d9dde1;
        font-size: 12px;
        color: rgb(127,153,159);
        background: #f3f5f7;
      }
      .food-item{
        display: flex;
        margin: 18px;
        padding-bottom: 18px;
        @include border-1px(rgba(7,17,27,.1));
        &:last-child{
          margin-bottom: 0;
          @include border-none;
        }
        .icon{
          flex: 0 0 57px;
          margin-right: 10px;
        }
        .content{
          flex: 1;
          .name{
            font-size: 14px;
            margin: 2px 0 8px 0;
            line-height: 18px;
            font-size: 14px;
            color: rgb(7,17,27);
          }
          .desc,.extra{
            font-size: 10px;
            line-height: 10px;
            color:rgb(137,153,159);
          }
          .desc{
            margin-bottom: 8px;
            line-height: 1.25;
          }
          .extra{
            font-size: 0;
            .count,span{
              font-size: 10px;
              margin-right: 12px;
            }
          }
          .price{
            line-height: 24px;
            font-weight: 700;
            font-size: 0;
            .now{
              margin-right: 8px;
              font-size: 14px;
              color: rgb(240, 20, 20);
            }
            .old{
              text-decoration: line-through;
              font-size: 10px;
              color: rgb(7,17,27);
            }
          }
          .cartcontrol-warper{
            position: absolute;
            right: 0;
            bottom: 12px;
          }
        }
      }
    }
  }

</style>
