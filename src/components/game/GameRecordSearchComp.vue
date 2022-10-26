<template>
	<v-container>
		<h2>게임기록 검색조건</h2>
		<GameTypeSelect @value="setGameTypeCode" />
		<HomeAwaySelect @value="setHomeAwayCode" />
		<DatePickerComp pLabelName="검색 시작일" />
		<DatePickerComp pLabelName="검색 종료일" />
		<v-text-field label="경기장주소" />
		<v-text-field label="경기장명" />
		<SearchBtn />

		<!-- 반복문을 돌려서 데이터 렌더링 -->
		<GameRecordComp />
	</v-container>
</template>

<script>
	import DatePickerComp from '@/components/common/CustomDatePickerComp.vue';
	import SearchBtn from '@/components/button/SearcheBtn.vue';
	import GameTypeSelect from '@/components/selectbox/GameTypeSelect.vue';
	import HomeAwaySelect from '@/components/selectbox/HomeAwaySelect.vue';
	import GameRecordComp from '@/components/game/GameRecordComp.vue';

	export default {
		components: {
			DatePickerComp,
			SearchBtn,
			GameTypeSelect,
			HomeAwaySelect,
			GameRecordComp,
		},
		data() {
			return {
				gameTypeCode: '',
				homeAwayCode: '',
			};
		},
		methods: {
			setGameTypeCode(value) {
				this.gameTypeCode = value;
			},
			setHomeAwayCode(value) {
				this.homeAwayCode = value;
			},
		},
	};
</script>

<style lang="scss" scoped></style>
