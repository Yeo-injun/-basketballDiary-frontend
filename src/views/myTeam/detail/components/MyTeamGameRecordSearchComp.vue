<template>
	<v-container>
		<h4>검색조건</h4>
		<GameTypeSelect @value="setGameTypeCode" />
		<HomeAwaySelect @value="setHomeAwayCode" />
		<DatePickerComp pLabelName="검색 시작일" />
		<DatePickerComp pLabelName="검색 종료일" />
		<v-text-field label="경기장주소" />
		<v-text-field label="경기장명" />
		<SearchBtn />
	</v-container>
</template>

<script>
	import DatePickerComp from '@/components/common/CustomDatePickerComp.vue';
	import SearchBtn from '@/components/button/SearcheBtn.vue';
	import GameTypeSelect from '@/components/selectbox/GameTypeSelect.vue';
	import HomeAwaySelect from '@/components/selectbox/HomeAwaySelect.vue';

	export default {
		components: {
			DatePickerComp,
			SearchBtn,
			GameTypeSelect,
			HomeAwaySelect,
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
