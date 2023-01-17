<template>
	<v-container>
		<h2>게임참가선수</h2>
		<v-container>
			<v-row dense>
				<v-col cols="6">
					<v-container>
						<v-btn>참가선수관리</v-btn>
					</v-container>
				</v-col>
				<v-col cols="6">
					<v-container>
						<v-btn>참가선수관리</v-btn>
					</v-container>
				</v-col>
			</v-row>
			<v-row dense>
				<HomeTeamPlayerList />
				<AwayTeamPlayerList />
			</v-row>
		</v-container>
	</v-container>
</template>

<script>
	import HomeTeamPlayerList from '@/views/game/gameRecordDetail/GameJoinPlayerListComp.vue';
	import AwayTeamPlayerList from '@/views/game/gameRecordDetail/GameJoinPlayerListComp.vue';

	// TODO 참가선수관리 버튼도 컴포넌트로 만들고 내부 이벤트로 모달창 띄우기
	// TODO 게임참가팀 목록 가져오기
	export default {
		components: {
			HomeTeamPlayerList,
			AwayTeamPlayerList,
		},
	};
</script>

<style lang="scss" scoped></style>
