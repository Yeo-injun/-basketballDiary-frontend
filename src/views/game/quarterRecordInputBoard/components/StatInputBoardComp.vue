<template>
	<v-container>
		<v-row>
			<v-col>
				<AddModeBtn
					:pBtnInfo="this.addBtnInfo"
					:pActiveMode="this.activeMode"
					@click-mode-btn="changeActiveMode"
				/>
			</v-col>
			<v-col>
				<CancelModeBtn
					:pBtnInfo="this.cancelBtnInfo"
					:pActiveMode="this.activeMode"
					@click-mode-btn="changeActiveMode"
				/>
			</v-col>
		</v-row>
		<v-row>
			<v-col cols="4">
				<FreeThrowInputBtn
					:pType="this.type.freeThrow"
					:pActiveMode="this.activeMode"
					@get-stat-type="emitInputInfo"
				/>
			</v-col>
			<v-col cols="4">
				<TwoPointInputBtn
					:pType="this.type.twoPoint"
					:pActiveMode="this.activeMode"
					@get-stat-type="emitInputInfo"
				/>
			</v-col>
			<v-col cols="4">
				<ThreePointInputBtn
					:pType="this.type.threePoint"
					:pActiveMode="this.activeMode"
					@get-stat-type="emitInputInfo"
				/>
			</v-col>
		</v-row>
		<v-row>
			<v-col cols="4">
				<TryFreeThrowInputBtn
					:pType="this.type.tryFreeThrow"
					:pActiveMode="this.activeMode"
					@get-stat-type="emitInputInfo"
				/>
			</v-col>
			<v-col cols="4">
				<TryTwoPointInputBtn
					:pType="this.type.tryTwoPoint"
					:pActiveMode="this.activeMode"
					@get-stat-type="emitInputInfo"
				/>
			</v-col>
			<v-col cols="4">
				<TryThreePointInputBtn
					:pType="this.type.tryThreePoint"
					:pActiveMode="this.activeMode"
					@get-stat-type="emitInputInfo"
				/>
			</v-col>
		</v-row>
		<v-row>
			<v-col cols="4">
				<AssistInputBtn
					:pType="this.type.assist"
					:pActiveMode="this.activeMode"
					@get-stat-type="emitInputInfo"
				/>
			</v-col>
			<v-col cols="4">
				<ReboundInputBtn
					:pType="this.type.rebound"
					:pActiveMode="this.activeMode"
					@get-stat-type="emitInputInfo"
				/>
			</v-col>
			<v-col cols="4">
				<TurnoverInputBtn
					:pType="this.type.turnover"
					:pActiveMode="this.activeMode"
					@get-stat-type="emitInputInfo"
				/>
			</v-col>
		</v-row>
		<v-row>
			<v-col cols="4">
				<BlockInputBtn
					:pType="this.type.block"
					:pActiveMode="this.activeMode"
					@get-stat-type="emitInputInfo"
				/>
			</v-col>
			<v-col cols="4">
				<StealInputBtn
					:pType="this.type.steal"
					:pActiveMode="this.activeMode"
					@get-stat-type="emitInputInfo"
				/>
			</v-col>
			<v-col cols="4">
				<FoulInputBtn
					:pType="this.type.foul"
					:pActiveMode="this.activeMode"
					@get-stat-type="emitInputInfo"
				/>
			</v-col>
		</v-row>
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
	import {
		StatType,
		RecordMode,
	} from '@/views/game/quarterRecordInputBoard/const/QuarterRecordInputBoard.js';

	import AddModeBtn from '@/views/game/quarterRecordInputBoard/components/InputModeBtn.vue';
	import CancelModeBtn from '@/views/game/quarterRecordInputBoard/components/InputModeBtn.vue';

	import FreeThrowInputBtn from '@/components/game/stat/StatInputBtn.vue';
	import TwoPointInputBtn from '@/components/game/stat/StatInputBtn.vue';
	import ThreePointInputBtn from '@/components/game/stat/StatInputBtn.vue';

	import TryFreeThrowInputBtn from '@/components/game/stat/StatInputBtn.vue';
	import TryTwoPointInputBtn from '@/components/game/stat/StatInputBtn.vue';
	import TryThreePointInputBtn from '@/components/game/stat/StatInputBtn.vue';

	import AssistInputBtn from '@/components/game/stat/StatInputBtn.vue';
	import ReboundInputBtn from '@/components/game/stat/StatInputBtn.vue';
	import TurnoverInputBtn from '@/components/game/stat/StatInputBtn.vue';
	import BlockInputBtn from '@/components/game/stat/StatInputBtn.vue';
	import StealInputBtn from '@/components/game/stat/StatInputBtn.vue';
	import FoulInputBtn from '@/components/game/stat/StatInputBtn.vue';

	export default {
		components: {
			AddModeBtn,
			CancelModeBtn,
			FreeThrowInputBtn,
			TwoPointInputBtn,
			ThreePointInputBtn,
			TryFreeThrowInputBtn,
			TryTwoPointInputBtn,
			TryThreePointInputBtn,
			AssistInputBtn,
			ReboundInputBtn,
			TurnoverInputBtn,
			BlockInputBtn,
			StealInputBtn,
			FoulInputBtn,
		},
		data() {
			return {
				addBtnInfo: {
					btnName: '입력모드',
					mode: RecordMode.ADD,
				},
				cancelBtnInfo: {
					btnName: '취소모드',
					mode: RecordMode.CANCEL,
				},
				activeMode: RecordMode.ADD,
				type: {
					freeThrow: StatType.FREE_THROW,
					twoPoint: StatType.TWO_POINT,
					threePoint: StatType.THREE_POINT,
					tryFreeThrow: StatType.TRY_FREE_THROW,
					tryTwoPoint: StatType.TRY_TWO_POINT,
					tryThreePoint: StatType.TRY_THREE_POINT,
					assist: StatType.ASSIST,
					rebound: StatType.REBOUND,
					turnover: StatType.TURNOVER,
					block: StatType.BLOCK,
					steal: StatType.STEAL,
					foul: StatType.FOUL,
				},
			};
		},
		methods: {
			changeActiveMode(mode) {
				this.activeMode = mode;
			},
			emitInputInfo(statType) {
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
