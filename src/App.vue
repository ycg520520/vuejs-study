<template>
  <div>
    <v-header :seller="seller"></v-header>
    <div class="tabs border-1px">
      <div class="tabs-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tabs-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tabs-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import header from 'components/header/header';
import {urlParse} from 'common/js/unit';
const ERR_OK = 0;

export default {
  data() {
    return {
      seller: {
        id: (() => {
          let queryParm = urlParse();
          return queryParm.id;
        })()
      }
    };
  },
  created() {
    this.$http.get('/api/seller?id=' + this.seller.id).then((res) => {
      return res.json();
    }).then((data) => {
      if (data.errno === ERR_OK) {
        this.seller = Object.assign({}, this.seller, data.data);
      }
    });
  },
  components: {
    'v-header': header
  }
};
</script>

<style lang="scss" rel="stylesheet/scss">
  @import 'common/scss/public';
  @import 'common/scss/mixin';
  .tabs{
    position: relative;
    z-index: 1;
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    @include border-1px(rgba(7,17,27,.1));
    &-item {
      flex: 1;
      text-align: center;
      & > a{
        color: rgb(77,85,93); 
        &.active{
         color: rgb(240,20,20); 
        }
      }
    }
  }
</style>
