<template>
	<v-card class="mx-auto">
		<v-list three-line>
			<template v-for="(item, idx) in this.pTeamManagers">
				<v-list-item
					:key="idx"
				>
					<!-- 왼쪽 영역 -->
					<v-list-item-avatar>
						<ProfileImage :pImageUrl="item.profileImageUrl" />
					</v-list-item-avatar>

					<!-- 중앙 영역 -->
					<v-list-item-content>
						<v-list-item-title >
							<strong>{{ item.userName }}</strong> | {{ item.birthYmd }}
						</v-list-item-title>
						<v-list-item-subtitle>
							{{ `${item.height} cm / ${item.weight} kg` }}						
						</v-list-item-subtitle>
						<span>{{ item.positionCodeName }} | {{ item.backNumber }}</span>
						<span>{{ item.joinYmd }}부터 총 {{ item.totalCount }} 번의 경기를 뛰었습니다.</span>
						<!-- 구분선 (마지막 아이템에는 표시 안 함) -->
						<v-divider v-if="idx < pTeamManagers.length - 1"/>
					</v-list-item-content>

					<!-- 오른쪽 영역 -->
					<v-list-item-action>
						<div v-if="isLeaderAuth()">
							<ManagerDismissalBtn v-if="isManager( item )" 
								:pTeamSeq="pTeamSeq"
								:pTeamMemberSeq="item.teamMemberSeq"
							/>
						</div>
					</v-list-item-action>
				</v-list-item>
			</template>
		</v-list>
	</v-card>
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
				const targetAuth = member.teamAuthCode;
				if (targetAuth == 2) {
					return true;
				}
				return false;
			},
		},
	};
</script>

<style></style>
