<template>
	<v-col cols="6">
		<v-card>
			<v-card-title :class="this.titleColor">
				<div class="font-weight-bold">
					{{ this.teamInfo.teamName }}
					( {{ this.teamInfo.homeAwayCodeName }} )
				</div>
			</v-card-title>
			<v-row dense>
				<v-col cols="5">
					<!-- 사진 -->
					사진 넣기
					{{ this.teamInfo.imagePath }}
				</v-col>
				<v-col cols="7">
					<div>팀장이름 : {{ this.teamInfo.leaderName }}</div>
					<div>연고지 : {{ this.teamInfo.hometown }}</div>
				</v-col>
			</v-row>
		</v-card>
	</v-col>
</template>

<script>
	import { HomeAwayCode } from '@/const/code/GameCode.js';

	export default {
		props: {
			pGameJoinTeamInfo: Object,
		},
		data() {
			return {
				teamInfo: this.pGameJoinTeamInfo,
			};
		},
		computed: {
			titleColor() {
				const homeAwayCode = this.teamInfo.homeAwayCode;
				if (HomeAwayCode.HOME_TEAM == homeAwayCode) {
					return 'red lighten-4';
				}

				if (HomeAwayCode.AWAY_TEAM == homeAwayCode) {
					return 'blue lighten-4';
				}
				return '';
			},
		},
	};
</script>

<style lang="scss" scoped></style>
