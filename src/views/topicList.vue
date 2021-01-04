<template>
  <div>
    <div class="mb30 mt30 c999" v-if="topicName" style="font-size:20px">{{topicName}}</div>
    <a-tabs default-active-key="0" @change="handleTabChange">
      <a-tab-pane :key="idx" :tab="tab.title" v-for="(tab, idx) in tabs">
        <tab-comp
          :topicList="topicList"
          :loading="loading"
          :showMoreBtn="showMoreBtn"
          v-if="topicList.length"
          @more="handleLoadMore"
        />
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
import tabComp from '../components/tabComp.vue'

export default {
  components: { tabComp },
  name: 'topicList',
  data() {
    return {
      sortType: '1',
      offset: 0,
      filterType: '0',
      topicName: '',
      loading: true,
      showMoreBtn: true,
      topicList: [],
      tabs: [
        {title: '全部'},
        {title: '知识点'},
        {title: '问答'}
      ]
    }
  },
  mounted() {
    const { topicId } = this.$route.query
    this.topicId = topicId

    this.initData()
  },
  methods: {
    handleTabChange(filterType) {
      this.filterType = filterType
      this.offset = 0
      this.sortType = '0'
      this.showMoreBtn = true
      this.initData(true)
    },
    handleSizeChange(e) {
      this.offset = 0
      this.filterType = 0
      this.showMoreBtn = true
      this.sortType = e.target.value

      this.initData(true)
    },
    initData(flag) {
      this.$message.loading('加载中...',0)
      this.loading = true
      axios.get(`/wapi/moment/get/feed/list?topicId=${this.topicId}&offset=${this.offset}&sortType=${this.sortType}&filterType=${this.filterType}`).then(res=>{
        const {zpData: {topicName,list}} = res.data || {}
        this.topicName = topicName
        const topicList = (list || []).map(v=>{
          return {
          ...v,
          content: v.content.replace(/\n|\t/g, '<br />').replace(/\\/g,'')
        }
        })
        this.loading = false
        if(flag) {
          this.topicList = []
        }
        if(topicList.length) {
          this.topicList = this.topicList.concat(topicList)
        } else {
          this.showMoreBtn = false
        }
        this.$message.destroy()
      })
    },
    handleLoadMore() {
      this.offset +=10
      this.initData()
    },
    handleQuestionDetail(item) {
      this.$router.push(`/question-detail?questionId=${item.questionInfo.questionId}&title=${item.questionInfo.content}`)
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
