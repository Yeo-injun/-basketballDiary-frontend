<template>
		<v-card>
			<v-card-title :class="this.titleColor">
				<div class="font-weight-bold">
					{{ this.pGameJoinTeamInfo.teamName }}
					( {{ this.pGameJoinTeamInfo.homeAwayCodeName }} )
				</div>
			</v-card-title>
			<v-row dense>
				<v-col cols="5">
					<TeamLogoImage :pImageUrl="pGameJoinTeamInfo.teamImagePath" />
				</v-col>
				<v-col cols="7">
					<div><strong>팀장이름 | </strong>{{ this.pGameJoinTeamInfo.leaderName }}</div>
					<div><strong>연고지 | </strong>{{ this.pGameJoinTeamInfo.hometown }}</div>
				</v-col>
			</v-row>
		</v-card>
</template>

<script>
	/**
	 * Components
	 */
	import TeamLogoImage from '@/components/image/FrameImageComp.vue';

	/**
	 * Code
	 */
	import { HomeAwayCode } from '@/const/code/GameCode.js';

	export default {
		components: {
			TeamLogoImage,
		},
		props: {
			pGameJoinTeamInfo: {
				type 	: Object,
				default() {
					return {
						teamName			: "",
						homeAwayCodeName	: "",
						teamImagePath		: "",
						leaderName			: "", 
						hometown			: "",
					}
				}
			}
		},
		computed: {
			titleColor() {
				const homeAwayCode = this.pGameJoinTeamInfo.homeAwayCode;
				switch ( homeAwayCode ) {
					case HomeAwayCode.HOME_TEAM : return 'red lighten-4';
					case HomeAwayCode.AWAY_TEAM : return 'blue lighten-4';
					default : return '';
				}
			},
		},
	};
</script>

<style lang="scss" scoped></style>
