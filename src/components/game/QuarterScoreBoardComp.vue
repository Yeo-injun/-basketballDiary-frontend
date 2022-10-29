<template>
	<v-container>
		<v-row>
			<v-col cols="12" sm="5">
				<QuarterScoreComp />
			</v-col>
			<v-col cols="12" sm="2"></v-col>
			<v-col cols="12" sm="5">
				<QuarterScoreComp />
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
	import QuarterScoreComp from '@/components/game/QuarterScoreComp.vue';

	export default {
		components: {
			QuarterScoreComp,
		},
	};
</script>

<style lang="scss" scoped></style>
