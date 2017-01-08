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
          <div class="cartcontrol-warper">
            <cartcontrol @cart-add="drop" :food="food"></cartcontrol>
          </div>
          <transition name="fade">
            <div class="buy" v-show="!food.count || food.count === 0" @click.stop.prevent="addFirst">加入购物车</div>
          </transition>
        </div>
        <split></split>
        <div class="info" v-show="food.info">
          <h2 class="title">商品信息</h2>
          <div class="text" >{{food.info}}</div>
        </div>
        <split></split>
        <div class="rating">
          <h2 class="title">商品评价</h2>
          <ratingselect :selectType="selectType"  :onlyContent="onlyContent" :desc="desc" :ratings="food.ratings" @ratingselect-select="selectTypeFn" @content-toggle="onlyContentFn"></ratingselect>
          <div class="rating-warper">
            <ul v-show="food.ratings">
              <li v-show="needShow(rating.rateType, rating.text)" v-for="rating in food.ratings" class="rating-item">
                <div class="user">
                  <span class="name">{{rating.username}}</span>
                  <img :src="rating.avatar" class="avatar" width="12" height="12">
                </div>
                <div class="time">{{rating.rateTime | formatDate}}</div>
                <div class="text"><span :class="{'ift-thumb_up':rating.rateType === 0, 'ift-thumb_down':rating.rateType === 1}"></span>
                  {{rating.text}}
                </div>
              </li>
            </ul>
            <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import Vue from 'vue';
import BScroll from 'better-scroll';
import split from 'components/split/split';
import cartcontrol from 'components/cartcontrol/cartcontrol';
import ratingselect from 'components/ratingselect/ratingselect';
import {formatDate} from 'common/js/date';

const ALL = 2;
export default {
  props: {
    food: {
      type: Object
    }
  },
  data() {
    return {
      showFlag: false,
      selectType: ALL,
      onlyContent: true,
      desc: {
        all: '全部',
        positive: '推荐',
        negative: '吐槽'
      }
    };
  },
  created() {
    this.$on('cart-add', (el) => {
      this.drop(el);
    });
  },
  methods: {
    show() {
      this.showFlag = true;
      this.selectType = ALL;
      this.onlyContent = false;
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
    },
    selectTypeFn(type) {
      this.selectType = type;
      this.$nextTick(() => {
        this.scroll.refresh();
      });
    },
    onlyContentFn(onlyContent) {
      this.onlyContent = onlyContent;
      this.$nextTick(() => {
        this.scroll.refresh();
      });
    },
    needShow(type, text) {
      if (this.onlyContent && !text) {
        return false;
      }
      if (this.selectType === ALL) {
        return true;
      } else {
        return type === this.selectType;
      }
    }
  },
  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd hh:mm');
    }
  },
  components: {
    cartcontrol,
    split,
    ratingselect
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
      position: relative;
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
        opacity:１;
        cursor: default;
        &.fade-enter, &.fade-leace-active{
          opacity: 0;
        }
      }
    }
    .info{
      padding: 18px;
      .title{
        font-size: 14px;
        margin-bottom: 6px;
        line-height: 14px;
        color: rgb(7,17,27);
      }
      .text{
        line-height: 24px;
        font-size: 12px;
        padding: 0 8px;
        color: rgb(77, 85, 93);
      }
    }
    .rating{
      padding-top: 18px;
      .title{
        font-size: 14px;
        margin-left: 18px;
        line-height: 14px;
        color: rgb(7,17,27);
      }
      .rating-warper{
        padding: 0 18px;
        .rating-item{
          positive: relative;
          padding: 16px 0;
          @include border-1px(rgba(7,17,27,.1));
          .user{
            position: absolute;
            top: 16px;
            right: 0;
            line-height: 12px;
            font-size: 0;
            .name{
              display: inline-block;
              vertical-align: middle;
              font-size: 10px;
              color: rgb(147, 153, 159);
            }
            .avatar{
              margin-left: 3px;
              border-radius:50%;
              vertical-align: middle;
            }
          }
          .time{
            margin-bottom: 6px;
            font-size: 12px;
            line-height: 10px;
            color: rgb(147, 153, 159);
          }
          .text{
            line-height: 16px;
            font-size: 12px;
            color: rgb(7,17,27);
            .ift-thumb_down, .ift-thumb_up{
              margin-right: 4px;
              line-height: 16px;
              font-size: 12px;
            }
            .ift-thumb_up{
              color: rgb(0, 160, 220);
            }
            .ift-thumb_down{
              color: rgb(147,153,159);
            }
          }
        }
        .no-rating{
          padding: 16px 0;
          font-size: 12px;
          text-align: center;
          color: rgb(147, 153, 159);
        }
      }
    }
  }
</style>
