/** * 화면ID : G001P02 * 화면명 : 게임참가팀선택 화면 * 생성일시 : 2022.10.17 *
작성자 : 여인준 * 작업일지 * 2022.10.17(월) 여인준 : 최초생성 */

<template>
	<v-container>
		<h2>게임참가팀 선택</h2>
		<!-- TODO 다음 화면 컴포넌트 등록후 라우팅명 정상화 필요 -->
		<PageMoveBtn pRouteCompName="LoginPage" />
		<v-select
			v-model="selectedGameType"
			:items="selectItems"
			item-text="gameTypeCodeName"
			item-value="gameTypeCode"
			label="경기유형"
		/>
		<!-- 상대팀 검색 화면 별도 컴포넌트로 분리 -->
		<GameOpponentSearchComp v-if="isMatchGame()" />
		<DeleteBtn pBtnName="경기삭제" />
	</v-container>
</template>

<script>
	import GameOpponentSearchComp from '@/components/game/GameOpponentSearchComp.vue';
	import PageMoveBtn from '@/components/button/PageMoveBtn.vue';
	import DeleteBtn from '@/components/button/DeleteBtn.vue';

	export default {
		components: {
			GameOpponentSearchComp,
			PageMoveBtn,
			DeleteBtn,
		},
		data() {
			return {
				selectItems: [
					{ gameTypeCodeName: '자체전', gameTypeCode: '01' },
					{ gameTypeCodeName: '교류전', gameTypeCode: '02' },
				],
				selectedGameType: '01',
			};
		},
		methods: {
			isMatchGame() {
				if (this.selectedGameType == '02') {
					return true;
				}
				return false;
			},
		},
	};
</script>

<style lang="scss" scoped></style>
