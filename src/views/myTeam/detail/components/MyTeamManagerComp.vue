<template>
	<v-container>
		<v-card class="grey lighten-3">
			<v-row align="center">
				<v-col cols="2">
					<ProfileImage
						pImageUrl="https://as2.ftcdn.net/v2/jpg/02/29/75/83/1000_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg"
						:pMaxHeight="String(75)"
						:pMaxWidth="String(75)"
					/>
				</v-col>
				<v-col cols="10">
					<v-row justify="space-between">
						<v-col>
							<v-row
								>{{ pTeamManager.teamAuthCodeName }} /
								{{ pTeamManager.userName }}</v-row
							>
							<v-row>{{ pTeamManager.birthYmd }}</v-row>
						</v-col>
						<v-col>신장: {{ pTeamManager.height }}</v-col>
						<v-col>몸무게: {{ pTeamManager.weight }}</v-col>
						<v-col>등번호: {{ pTeamManager.backNumber }}</v-col>
						<v-col>
							<v-row> 가입일: {{ pTeamManager.joinYmd }} </v-row>
							<v-row v-if="this.isLeaderAuth()">
								<!-- 팀장인 경우에는 해임 버튼 안보이게 하기 -->
								<ManagerDismissalBtn
									v-if="!this.isLeaderMember()"
									:pTeamMemberSeq="pTeamManager.teamMemberSeq"
									:pTeamSeq="this.pTeamSeq"
								/>
							</v-row>
						</v-col>
					</v-row>
				</v-col>
			</v-row>
		</v-card>
	</v-container>
</template>

<script>
	/** Backend API */
	/** CODE */
	/** Utils */
	import AuthManager from '@/common/auth/AuthManager.js';

	/** Components */
	import ProfileImage from '@/components/image/FrameImageComp.vue';

	import ManagerDismissalBtn from '@/components/button/ManagerDismissalBtn.vue';

	export default {
		components: {
			ProfileImage,
			ManagerDismissalBtn,
		},
		props: {
			pTeamManager: Object,
			pTeamSeq: {
				type: Number,
				required: true,
			},
		},
		methods: {
			isLeaderAuth() {
				return AuthManager.isLeader(this.pTeamSeq);
			},
			isLeaderMember() {
				const targetAuth = this.pTeamManager.teamAuthCode;
				if (targetAuth == 3) {
					return true;
				}
				return false;
			},
		},
	};
</script>

<style></style>
