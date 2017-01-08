<template>
  <div class="cartcontrol">
    <transition name="move">
    <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decreaseCart">
      <i class="ift-remove_circle_outline inner"></i>
    </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="ift-add_circle cart-add" @click.stop.prevent="addCart"></div>
  </div>
</template>

<script>
import Vue from 'vue';
export default {
  props: {
    food: {
      Object
    }
  },
  methods: {
    addCart(event) {
      if (!event._constructed) {
        return;
      }
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1);
      } else {
        this.food.count++;
      }

      this.$emit('cart-add', event.target);
    },
    decreaseCart(event) {
      if (!event._constructed) {
        return;
      }
      if (this.food.count) {
        this.food.count--;
      }
    }
  }
};
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../common/scss/mixin';
  .cartcontrol{
    font-size: 0;
    .cart-add{
      display: inline-block;
      padding: 6px;
      font-size: 24px;
      line-height: 24px;
      vertical-align: middle;
      color: rgb(0, 160, 220);
    }
    .cart-decrease{
      padding: 6px;
      display: inline-block;
      transition: all .4s linear;
      .inner{
        display: inline-block;
        font-size: 24px;
        line-height: 24px;
        vertical-align: middle;
        color: rgb(0, 160, 220);
        transition: all .4s linear;
        transform: rotate(0);
      }
      &.move-transition{
        opacity: 1;
        transform: translate3d(0, 0, 0);
      }
      &.move-enter, &.move-leave-active{
        opacity: 0;
        transform: translate3d(24px, 0, 0);
        .inner{
          transform: rotate(180deg);
        }
      }
    }
    .cart-count{
      display: inline-block;
      font-size: 12px;
      width: 12px;
      padding-top: 4px;
      text-align: center;
      vertical-align: middle;
      color: rgb(147,153,159);
    }
  }
</style>
