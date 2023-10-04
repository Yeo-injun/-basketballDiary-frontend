<template>
	<div>
		<v-container>
			<v-card class="grey lighten-3">
				<v-row align="center">
					<v-col cols="2">
						<v-img
							class="ms-5"
							max-height="50"
							max-width="50"
							src="https://as2.ftcdn.net/v2/jpg/02/29/75/83/1000_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg"
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
	</div>
</template>

<script>
	/** Backend API */
	/** CODE */
	/** Utils */
	import AuthUtil from '@/common/AuthUtil.js';

	/** Components */
	import ManagerDismissalBtn from '@/components/button/ManagerDismissalBtn.vue';

	export default {
		components: {
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
				return AuthUtil.isLeader(this.pTeamSeq);
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
