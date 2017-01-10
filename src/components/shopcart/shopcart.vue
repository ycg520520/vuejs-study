<template>
  <div>
    <div class="shopcart">
      <div class="content" @click="toggleList">
        <div class="content-left">
          <div class="logo-warper">
            <div class="logo" :class="{'highlight': totalCount>0}">
              <span class="ift-shopping_cart"></span>
            </div>
            <div class="num" v-show="totalCount>0">{{totalCount}}</div>
          </div>
          <div class="price" :class="{'highlight': totalPrice>0}">￥{{totalPrice}}元</div>
          <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
        </div>
        <div class="content-right" @click.stop.prevent="pay">
          <div class="pay" :class="payClass">{{payDesc}}</div>
        </div>
      </div>
      <div class="ball-container">
        <transition v-for="ball in balls" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter" name="fade">
        <div v-show="ball.show" class="ball">
          <div class="inner inner-hook"></div>
        </div>
        </transition>
      </div>
      <transition name="fold">
        <div class="shopcart-list" v-show="listShow">
          <div class="list-header">
            <h2 class="title">购物车</h2>
            <span class="empty" @click="empty">清空</span>
          </div>
          
          <div class="list-content" ref="listContent">
            <ul>
              <li class="food" v-for="food in selectFoods">
                <span class="name">{{food.name}}</span>
                <span class="price">￥{{food.price * food.count}}</span>
                <div class="carcontrol-wrapper">
                  <cartcontrol :food="food"></cartcontrol>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <transition name="fade">
      <div class="list-mask" v-show="listShow" @click="hideList"></div>
    </transition>
  </div>
</template>
<script>
import BScroll from 'better-scroll';
import cartcontrol from 'components/cartcontrol/cartcontrol';
export default {
  props: {
    selectFoods: {
      type: Array,
      default() {
        return [{
          price: 10,
          count: 1
        }];
      }
    },
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      balls: [
        {show: false},
        {show: false},
        {show: false},
        {show: false},
        {show: false}
      ],
      fold: true
    };
  },
  created() {
    this.$nextTick(() => {
      window.globalVue.$on('cart-add', (el) => {
        this.drop(el);
      });
    });
  },
  computed: {
    totalPrice() {
      let total = 0;
      this.selectFoods.forEach((food) => {
        total += food.price * food.count;
      });
      return total;
    },
    totalCount() {
      let count = 0;
      this.selectFoods.forEach((food) => {
        count += food.count;
      });
      return count;
    },
    payDesc() {
      if (this.totalPrice === 0) {
        return `￥${this.minPrice}起送`;
      } else if (this.totalPrice < this.minPrice) {
        var diff = this.minPrice - this.totalPrice;
        return `还差${diff}元起送`;
      } else {
        return '去结算';
      }
    },
    payClass() {
      if (this.totalPrice < this.minPrice) {
        return 'not-enough';
      } else {
        return 'enough';
      }
    },
    listShow() {
      if (!this.totalCount) {
        this.fold = true;
        return false;
      }
      let show = !this.fold;
      if (show) {
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.listContent, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        });
      }
      return show;
    }
  },
  methods: {
    drop(el) {
      for (let i = 0, len = this.balls.length; i < len; i++) {
        let ball = this.balls[i];
        if (!ball.show) {
          ball.show = true;
          ball.el = el;
          return;
        }
      }
    },
    beforeEnter(el) {
      let count = this.balls.length;
      while (count--) {
        let ball = this.balls[count];
        if (ball.show) {
          let rect = ball.el.getBoundingClientRect();
          let x = rect.left - 32;
          let y = -(window.innerHeight - rect.top - 22);
          el.style.display = 'block';
          el.style.webkitTransform = `translate3d(0, ${y}px, 0)`;
          el.style.transform = `translate3d(0, ${y}px, 0)`;
          let inner = el.getElementsByClassName('inner-hook')[0];
          inner.style.webkitTransform = `translate3d(${x}px, 0, 0)`;
          inner.style.transform = `translate3d(${x}px, 0, 0)`;
        }
      }
      return false;
    },
    enter(el) {
      /* eslint-disable no-unused-vars */
      let refresh = el.offsetHeight;
      this.$nextTick(() => {
        el.style.webkitTransform = 'translate3d(0,0,0)';
        el.style.transform = 'translate3d(0,0,0)';

        let inner = el.getElementsByClassName('inner-hook')[0];
        inner.style.webkitTransform = 'translate3d(0,0,0)';
        inner.style.transform = 'translate3d(0,0,0)';
      });
    },
    afterEnter(el) {
      let count = this.balls.length;
      while (count--) {
        let ball = this.balls[count];
        if (ball) {
          ball.show = false;
          el.style.display = 'none';
        }
      }
    },
    toggleList() {
      if (!this.totalCount) {
        return;
      }
      this.fold = !this.fold;
    },
    empty() {
      this.selectFoods.forEach((food) => {
        food.count = 0;
      });
    },
    hideList() {
      this.fold = true;
    },
    pay() {
      if (this.totalPrice < this.minPrice) {
        return;
      }
      window.alert(`去结算${this.totalPrice}元`);
    }
  },
  components: {
    cartcontrol
  }
};
</script>
<style lang="scss" rel="stylesheet/scss">
  @import '../../common/scss/mixin';
  .shopcart{
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 50;
    width: 100%;
    height: 48px;
    .content{
      height: 48px;
      display: flex;
      font-size: 0;
      background-color: #141d27;
      .content-left{
        flex: 1;
        .logo-warper{
          display: inline-block;
          position: relative;
          top: -10px;
          margin: 0 12px;
          padding: 6px;
          width: 56px;
          height: 56px;
          box-sizing: border-box;
          vertical-align: middle;
          border-radius: 50%;
          background-color: #141d27;
          .logo{
            width:100%;
            height: 100%;
            border-radius: 50%;
            text-align: center;
            background-color: rgba(255,255,255,.2);
            font-size: 24px;
            line-height: 44px;
            color: #80858a;
            &.highlight{
              background-color:rgb(0,160,220);
              color: #fff;
            }
          }
          .num{
            position: absolute;
            top: 0;
            right: 0;
            width: 24px;
            height: 16px;
            line-height: 16px;
            text-align: center;
            font-size: 9px;
            font-weight: 700;
            color: #fff;
            border-radius: 8px;
            background-color: rgb(240,20,20);
            box-shadow: 0 4px 8px 0 rgba(0,0,0,.4);
          }
        }
        .price{
          display: inline-block;
          line-height: 24px;
          margin-top: 12px;
          box-sizing: border-box;
          padding-right: 12px;
          border-right: 1px solid rgba(255,255,255,.1);
          font-size: 16px;
          font-weight: 700;
          color: rgba(255,255,255,0.4);
          &.highlight{
            color: #fff;
          }
        }
        .desc{
          display: inline-block;
          line-height: 24px;
          margin-top: 12px;
          margin-left: 12px;
          font-size: 10px;
          font-weight: 700;
          color: rgba(255,255,255,0.4);
        }
      }
      .content-right{
        flex: 0 0 105px;
        width: 105px;
        .pay{
          height: 48px;
          line-height: 48px;
          text-align: center;
          font-weight: 700;
          font-size: 14px;
          color: rgba(255,255,255,0.4);
          &.not-enough{
            background-color: rgba(255,255,255,.2);
          }
          &.enough{
            color: #fff;
            background-color: #00b43c;
          }
        }
      }
    }
    .ball-container{
      .ball{
        position:fixed;
        left: 32px;
        bottom: 22px;
        z-index: 200;
        transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
        .inner{
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: rgb(0, 160, 220);
          transition: all 0.4s linear;
        }
      }
    }
    .shopcart-list{
      position: absolute;
      left: 0;
      top: 0;
      z-index: -1;
      width: 100%;
      transition: all .5s;
      transform: translate3d(0, -100%, 0);
      &.fold-enter, &.fold-leave-active{
        transform: translate3d(0, 0, 0);
      }
      .list-header{
        height: 40px;
        line-height: 40px;
        padding: 0 18px;
        background-color: #f3f5f7;
        border-bottom: 1px solid rgba(7, 17, 27 ,0.1);
        display: flex;
        .title{
          flex:1;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }
        .empty{
          font-size: 12px;
          color: rgb(0, 160, 220);
        }
      }
      .list-content{
        padding: 0 18px;
        max-height: 217px;
        overflow: hidden;
        background: #fff;
        .food{
          display: flex;
          padding: 12px 0;
          box-sizing: border-box;
          align-items: center;
          @include border-1px(rgba(7,17,27,0.1));
          .name{
            flex: 1;
          }
          .price{
            font-weight: 700;
            font-size: 14px;
            color: rgb(240, 20, 20);
          }
        }
      }
    }
  }
  .list-mask{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 40;
    transition: all 0.3s;
    opacity: 1;
    backdrop-filter: blur(5px);
    background: rgba(7,17,27,0.6);
    &.fade-enter, &.fade-leave-active{
      opacity: 0;
      background: rgba(7,17,27,0);
    }
  }
</style>
