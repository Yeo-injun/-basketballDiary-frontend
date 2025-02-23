<template>
	<v-container>
		<TabContainer
			:pTabComponents="tabComponents"
			:pTabParams="{
				teamSeq : teamSeq,
			}"
		/>
	</v-container>
</template>

<script>
	import TabContainer from '@/components/tab/FrameDefaultTabContainer.vue';
	import JoinRequestPlayerListTab from '@/views/myTeam/memberManage/tab/JoinRequestPlayerListTab.vue'; // TODO 파일 디렉토리 옮기기 >> myTeam - tab 으로
	import InvitePlayerListTab from '@/views/myTeam/memberManage/tab/InvitePlayerListTab.vue'; // TODO 파일 디렉토리 옮기기 >> myTeam - tab 으로

	export default {
		components: {
			TabContainer,
		},
		data() {
			const teamSeq = this.$route.query.teamSeq;
			return {
				teamSeq: Number(teamSeq),
				/** 탭 정보 */
				tabComponents: [
					{ component: InvitePlayerListTab		, label: '선수초대 목록',  },
					{ component: JoinRequestPlayerListTab	, label: '받은 팀가입요청',  },
				],

			};
		},
	};
</script>

<style lang="scss" scoped></style>
