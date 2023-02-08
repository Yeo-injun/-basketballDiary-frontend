<template>
	<v-col cols="6">
		<v-container>
			<v-btn @click="registerPlayers()">등록</v-btn>
		</v-container>
	</v-col>
</template>

<script>
	export default {
		props: {
			pHomeAwayCode: String,
		},
		methods: {
			registerPlayers() {
				this.$emit('register-players');
			},
		},
	};
</script>

<style lang="scss" scoped></style>
