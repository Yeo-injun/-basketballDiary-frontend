<template>
	<v-container>
		<v-row justify="center">
			<v-col cols="1">
				<v-btn color="error" @click="deleteGame">게임삭제</v-btn>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
	import GameAPI from '@/api/GameAPI.js';

	export default {
		props: {
			pGameSeq: Number,
		},
		data() {
			return {
				gameSeq: this.pGameSeq,
			};
		},
		methods: {
			async deleteGame() {
				const params = {
					gameSeq: this.gameSeq,
				};
				await GameAPI.deleteGame(params);
				this.$emit('delete-event-emit');
			},
		},
	};
</script>

<style lang="scss" scoped></style>
