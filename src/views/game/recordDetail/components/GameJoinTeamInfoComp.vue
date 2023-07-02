<template>
	<v-col cols="6">
		<v-card>
			<v-card-title :class="this.titleColor">
				<div class="font-weight-bold">
					{{ this.pGameJoinTeamInfo.teamName }}
					( {{ this.pGameJoinTeamInfo.homeAwayCodeName }} )
				</div>
			</v-card-title>
			<v-row dense>
				<v-col cols="5">
					<!-- 사진 -->
					사진 넣기
					{{ this.pGameJoinTeamInfo.imagePath }}
				</v-col>
				<v-col cols="7">
					<div>팀장이름 : {{ this.pGameJoinTeamInfo.leaderName }}</div>
					<div>연고지 : {{ this.pGameJoinTeamInfo.hometown }}</div>
				</v-col>
			</v-row>
		</v-card>
	</v-col>
</template>

<script>
	import ValidationUtil from '@/common/util/ValidationUtil.js';
	import { HomeAwayCode } from '@/const/code/GameCode.js';

	export default {
		props: {
			pGameJoinTeamInfo: Object,
		},
		computed: {
			titleColor() {
				if (ValidationUtil.isNull(this.pGameJoinTeamInfo)) {
					return '';
				}
				const homeAwayCode = this.pGameJoinTeamInfo.homeAwayCode;
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
