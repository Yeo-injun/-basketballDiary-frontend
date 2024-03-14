<template>
	<v-container>
		<PlayerRecordComp :pPlayerRecord="this.selectedPlayer" />
		<v-row>
			<v-col cols="5">
				<QuarterEntryComp
					:pHomeAwayCode="this.pHomeAwayCode"
					:pEntry="this.pEntry"
					@select-player="selectPlayer"
					@save-entry="emitSaveEntryEvent"
				/>
			</v-col>
			<v-col cols="7">
				<StatInputBoardComp @record-stat="recordStat" />
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
	import PlayerRecordComp from '@/components/game/player/PlayerRecordComp.vue';
	import QuarterEntryComp from '@/views/game/quarterRecordInputBoard/components/inputBoard/buttonType/QuarterEntryComp.vue';
	import StatInputBoardComp from '@/views/game/quarterRecordInputBoard/components/inputBoard/buttonType/StatInputBoardComp.vue';

	export default {
		components: {
			PlayerRecordComp,
			QuarterEntryComp,
			StatInputBoardComp,
		},
		props: {
			pHomeAwayCode: String,
			pEntry: Array,
		},
		data() {
			return {
				selectedPlayer: {},
			};
		},
		methods: {
			/**--------------------------------
			 * 선택된 선수를 기준으로 스탯이 기록되어야 하니 RecordInputBoardComp에서 기록 데이터를 관리
			 * 임시데이터를 건별로 저장하고, 계속 연산해서 보여주기
			 * 1. 스탯 입력
			 * 2. 건별 임시 저장
			 * 3. 임시저장된 데이터를 기준으로 엔트리 정보 update
			 * 4. 저장시 현재 화면의 엔트리 정보가 그대로 백엔드로 날라감
			 **--------------------------------*/
			selectPlayer(player) {
				this.selectedPlayer = player;
			},
			emitSaveEntryEvent() {
				this.$emit('save-entry');
			},
			recordStat(inputInfo) {
				// TODO 선택된 선수가 없을때 예외처리
				const player = this.selectedPlayer;
				const record = {
					homeAwayCode: this.pHomeAwayCode,
					gameJoinPlayerSeq: player.gameJoinPlayerSeq,
					statType: inputInfo.statType,
					mode: inputInfo.mode,
					timeStamp: new Date(),
				};
				this.$emit('get-clicked-record-info', record);
			},
		},
	};
</script>

<style lang="scss" scoped></style>
