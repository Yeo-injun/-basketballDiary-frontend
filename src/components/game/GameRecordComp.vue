<template>
	<v-card>
		<PageMoveBtn :pBtnName="this.getBtnName()" />
		<!-- 상세보기 버튼 추가 -->
		<v-card-text>
			<div>경기일자 : {{ gameYmd }}</div>
			<div>
				경기장주소 : {{ gamePlaceAddress }} / 경기장명 : {{ gamePlaceName }}
			</div>
		</v-card-text>
		<ScoreBoardComp />
		<QuarterScoreBoardComp />
	</v-card>
</template>

<script>
	import PageMoveBtn from '@/components/button/PageMoveBtn.vue';
	import ScoreBoardComp from '@/components/game/ScoreBoardComp.vue';
	import QuarterScoreBoardComp from '@/components/game/QuarterScoreBoardComp.vue';

	export default {
		components: {
			PageMoveBtn,
			ScoreBoardComp,
			QuarterScoreBoardComp,
		},
		data() {
			return {
				gameYmd: '2022-10-27',
				gamePlaceAddress: '',
				gamePlaceName: '',
			};
		},
		methods: {
			getBtnName() {
				// TODO 버튼 이름 세팅하를 로직 구현 필요
				// GAME_STATE_CODE 값으로 버튼명 설정
				// 상세보기 / 기록하기 / 참가팀선택하기
				return '기록하기';
			},
		},
	};
</script>

<style lang="scss" scoped></style>
