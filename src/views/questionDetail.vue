<template>
  <div>
    <a-page-header
      style="border: 1px solid rgb(235, 237, 240)"
      :title="$route.query.title"
      @back="() => $router.back()"
      v-if="$route.query.from == 'topicList'"
    />
    <div class="mb20 mt20" v-else style="font-size:20px;color:#999;">{{questionInfo.content}}</div>
    <a-tabs default-active-key="1" @change="handleTabChange">
      <a-tab-pane key="1" tab="全部">
        <template v-if="questionList.length">
            <div class="list-item" v-for="(item,index) in questionList" :key="index">
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
                    <img :src="picItem.thumbnailUrl" class="picture">
                  </div>
                </div>
              </div>
              <a v-if="item.questionInfo" href="#" class="question" target="_blank">
                <i class="iboss iboss-wenti green">问</i>
                <div class="question-title">{{item.questionInfo.content}}</div>
                <div class="answer-count">已回答{{item.questionInfo.answerCount}}</div>
              </a>
              <div class="time has-no-topicname">发布于：{{item.addTime | formatDateString}}</div>
            </div>
          </template>
          <a-button
            type="primary"
            block
            @click="handleLoadMore"
            v-if="questionList.length && showMoreBtn"
            class="mt30 mb30"
            size="large"
            :loading="loading"
          >
            加载更多
          </a-button>
      </a-tab-pane>
      <div slot="tabBarExtraContent">
        <a-radio-group :value="sortType" @change="handleSizeChange">
          <a-radio-button value="1">
            最热
          </a-radio-button>
          <a-radio-button value="0">
            最新
          </a-radio-button>
        </a-radio-group>
      </div>
    </a-tabs>
  </div>
</template>

<script>
/* eslint-disable */
import axios from 'axios'
import jsonp from '@/utils/jsonp'

export default {
  name: 'questionDetail',
  data() {
    return {
      sortType: '1',
      offset: 0,
      loading: true,
      showMoreBtn: true,
      questionInfo: {},
      questionList: []
    }
  },
  mounted() {
    const { questionId } = this.$route.query
    this.questionId = questionId

    this.initData()
  },
  methods: {
    handleTabChange(key) {
      console.log(key)
    },
    handleSizeChange(e) {
      this.offset = 0
      this.showMoreBtn = true
      this.sortType = e.target.value

      this.initData(true)
    },
    initData(flag) {
      this.$message.loading('加载中...',0)
      this.loading = true
      axios.get(`/wapi/moment/get/answer/feed?questionId=${this.questionId}&offset=${this.offset}&sortType=${this.sortType}&filterType=0`).then(res=>{
        this.questionInfo = (res.data || {}).zpData.questionInfo || {}
        const questionList = ((res.data || {}).zpData.list || []).map(v=>{
          console.log(v.content.replace(/↵/g, '<br />'))
          return {
          ...v,
          content: v.content.replace(/\n|\t/g, '<br />').replace(/\\/g,'')
        }
        })
        if(flag) {
          this.questionList = []
        }
        if(questionList.length) {
          this.questionList = this.questionList.concat(questionList)
        } else {
          this.showMoreBtn = false
        }
        this.$message.destroy()
        this.loading = false
      })
    },
    handleLoadMore() {
      this.offset +=10
      this.initData()
    }
  },
}
</script>

<style lang="less" scoped>
  .list-item {
    padding: 20px 30px;
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
