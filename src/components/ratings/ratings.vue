<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h2 class="score">{{seller.score}}</h2>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}</div>
        </div>
        <div class="overview-right">
          <div class="score-warper">
            <span class="title">服务态度</span>
            <star :size="32" :score="seller.serviceScore"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-warper">
            <span class="title">商品评分</span>
            <star :size="32" :score="seller.foodScore"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-warper">
            <span class="title">送达时间</span>
            <span class="delivery">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <ratingselect :selectType="selectType" :onlyContent="onlyContent" :ratings="ratings"></ratingselect>
      <div class="rating-wrapper" ref="">
        <ul>
          <li v-show="needShow(rating.rateType, rating.text)" v-for="rating in ratings" class="rating-item">
            <div class="avatar">
              <img width="28" height="28" :src="rating.avatar" :alt="rating.username">
            </div>
            <div class="content">
              <h2 class="name">{{rating.username}}</h2>
              <div class="star-wrapper">
                <star :size="24" :score="rating.score"></star>
                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                <i class="ift-thumb_up"></i>
                <span class="item" v-for="item in rating.recommend">{{item}}</span>
              </div>
              <div class="time">{{rating.rateTime | formatDate}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
import star from 'components/star/star';
import split from 'components/split/split';
import ratingselect from 'components/ratingselect/ratingselect';;
import {formatDate} from 'common/js/date';

const ALL = 2;
const ERR_OK = 0;
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      selectType: ALL,
      onlyContent: true,
      ratings: []
    };
  },
  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd hh:mm');
    }
  },
  created() {
    this.$http.get('/api/ratings')
    .then((res) => {
      return res.json();
    }).then((res) => {
      if (res.errno === ERR_OK) {
        this.ratings = res.data;
        this.$nextTick(() => {
          this.scroll = new BScroll(this.$refs.ratings, {
            click: true
          });
        });
      }
    });
    this.$nextTick(() => {
      window.globalVue.$on('ratingselect-select', (type) => {
        this.selectTypeFn(type);
      });
      window.globalVue.$on('content-toggle', (onlyContent) => {
        this.onlyContentFn(onlyContent);
      });
    });
  },
  methods: {
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
  components: {
    star,
    split,
    ratingselect
  }
};
</script>

<style lang="scss" rel="stylesheet/scss">
@import '../../common/scss/mixin';
.ratings{
  position: absolute;
  top: 176px;
  bottom: 0;
  width: 100%;
  background-color: #fff;
  overflow: hidden;
  .overview{
    display: flex;
    padding: 18px 0;
    .overview-left{
      width: 137px;
      padding: 6px 0;
      border-right: 1px solid rgba(7, 17, 27, .1);
      text-align: center;
      @media only screen and (max-width: 320px){
        width: 110px;
      }
      .score{
        line-height: 28px;
        font-size: 24px;
        color: rgb(255, 153, 0);
        margin-bottom: 6px;
      }
      .title{
        margin-bottom: 8px;
        line-height: 12px;
        font-size: 12px;
        color: rgb(7, 17, 27);
      }
      .rank{
        line-height: 10px;
        font-size: 10px;
        color: rgb(147, 153, 159);
      }
    }
    .overview-right{
      flex: 1;
      padding:6px 0 6px 24px;
      @media only screen and (max-width: 320px){
        padding-left:6px;
      }
      .score-warper{
        font-size: 0;
        margin-bottom: 8px;
        .title{
          line-height: 18px;
          font-size: 12px;
          color: rgb(7,17,27);
          vertical-align: middle;
        }
        .star{
          display: inline-block;
          margin: 0 12px;
          vertical-align: middle;
        }
        .score{
          display: inline-block;
          vertical-align: middle;
          font-size: 12px;
          color: rgb(255, 153, 0);
          line-height: 18px;
        }
      }
      .delivery-warper{
        font-size: 0;
        line-height: 18px;
        .title{
          font-size: 12px;
          color: rgb(7,17,27);
        }
        .delivery{
          margin-left: 12px;
          font-size: 12px;
          color: rgb(147, 153, 159);
        }
      }
    }
  }
  .rating-wrapper{
    padding:0 18px;
    .rating-item{
      display: flex;
      padding: 18px 0;
      @include border-1px(rgba(7,17,27,.1));
      .avatar{
        width: 28px;
        margin-right: 12px;
        img{
          border-radius: 50%;
        }
      }
      .content{
        position: relative;
        flex: 1;
        .name{
          line-height: 12px;
          font-size: 10px;
          color: rgb(7,17,27);
          margin-bottom: 4px;
        }
        .star-wrapper{
          display:inline-block;
          font-size: 0;
          margin-bottom: 6px;
          .star{
            display:inline-block;
            vertical-align: middle;
            margin-right: 6px;
          }
          .delivery{
            display:inline-block;
            vertical-align: middle;
            line-height: 12px;
            font-size: 10px;
            color: rgb(147,153,159);
          }
        }
        .text{
          margin-bottom: 8px;
          line-height: 18px;
          color: rgb(7,17,27);
          font-size: 12px;
        }
        .recommend{
          line-height: 16px;
          font-size: 0;
          .ift-thumb_up, .item{
            display: inline-block;
            margin: 0 8px 4px 0;
            font-size: 9px;
          }
          .ift-thumb_up{
            color: rgb(0, 160, 220);
          }
          .item{
            padding: 0 6px;
            border: 1px solid rgba(7,17,27,.1);
            border-radius: 2px;
            color: rgb(147,153,159);
            background-color: #fff;
          }
        }
        .time{
          position: absolute;
          right: 0;
          top: 0;
          line-height: 12px;
          font-size: 10px;
          color: rgb(147,153,159);
        }
      }
    }
  }
}
</style>
