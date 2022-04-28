<template>

</template>

<script>
export default {
  name:'VuetifyTable',
    data () {
      return {
       headers: [
       { text: '연고지:', align: 'start', sortable: false, value: 'A'},
       { text: '체육관:', value: 'B' },
       { text: '회원수:', value: 'C' },
       { text: '창단일:', value: 'D' },
       { text: '정기운동 시간/장소: ', value: 'E' },
       ],
       contents: [
        {
          A:"서울특별시",
          B:"장충동 체육관",
          C:"21명",
          D:"2019-06-12",
          E:"일요일 08:00~11:00"
        },
        {
          A:"경기도 시흥시",
          B:"함현상체육관",
          C:"20명",
          D:"2020-10-12",
          E:"일요일 09:00~11:00"
        },
        {
          A:"경기도 시흥시",
          B:"함현상체육관",
          C:"15",
          D:"2011-02-05",
          E:"일요일 09:00~11:00"
        },
      ],
    }
  },
}
</script>

<style>

</style>