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
				eventEmitName: 'delete-game',
			};
		},
		methods: {
			async deleteGame() {
				if (!confirm('게임을 삭제하겠습니까?')) {
					return;
				}
				const params = {
					gameSeq: this.gameSeq,
				};
				await GameAPI.deleteGame(params);
				this.$emit(this.eventEmitName);
			},
		},
	};
</script>

<style lang="scss" scoped></style>
