<template>
	<v-container>
		<h2>팀 정보</h2>
		<v-container>
			<v-row dense>
				<HomeTeamInfoComp
					:pGameJoinTeamInfo="this.gameJoinTeamsInfo.homeTeamInfo"
				/>
				<AwayTeamInfoComp
					:pGameJoinTeamInfo="this.gameJoinTeamsInfo.awayTeamInfo"
				/>
			</v-row>
		</v-container>
	</v-container>
</template>

<script>
	import GameAPI from '@/api/GameAPI.js';

	import HomeTeamInfoComp from '@/views/game/gameRecordDetail/GameJoinTeamInfoComp.vue';
	import AwayTeamInfoComp from '@/views/game/gameRecordDetail/GameJoinTeamInfoComp.vue';

	export default {
		components: {
			HomeTeamInfoComp,
			AwayTeamInfoComp,
		},
		props: {
			pGameJoinTeamsInfo: Object,
			pGameSeq: Number,
		},
		data() {
			return {
				gameJoinTeamsInfo: this.getGameJoinTeamsInfo(),
			};
		},
		methods: {
			async getGameJoinTeamsInfo() {
				const params = {
					gameSeq: this.pGameSeq,
				};

				const res = await GameAPI.getGameJoinTeamsInfo(params);
				// TODO mounted() 되는 시점과 data() 내부의 메소드가 호출되는 시점을 비교할 필요가 있음
				// 데이터 초기화를 위한 메소드를 언제 호출할 것인지 고민 필요
				// mounted()는 재렌더링이 안되는지..?
				this.gameJoinTeamsInfo = {
					homeTeamInfo: res.data.homeTeamInfo,
					awayTeamInfo: res.data.awayTeamInfo,
				};
			},
		},
	};
</script>

<style lang="scss" scoped></style>
