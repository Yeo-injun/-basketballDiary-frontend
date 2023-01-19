<template>
	<v-col cols="6">
		<v-container>
			<v-btn @click="openGameJoinPlayerManagerLayer()">참가선수관리</v-btn>
		</v-container>
	</v-col>
</template>

<script>
	export default {
		props: {
			pHomeAwayCode: String,
		},
		methods: {
			openGameJoinPlayerManagerLayer() {
				alert('dd');
				this.$emit('select-players', { homeAwayCode: this.pHomeAwayCode });
			},
		},
	};
</script>

<style lang="scss" scoped></style>
