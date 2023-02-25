<template>
	<v-container>
		<v-row>
			<v-col>
				<AddModeBtn
					:pBtnInfo="this.addBtnInfo"
					:pActiveMode="this.activeMode"
					@click-mode-btn="enableBtn"
				/>
			</v-col>
			<v-col>
				<CancelModeBtn
					:pBtnInfo="this.cancelBtnInfo"
					:pActiveMode="this.activeMode"
					@click-mode-btn="enableBtn"
				/>
			</v-col>
		</v-row>
		TODO 스탯 입력창 구현 - 생성 데이터 형식과 어디서 데이터를 보관할지... 결정
		{ playerSeq : 게임참가선수 식별자, statType : 스탯의 유형 - 자유투 시도인지,
		성공인지, 리바운드인지 count : 횟수 mode : 추가인지 취소인지.. } - 선택된
		선수를 기준으로 스탯이 기록되어야 하니 RecordInputBoardComp이상의 부모
		컴포넌트에서 기록 데이터를 관리하기
	</v-container>
</template>

<script>
	import AddModeBtn from '@/views/game/quarterRecordInputBoard/components/InputModeBtn.vue';
	import CancelModeBtn from '@/views/game/quarterRecordInputBoard/components/InputModeBtn.vue';

	const ADD_MODE = 'add';
	const CANCEl_MODE = 'cancel';
	export default {
		components: {
			AddModeBtn,
			CancelModeBtn,
		},
		data() {
			return {
				addBtnInfo: {
					btnName: '입력모드',
					mode: ADD_MODE,
				},
				cancelBtnInfo: {
					btnName: '취소모드',
					mode: CANCEl_MODE,
				},
				activeMode: ADD_MODE,
			};
		},
		methods: {
			enableBtn(mode) {
				this.activeMode = mode;
			},
		},
	};
</script>

<style lang="scss" scoped></style>
