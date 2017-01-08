<template>
  <transition name="move">
    <div v-show="showFlag" class="food" ref="food">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image">
          <div class="back" @click="hide">
            <i class="ift-arrow_left"></i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}</span>
            <span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="now">￥{{food.price}}</span>
            <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
        </div>
        <div class="cartcontrol-warper">
          <cartcontrol @cart-add="drop" :food="food"></cartcontrol>
        </div>
        <transition name="fade">
          <div class="buy" v-show="!food.count || food.count === 0" @click="addFirst">加入购物车</div>
        </transition>
      </div>
    </div>
  </transition>
</template>
<script>
import Vue from 'vue';
import BScroll from 'better-scroll';
import cartcontrol from 'components/cartcontrol/cartcontrol';

export default {
  props: {
    food: {
      type: Object
    }
  },
  data() {
    return {
      showFlag: false
    };
  },
  methods: {
    show() {
      this.showFlag = true;
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.food, {
            click: true
          });
        } else {
          this.scroll.refresh();
        }
      });
    },
    hide() {
      this.showFlag = false;
    },
    addFirst(event) {
      if (!event._constructed) {
        return;
      }
      this.$emit('cart-add', event.target);
      Vue.set(this.food, 'count', 1);
    },
    drop(target) {
      this.$nextTick(() => {
        this.$parent.$refs.shopcart.drop(target);
      });
    }
  },
  components: {
    cartcontrol
  }
};
</script>
<style lang="scss" rel="stylesheet/scss">
  @import '../../common/scss/mixin';
  .food{
    position: fixed;
    left: 0;
    top: 0;
    bottom: 48px;
    z-index: 30;
    width: 100%;
    background-color: #fff;
    transform: translate3d(0,0,0);
    transition: all 0.2s linear;
    &.move-enter, &.move-leave-active{
      transform: translate3d(100%,0,0);
    }
    .image-header{
      position: relative;
      width: 100%;
      height: 0;
      padding-bottom: 100%;
      img{
        position:absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
      .back{
        position: absolute;
        top: 10px;
        left: 0;
        .ift-arrow_left{
          display: block;
          padding: 10px;
          font-size: 20px;
          color: #fff;
        }
      }
    }
    .content{
      padding: 18px;
      .title{
        font-size: 14px;
        font-weight: 700;
        line-height: 14px;
        margin-bottom: 8px;
        color: rgb(7, 17, 27);
      }
      .detail{
        margin-bottom: 18px;
        line-height: 10px;
        height: 10px;
        font-size: 0;
        .sell-count, .rating{
          font-size: 10px;
          color: rgb(147, 153, 159);
        }
        .sell-count{
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
          color: #93999f;
        }
      }
    }
    .cartcontrol-warper{
      position: absolute;
      right: 12px;
      bottom: 12px;
    }
    .buy{
      position: absolute;
      right: 18px;
      bottom: 18px;
      z-index: 10;
      height: 24px;
      line-height: 24px;
      padding: 0 12px;
      box-sizing: border-box;
      font-size: 10px;
      border-radius: 12px;
      color: #fff;
      background-color: rgb(0, 160, 220);
      transition: all 0.2s;
      opacity:１；
      &.fade-enter, &.fade-leace-active{
        opacity: 0;
      }
    }
  }
</style>
