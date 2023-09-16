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
