<template>
	<v-dialog v-model="dialog" max-width="800px">
		<!-- activator 영역 : 팝업이 뜨기전에 보여줄 컴포넌트들 -->
		<!-- v-slot:activator { on } : https://m.blog.naver.com/tkddlf4209/221732083022 -->
		<template v-slot:activator="{ on, attrs }">
			<div class="text-right" v-bind="attrs" v-on="on">
				<GameJoinPlayerManageBtn />
			</div>
		</template>

		<v-card>
			<v-card-title>참가선수관리</v-card-title>
			<GameJoinPlayerRegistrationBtn @register-players="closeModal" />
			<PlayerListComp
				:pHomeAwayCode="this.pHomeAwayCode"
				:pIsOpen="this.dialog"
			/>
		</v-card>
	</v-dialog>
</template>

<script>
	import GameJoinPlayerRegistrationBtn from '@/views/game/recordDetail/button/GameJoinPlayerRegistrationBtn.vue';
	import GameJoinPlayerManageBtn from '@/views/game/recordDetail/button/GameJoinPlayerManageBtn.vue';
	import PlayerListComp from '@/components/game/gameJoinPlayer/PlayerListComp.vue';

	export default {
		components: {
			GameJoinPlayerRegistrationBtn,
			GameJoinPlayerManageBtn,
			PlayerListComp,
		},
		props: {
			pHomeAwayCode: String,
		},
		data() {
			return {
				dialog: false,
			};
		},
		methods: {
			closeModal() {
				// TODO 선택한 선수들 등록하기 >> List에 추가
				this.dialog = false;
				this.$emit('');
			},
		},
	};
</script>

<style lang="scss" scoped></style>
