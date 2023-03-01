<template>
	<v-container>
		<h3>선수기록</h3>
		<PlayerRecordComp :pPlayerRecordInfo="this.selectedPlayer" />
		<v-row>
			<v-col>
				<QuarterEntryComp :pEntry="this.pEntry" @select-player="selectPlayer" />
			</v-col>
			<v-col>
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
			recordStat(inputInfo) {
				const player = this.selectedPlayer;
				const record = {
					gameJoinPlayerSeq: player.gameJoinPlayerSeq,
					statType: inputInfo.statType,
					mode: inputInfo.mode,
				};
				console.log(record);
				// TODO
				// 입력데이터는 현재 컴포넌트에서 관리하고,
				// pEntry를 관리하는 상위 컴포넌트에서 총괄 데이터를 변경을 할 수 있도록 emit해주기
				this.$emit('get-clicked-record-info', record);
			},
		},
	};
</script>

<style lang="scss" scoped></style>
