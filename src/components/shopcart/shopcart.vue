<template>
  <div class="shopcart">
    <div class="content">
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
      <div class="content-right">
        <div class="pay" :class="payClass">{{payDesc}}</div>
      </div>
    </div>
  </div>
</template>
<script>
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
    }
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
  }
</style>
