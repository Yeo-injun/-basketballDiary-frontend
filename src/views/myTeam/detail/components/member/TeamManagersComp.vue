<template>
	<v-list three-line>
		<template v-for="(item, idx) in this.pTeamManagers">
			<div :key="idx">
				<MemberInfoComp
					:pProfileImageUrl="item.profileImageUrl"
					:pUserName="item.userName"
					:pBirthYmd="item.birthYmd"
					:pHeight="item.height"
					:pWeight="item.weight"
					:pPositionCodeName="item.positionCodeName"
					:pBackNumber="item.backNumber"
					:pJoinYmd="item.joinYmd"
					:pTotalGameCount="item.totalGameCount"
					:pTeamAuthCode="item.teamAuthCode"
				>
					<template v-slot:action-slot >
						<div v-if="isLeaderAuth()">
							<ManagerDismissalBtn v-if="isManager( item )" 
								:pTeamSeq="pTeamSeq"
								:pTeamMemberSeq="item.teamMemberSeq"
							/>
						</div>
					</template>
				</MemberInfoComp>
				<v-divider v-if="idx < pTeamManagers.length - 1"/>
			</div>
		</template>
	</v-list>
</template>

<script>
	/** Backend API */
	/** CODE */
	import { TeamAuth } from '@/const/code/TeamCode.js';

	/** Utils */
	import AuthManager from '@/common/auth/AuthManager.js';
	
	/** Components */
	import MemberInfoComp from '@/views/myTeam/detail/components/member/FrameMemberInfoComp.vue';
	import ManagerDismissalBtn from '@/components/button/ManagerDismissalBtn.vue';

	export default {
		components: {
			MemberInfoComp,
			ManagerDismissalBtn,
		},
		props: {
			pTeamManagers: Array,
			pTeamSeq: {
				type: Number,
				required: true,
			},
		},
		methods: {
			isLeaderAuth() {
				return AuthManager.isLeader(this.pTeamSeq);
			},
			isManager( member ) {
				return TeamAuth.MANAGER.code === member.teamAuthCode;
			},
		},
	};
</script>

<style></style>
