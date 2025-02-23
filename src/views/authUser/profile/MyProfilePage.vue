<template>
	<TabContainer :pTabComponents="this.tabComponents" />
</template>

<script>
	import TabContainer from '@/components/tab/FrameDefaultTabContainer.vue';
	import TeamJoinManageTab from '@/views/authUser/profile/tab/TeamJoinManageTab.vue';
	import MyProfileUpdateTab from '@/views/authUser/profile/tab/MyProfileUpdateTab.vue';

	export default {
		components: {
			TabContainer,
		},
		data() {
			return {
				/** 탭 정보 */
				tabComponents: [
					{ component: TeamJoinManageTab	, label: '팀가입',  },
					{ component: MyProfileUpdateTab	, label: 'MY 프로필',  },
				],
			};
		},
	};
</script>

<style></style>
