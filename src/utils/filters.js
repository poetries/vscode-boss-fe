/*
 * @Author: your name
 * @Date: 2021-01-03 13:36:18
 * @LastEditTime: 2021-01-03 14:02:32
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /vscode-plugin-vue-h5/src/utils/filters.js
 */
import dayjs from 'dayjs'

export default {
  salesStatusText: (value) => {
    const statusText = {
      '0': '待售',
      '1': '在售',
    }
    return statusText[value]
  },
  formatContent: (content) => {
    const str = content.replace(/↵/g, '<br />')
    return str
  },
  formatDate: (timestamp, format) =>
    timestamp ? dayjs(timestamp).format(format) : '',
  formatDateString: (timestamp) =>
    timestamp ? dayjs(timestamp).format('YYYY-MM-DD') : '',
  formatDateTimeString: (timestamp) =>
    timestamp ? dayjs(timestamp).format('YYYY-MM-DD HH:mm:ss') : '',
}
