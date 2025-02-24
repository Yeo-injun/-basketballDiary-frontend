<template>
	<v-container>
		<TabContainer :pTabComponents="tabComponents" />
	</v-container>
</template>

<script>
	import TabContainer from '@/components/tab/FrameDefaultTabContainer.vue';
	import JoinRequestPlayerListTab from '@/views/myTeam/memberManage/tab/JoinRequestPlayerListTab.vue';
	import InvitePlayerListTab from '@/views/myTeam/memberManage/tab/InvitePlayerListTab.vue';

	export default {
		components: {
			TabContainer,
		},
		data() {
			const teamSeq = this.$route.query.teamSeq;
			return {
				/** 탭 정보 */
				tabComponents: [
					{
						component	: InvitePlayerListTab	, 
						label		: '선수초대 목록'		 , 
						params 		: { 
							teamSeq : teamSeq,
						},
					},
					{ 
						component	: JoinRequestPlayerListTab	, 
						label		: '받은 팀가입요청'			 , 
						params 		: { 
							teamSeq : teamSeq,
						},
					},
				],

			};
		},
	};
</script>

<style lang="scss" scoped></style>
