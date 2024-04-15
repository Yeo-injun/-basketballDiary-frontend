<template>
	<v-container>
		<h3>선수기록지</h3>
		<HomeAwayTeamToggle
			pHomeTeamName="해당 토글 구현하기/홈팀"
			pAwayTeamName="해당 토글 구현하기/어웨이팀"
			@select-home-away-team="changeRecordInputTeam"
		/>
		<v-container>
			<EntryManageModal
				:pHomeAwayCode="this.pHomeAwayCode"
				@post-open-handle="emitOpenEntryManageModal"
				@save-entry="emitSaveEntryEvent"
			/>
		</v-container>
		<InGamePlayerSheet :pEntry="pEntry" @emit-stat-info="createRecord" />
	</v-container>
</template>

<script>
	/** Backend API */
	/** Code */
	/** Utils */
	/** Components */
	import HomeAwayTeamToggle from '@/components/game/toggle/HomeAwayTeamToggle.vue';
	import EntryManageModal from '@/views/game/quarterInput/components/modal/EntryManageModal.vue';
	import InGamePlayerSheet from '@/views/game/quarterInput/components/inputBoard/tableType/InGamePlayerSheet.vue';

	/** Emit Event */

	export default {
		components: {
			HomeAwayTeamToggle,
			EntryManageModal,
			InGamePlayerSheet,
		},
		props: {
			pHomeAwayCode: String,
			pEntry: Array,
		},
		data() {
			return {
				latestAddStat: {},
			};
		},
		methods: {
			emitOpenEntryManageModal() {
				this.$emit('open-entry-manage-modal');
			},
			emitSaveEntryEvent() {
				this.$emit('save-entry');
			},
			createRecord(statInfo) {
				this.$emit('add-player-record', {
					gameJoinPlayerSeq: statInfo.gameJoinPlayerSeq,
					homeAwayCode: this.pHomeAwayCode,
					statType: statInfo.statType,
					mode: statInfo.mode,
					timeStamp: new Date(),
				});
			},
		},
	};
</script>

<style lang="scss" scoped></style>
