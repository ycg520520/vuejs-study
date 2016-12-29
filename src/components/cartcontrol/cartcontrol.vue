<template>
  <div class="cartcontrol">
    <div class="cart-decrease" v-show="food.count>0" @click="decreaseCart" transition=""><i class="ift-remove_circle_outline"></i></div>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add" @click="addCart"><i class="ift-add_circle"></i></div>
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
    .cart-decrease,.cart-add{
      padding: 6px;
      display: inline-block;
      font-size: 24px;
      line-height: 24px;
      vertical-align: middle;
      color: #00a0dc;
      
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
    .cart-add{
    }
  }
</style>
