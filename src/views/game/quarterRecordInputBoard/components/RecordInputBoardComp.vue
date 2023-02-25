<template>
	<v-container>
		<h3>선수기록</h3>
		<PlayerRecordComp :pPlayerRecordInfo="this.selectedPlayer" />
		<v-row>
			<v-col>
				<QuarterEntryComp :pEntry="this.pEntry" @select-player="selectPlayer" />
			</v-col>
			<v-col>
				<StatInputComp />
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
	import PlayerRecordComp from '@/components/game/gameJoinPlayer/PlayerRecordComp.vue';
	import QuarterEntryComp from '@/views/game/quarterRecordInputBoard/components/QuarterEntryComp.vue';
	import StatInputComp from '@/views/game/quarterRecordInputBoard/components/StatInputComp.vue';

	export default {
		components: {
			PlayerRecordComp,
			QuarterEntryComp,
			StatInputComp,
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
		},
	};
</script>

<style lang="scss" scoped></style>
