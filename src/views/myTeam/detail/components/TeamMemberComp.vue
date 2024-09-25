<template>
	<v-list-item>
		<!-- 왼쪽 영역 -->
		<v-list-item-avatar>
			<ProfileImage/>
		</v-list-item-avatar>

		<!-- 중앙 영역 -->
		<v-list-item-content>
			<v-list-item-title >
				<strong>{{ pTeamMember.userName }}</strong> | {{ pTeamMember.birthYmd }}
			</v-list-item-title>
			<v-list-item-subtitle>
				{{ `${pTeamMember.height}cm / ${pTeamMember.weight}kg` }}						
			</v-list-item-subtitle>
			<span>{{ pTeamMember.positionCodeName }} | {{ pTeamMember.backNumber }}</span>
			<span>{{ pTeamMember.joinYmd }}부터 총 {{ pTeamMember.totalCount }} 번의 경기를 뛰었습니다.</span>
			<!-- 구분선 (마지막 아이템에는 표시 안 함) -->
		</v-list-item-content>

		<!-- 오른쪽 영역 -->
		<v-list-item-action v-if="this.isLeader()">
			<ManagerAppointmentBtn
				:pTeamMemberSeq="pTeamMember.teamMemberSeq"
				:pTeamSeq="this.pTeamSeq"
			/>
			<TeamMemberDischargeBtn
				:pTeamMemberSeq="pTeamMember.teamMemberSeq"
				:pTeamSeq="this.pTeamSeq"
			/>
		</v-list-item-action>
	</v-list-item>
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
