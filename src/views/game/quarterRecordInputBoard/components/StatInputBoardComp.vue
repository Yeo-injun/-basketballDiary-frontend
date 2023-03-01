<template>
	<v-container>
		{{ this.test }}
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
		<TwoPointInputBtn
			:pType="this.type.twoPoint"
			@get-stat-type="emitInputInfo"
		/>
		<TryTwoPointInputBtn
			:pType="this.type.tryTwoPoint"
			@get-stat-type="emitInputInfo"
		/>

		TODO 스탯 입력창 구현 - <br />생성 데이터 형식과 어디서 데이터를 보관할지...
		결정 <br />{ playerSeq : 게임참가선수 식별자, statType : 스탯의 유형 -
		자유투 시도인지, 성공인지, 리바운드인지 count : 횟수 mode : 추가인지
		취소인지.. } <br />
		- 선택된 선수를 기준으로 스탯이 기록되어야 하니 RecordInputBoardComp에서
		기록 데이터를 관리하기 <br />
		- 임시데이터를 건별로 저장하고, 계속 연산해서 보여주기 <br />
		1. 스탯 입력 2. 건별 임시 저장 3. 임시저장된 데이터를 기준으로 엔트리 정보
		update 4. 저장시 현재 화면의 엔트리 정보가 그대로 백엔드로 날라감
	</v-container>
</template>

<script>
	import StatType from '@/const/StatType.js';

	import AddModeBtn from '@/views/game/quarterRecordInputBoard/components/InputModeBtn.vue';
	import CancelModeBtn from '@/views/game/quarterRecordInputBoard/components/InputModeBtn.vue';

	import TwoPointInputBtn from '@/components/game/stat/StatInputBtn.vue';
	import TryTwoPointInputBtn from '@/components/game/stat/StatInputBtn.vue';

	const ADD_MODE = 'add';
	const CANCEl_MODE = 'cancel';
	export default {
		components: {
			AddModeBtn,
			CancelModeBtn,
			TwoPointInputBtn,
			TryTwoPointInputBtn,
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
				type: {
					twoPoint: StatType.TWO_POINT,
					tryTwoPoint: StatType.TRY_TWO_POINT,
				},
				test: '',
			};
		},
		methods: {
			enableBtn(mode) {
				this.activeMode = mode;
			},
			emitInputInfo(statType) {
				this.test = `===========테스트요 ${statType}`;
				const inputInfo = {
					statType: statType,
					mode: this.activeMode,
				};
				this.$emit('record-stat', inputInfo);
			},
		},
	};
</script>

<style lang="scss" scoped></style>
