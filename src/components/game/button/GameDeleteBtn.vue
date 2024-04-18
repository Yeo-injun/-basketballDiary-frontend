<template>
	<DeleteBtn 
		pBtnName="게임삭제" 
		@do-delete="deleteGame"
	/>
</template>

<script>
	/** Backend API */
	import GameAPI from '@/api/GameAPI.js';
	/** Code */
	/** Utils */
	/** Components */
	import DeleteBtn from '@/components/button/FrameDeleteBtn.vue';
	/** Emit Event */

	export default {
		components: {
			DeleteBtn,
		},
		props: {
			pGameSeq: Number,
		},
		data() {
			return {
				eventEmitName: 'delete-game',
			};
		},
		methods: {
			async deleteGame() {
				if (!confirm('게임을 삭제하겠습니까?')) {
					return;
				}
				await GameAPI.deleteGame({
					gameSeq: this.pGameSeq,
				});
				this.$emit(this.eventEmitName);
			},
		},
	};
</script>

<style lang="scss" scoped></style>
