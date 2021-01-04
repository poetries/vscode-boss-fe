<template>
  <div class="plr30">
    <div class="list-item" v-for="(item,index) in topicList" :key="index">
      <div class="item-header">
        <div class="avtar">
          <div class="img-wrap">
            <img :src="item.postUserInfo.avatar" class="avtar-img" />
          </div>
        </div>
        <div class="user-info">
          <div class="name">{{item.postUserInfo.nickname}}</div>
          <div class="job-title">{{item.postUserInfo.subTitle}}</div>
        </div>
      </div>
      <div class="text-viewer">
        <div class="text markdown-body">
          <p v-html="item.content"></p>
        </div>
      </div>
      <div class="picture-viewer" v-if="item.picList">
        <div class="picture-list">
          <div class="picture-item" v-for="(picItem,idx) in item.picList" :key="idx">
            <img :src="picItem.thumbnailUrl" class="picture" @click="previewImg(picItem.thumbnailUrl)">
          </div>
        </div>
      </div>
      <a v-if="item.questionInfo"  class="question" @click="handleQuestionDetail(item)">
        <i class="iboss iboss-wenti green">问</i>
        <div class="question-title">{{item.questionInfo.content}}</div>
        <div class="answer-count">已回答{{item.questionInfo.answerCount}}</div>
      </a>
      <div class="time has-no-topicname">发布于：{{item.addTime | formatDateString}}</div>
    </div>
    <a-button type="primary" block @click="handleLoadMore" v-if="showMoreBtn" class="mt30 mb30" :loading="loading" size="large">
      加载更多
    </a-button>
    <a-modal
      :visible="visible"
      :footer="null"
      :centered="true"
      width="1200"
      @cancel="handleCancel"
    >
      <img :src="perviewImgUrl" />
    </a-modal>
  </div>
</template>

<script>
/* eslint-disable */
import axios from 'axios'
import jsonp from '@/utils/jsonp'

export default {
  name: 'tabComp',
  props: {
    topicList: {
      type: Array,
      default: []
    },
    loading: {
      type: Boolean,
      default: false
    },
    showMoreBtn: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      visible: false,
      perviewImgUrl: ''
    }
  },
  methods: {
    handleLoadMore() {
      this.$emit('more',{})
    },
    handleQuestionDetail(item) {
      this.$router.push(`/question-detail?questionId=${item.questionInfo.questionId}&title=${item.questionInfo.content}`)
    },
    previewImg(url) {
      this.perviewImgUrl = url
      this.visible = true
    },
    handleCancel() {
      this.visible = false
    }
  },
}
</script>

<style lang="less" scoped>
  .list-item {
    padding: 20px 0;
    border-bottom: 1px solid #f0f1f2;
    position: relative;

    .item-header {
      display: flex;
    }

    .avtar {
      width: 50px;
      height: 50px;
      position: relative;

      .avtar-img {
        max-width: 100%;
        max-height: 100%;
        border-radius: 50%;
      }
    }

    .img-wrap {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .user-info {
      margin-left: 14px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .name {
        color: #999;
        font-size: 17px;
        line-height: 24px;
        font-weight: 600;
      }
      .job-title {
        color: #61687c;
        font-size: 13px;
        line-height: 18px;
        font-weight: 400;
      }
    }
    .text-viewer {
      position: relative;
      line-height: 24px;
      font-size: 14px;
      overflow: hidden;
      margin-top: 16px;

      .text {
        font-weight: 400;
        color: #202329;
        transition: all .3s;
      }
      .markdown-body {
        color: #fff !important;
      }
    }
  }
  .iboss {
    font-family: iboss!important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
  }
  .list-item .question .iboss {
    margin-right: 8px;
  }
  .green, a:hover {
    color: #00c2b3;
  }
  .list-item .question {
    padding: 12px 10px;
    display: flex;
    align-items: center;
    background-color: #f2f3f6;
    border-radius: 2px;
    margin-top: 16px;
    word-break: break-all;
  }
  .list-item .question .question-title {
    font-size: 14px;
    font-weight: 500;
    color: #414a60;
    line-height: 20px;
    margin-right: 5px;
    flex: 1;
  }
  .list-item .question .answer-count {
    font-size: 13px;
    font-weight: 400;
    color: #61687c;
    line-height: 18px;
  }
  .list-item .time {
    width: 100%;
    font-size: 12px;
    font-weight: 400;
    color: #61687c;
    line-height: 17px;
    margin-top: 20px;
  }
  .picture-viewer {
    margin-top: 16px;
  }
  .picture-viewer .picture-list {
    display: flex;
    flex-wrap: wrap;
  }
  .picture-viewer .picture-list .picture-item {
    width: 120px;
    height: 120px;
    border-radius: 4px;
    overflow: hidden;
    background-color: #f5f5f6;
    margin-right: 10px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .picture-viewer .picture-list .picture-item .picture {
    max-width: 100%;
  }
</style>
