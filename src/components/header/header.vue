<template>
  <div class="header">
    <div class="content-warper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar" alt="">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">{{seller.description}}/{{seller.deliveryTime}}分钟送达</div>
        <div class="supports" v-if="seller.supports">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}
          </span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count" @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="ift-keyboard_arrow_right"></i>
      </div>
    </div>
   <div class="bulletin-warper" @click="showDetail">
     <span class="bulletin-title"></span>
     <span class="bulletin-text">{{seller.bulletin}}</span>
     <i class="ift ift-keyboard_arrow_right"></i>
   </div>
   <div class="background">
     <img :src="seller.avatar" width="100%" height="100%">
   </div>
   <transition name="fade"  mode="out-in">
   <div class="detail" v-show="detailShow">
     <div class="detail-warper clearfix">
       <div class="detail-main">
         <h1 class="name">{{seller.name}}</h1>
         <div class="star-wrapper">
           <star :score="seller.score" :size="32"></star>
         </div>
         <div class="title">
           <div class="line"></div>
           <div class="text">优惠信息</div>
           <div class="line"></div>
         </div>
         <ul v-if="seller.supports" class="supports">
           <li class="supports-item" v-for="item in seller.supports">
             <span class="icon" :class="classMap[item.type]"></span>
             <span class="text">{{item.description}}</span>
           </li>
         </ul>
         <div class="title">
           <div class="line"></div>
           <div class="text">商家公共</div>
           <div class="line"></div>
         </div>
         <div class="bulletin">
           <p class="content">{{seller.bulletin}}</p>
         </div>
       </div>
     </div>
     <div class="detail-close" @click="hideDetail"><i class="ift-close"></i></div>
   </div>
   </transition>
  </div>
</template>

<script>
import star from 'components/star/star';
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      detailShow: false
    };
  },
  methods: {
    showDetail() {
      this.detailShow = true;
    },
    hideDetail() {
      this.detailShow = false;
    }
  },
  created() {
    this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
  },
  components: {
    star
  }
};
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../common/scss/mixin';
  .header{
    position: relative;
    color:#fff;
    background-color: rgba(7,17,27,.5);
    .content-warper{
      padding: 24px 12px 18px 24px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      .avatar,.content{
        display: inline-block;
        font-size: 14px;
        img{
          border-radius: 2px;
        }
      }
      .content{
        flex: 1;
        margin-left: 14px;
        .title{
          display: flex;
          font-size: 24px;
          margin: 2px 0 4px 0;
          .brand{
            width: 30px;
            height: 18px;
            @include bg-image('brand');
            background-repeat: no-repeat;
            background-size: 30px 18px;
          }
          .name{
            flex: 1;
            margin-left: 6px;
            font-size: 16px;
            line-height: 18px;
            font-weight: bold;
          }
        }
        .description{
          line-height: 16px;
          margin-bottom: 2px;
          font-size: 12px;
        }
        .supports{
          display: flex;
          .icon{
            display: inline-block;
            width:12px;
            height: 12px;
            margin-right: 4px;
            vertical-align: middle;
            background-size: 12px 12px;
            background-repeat: no-repeat;
            &.decrease{
              @include bg-image('decrease_1');
            }
            &.discount{
              @include bg-image('discount_1');
            }
            &.guarantee{
              @include bg-image('guarantee_1');
            }
            &.invoice{
              @include bg-image('invoice_1');
            }
            &.special{
              @include bg-image('special_1');
            }
          }
          .text{
            flex: 1;
            line-height: 12px;
            font-size: 12px;
          }
        }
      }
      .support-count{
        position: absolute;
        right: 12px;
        bottom: 18px;
        padding: 0 8px;
        height: 24px;
        line-height: 24px;
        border-radius: 14px;
        background-color: rgba(0,0,0,0.2);
        text-align: center;
        display: flex;
        .count{
          vertical-align: top;
          font-size: 10px;
        }
        .ift-keyboard_arrow_right{
          font-size: 16px;
          text-align: right;
        } 
      }
    }
    .bulletin-warper{
      height: 28px;
      padding: 0 12px 0 12px;
      display: flex;
      align-items: center;
      background-color: rgba(7,17,27,.2);
      .bulletin-title{
        display:inline-block;
        width: 22px;
        height: 12px;
        @include bg-image('bulletin');
        background-size: 22px 12px;
        background-repeat: no-repeat;
        vertical-align: top;
      }
      .bulletin-text{
        flex: 1;
        margin: 0 4px; 
        font-size: 12px;
        line-height: 12px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .background{
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      z-index: -1;
      filter:blur(10px);
      overflow: hidden;
    }
    .detail{
      position:fixed;
      z-index: 100;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: auto;
      transition: all .3s;
      background-color: rgba(7, 17, 27, 0.8);
      backdrop-filter: blur(10px);
      &.fade-enter-active,&.fade-leave{
        opacity: 1;
      }
      &.fade-enter,&.fade-leave-active{
        opacity: 0;
      }
      .detail-warper{
        width: 100%;
        min-height: 100%;
        .detail-main{
          margin-top: 64px;
          padding-bottom: 64px;
          .name{
            line-height: 16px;
            text-align: center;
            font-size: 16px;
            font-weight: 700;
          }
          .star-wrapper{
            margin-top: 18px;
            padding: 2px;
            text-align: center;
          }
        }
      }
      .title{
        width: 80%;
        margin: 30px auto 24px auto;
        display: flex;
        .line{
          flex:  1;
          position: relative;
          top: -6px;
          border-bottom: 1px solid rgba(255,255,255,.2)
        }
        .text{
          padding: 0 12px;
          font-size: 14px;
          font-weight: 700;
        }
      }
      .supports{
        width: 80%;
        margin: 0 auto;
        .supports-item{
          padding: 0 12px;
          margin-bottom: 12px;
          font-size: 0;
          &:last-child{
            margin-bottom: 0;
          }
          .icon{
            display: inline-block;
            width: 16px;
            height: 16px;
            margin-right: 6px;
            background-size: 16px 16px;
            background-repeat: no-repeat;
            vertical-align: top;
            &.decrease{
              @include bg-image('decrease_2');
            }
            &.discount{
              @include bg-image('discount_2');
            }
            &.guarantee{
              @include bg-image('guarantee_2');
            }
            &.invoice{
              @include bg-image('invoice_2');
            }
            &.special{
              @include bg-image('special_2');
            }
          }
          .text{
            line-height: 16px;
            font-size: 12px;
          }
        }
      }
      .bulletin{
        width: 80%;
        margin: 0 auto;
        .content{
          padding: 0 12px;
          line-height: 24px;
          font-size: 12px;
        }
      }
      .detail-close{
        position: relative;
        width: 32px;
        height: 32px;
        margin: -48px auto 0 auto;
        clear: both;
        font-size: 32px;
        text-align: center;
      }
    }
  }

</style>





