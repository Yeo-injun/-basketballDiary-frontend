<template>
	<div>
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
	import AuthManager from '@/common/auth/AuthManager.js';
	
	/** Backend API */
	/** CODE */
	/** Utils */
	/** Components */
	import ProfileImage from '@/components/image/FrameImageComp.vue';

	import ManagerAppointmentBtn from '@/components/button/ManagerAppointmentBtn.vue';
	import TeamMemberDischargeBtn from '@/components/button/TeamMemberDischargeBtn.vue';

	export default {
		components: {
			ProfileImage,
			ManagerAppointmentBtn,
			TeamMemberDischargeBtn,
		},
		props: {
			pTeamMember: Object,
			pTeamSeq: {
				type: Number,
				required: true,
			},
		},
		methods: {
			isLeader() {
				return AuthManager.isLeader(this.pTeamSeq);
			},
		},
	};
</script>

<style></style>
