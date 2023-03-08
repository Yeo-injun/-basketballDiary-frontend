<template>
	<v-container>
		<h3>선수기록</h3>
		<PlayerRecordComp :pPlayerRecordInfo="this.selectedPlayer" />
		<v-row>
			<v-col cols="5">
				<QuarterEntryComp
					:pHomeAwayCode="this.pHomeAwayCode"
					:pHomeAwayCodeName="this.pHomeAwayCodeName"
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
	import PlayerRecordComp from '@/components/game/gameJoinPlayer/PlayerRecordComp.vue';
	import QuarterEntryComp from '@/views/game/quarterRecordInputBoard/components/QuarterEntryComp.vue';
	import StatInputBoardComp from '@/views/game/quarterRecordInputBoard/components/StatInputBoardComp.vue';

	export default {
		components: {
			PlayerRecordComp,
			QuarterEntryComp,
			StatInputBoardComp,
		},
		props: {
			pHomeAwayCode: String,
			pHomeAwayCodeName: String,
			pEntry: Array,
		},
		data() {
			return {
				selectedPlayer: {},
			};
		},
		methods: {
			selectPlayer(player) {
				this.selectedPlayer = player;
			},
			emitSaveEntryEvent() {
				this.$emit('save-entry');
			},
			recordStat(inputInfo) {
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
