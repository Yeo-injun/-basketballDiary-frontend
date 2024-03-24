<template>
	<div>
		<PlayerRecordComp
			v-for="(playerRecord, index) in this.pPlayersRecord"
			:key="index"
			:pPlayerRecord="playerRecord"
		/>
	</div>
</template>

<script>
	import PlayerRecordComp from '@/components/game/player/PlayerRecordComp.vue';

	export default {
		components: {
			PlayerRecordComp,
		},
		props: {
			pPlayersRecord: Array,
		},
	};
</script>

<style lang="scss" scoped></style>
