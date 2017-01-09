<template>
  <div class="ratingselect">
    <div class="rating-type border-1px">
      <span class="block positive" @click="select(2,$event)" :class="{'active':selectType === 2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
      <span class="block positive" @click="select(0,$event)" :class="{'active':selectType === 0}">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
      <span class="block negative" @click="select(1,$event)" :class="{'active':selectType === 1}">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
    </div>
    <div class="switch" @click="toggleContent" :class="{'on':onlyContent}">
      <i class="ift-check_circle"></i>
      <span class="text">只看有内容的评论</span>
    </div>
  </div>
</template>
<script>
const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;

export default {
  props: {
    ratings: {
      type: Array,
      default() {
        return [];
      }
    },
    selectType: {
      type: Number,
      default: ALL
    },
    onlyContent: {
      type: Boolean,
      default: false
    },
    desc: {
      type: Object,
      default() {
        return {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        };
      }
    }
  },
  computed: {
    positives() {
      return this.ratings.filter((rating) => {
        return rating.rateType === POSITIVE;
      });
    },
    negatives() {
      return this.ratings.filter((rating) => {
        return rating.rateType === NEGATIVE;
      });
    }
  },
  methods: {
    select(type, event) {
      if (!event._constructed) {
        return;
      }
      window.globalVue.$emit('ratingselect-select', type);
    },
    toggleContent(event) {
      if (!event._constructed) {
        return;
      }
      window.globalVue.$emit('content-toggle', !this.onlyContent);
    }
  }
};
</script>
<style lang="scss" rel="stylesheet/scss">
  @import '../../common/scss/mixin';

  .ratingselect{
    .rating-type{
      padding: 18px 0;
      margin: 0 18px;
      font-size: 0;
      @include border-1px(rgba(7,17,27,0.1));
      .block{
        display: inline-block;
        padding: 8px 12px;
        margin-right: 8px;
        border-radius: 2px;
        line-height: 16px;
        color: rgb(77,85,93);
        font-size: 12px;
        .count{
          font-size: 8px;
          margin-left: 2px;
        }
        &.active{
          color: #fff;
        }
        &.positive{
          background-color: rgba(0,160,220, .2);
          &.active{
            background-color: rgb(0,160,220);
          }
        }
        &.negative{
          background-color: rgba(77,85,93, .2);
          &.active{
            background-color: rgb(77,85,93);
          }
        }
      }
    }
    .switch{
      padding: 12px 18px;
      line-height: 24px;
      border-bottom: 1px solid rgba(7,17,27,0.1);
      color: rgb(147, 153, 159);
      font-size: 0;
      &.on{
        .ift-check_circle{
          color: #00c850;
        }
      }
      .ift-check_circle{
        display: inline-block;
        vertical-align: middle;
        font-size: 24px;
        margin-right: 4px;
      }
      .text{
        font-size: 12px;
        vertical-align: middle;
      }
    }
  }
</style>
