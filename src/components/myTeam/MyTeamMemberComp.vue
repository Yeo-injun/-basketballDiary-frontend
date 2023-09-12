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
								{{ pTeamMember.teamAuthCodeName }}
								/ {{ pTeamMember.userName }}
							</v-col>
							<v-col>포지션: {{ pTeamMember.positionCodeName }}</v-col>
							<v-col>가입일: {{ pTeamMember.joinYmd }}</v-col>
							<v-col v-if="this.isLeader()">
								<ManagerAppointmentBtn
									:pTeamMemberSeq="pTeamMember.teamMemberSeq"
									:pTeamSeq="this.pTeamSeq"
								/>
								<TeamMemberDischargeBtn
									:pTeamMemberSeq="pTeamMember.teamMemberSeq"
									:pTeamSeq="this.pTeamSeq"
								/>
							</v-col>
						</v-row>
						<v-row>
							<v-col>신장: {{ pTeamMember.height }}</v-col>
							<v-col>몸무게: {{ pTeamMember.weight }}</v-col>
							<v-col>등번호: {{ pTeamMember.backNumber }}</v-col>
							<v-col>경기참여: {{ pTeamMember.totGame }}회</v-col>
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
	import ManagerAppointmentBtn from '@/components/button/ManagerAppointmentBtn.vue';
	import TeamMemberDischargeBtn from '@/components/button/TeamMemberDischargeBtn.vue';

	export default {
		components: {
			ManagerAppointmentBtn,
			TeamMemberDischargeBtn,
		},
		props: {
			pTeamMember: Object,
			pTeamSeq: String,
		},
		methods: {
			isLeader() {
				return AuthUtil.isLeader(this.pTeamSeq);
			},
		},
	};
</script>

<style></style>
