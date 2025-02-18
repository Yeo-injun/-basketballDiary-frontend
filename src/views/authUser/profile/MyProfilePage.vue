<template>
	<ProfileTabLayout :pTabComponents="this.tabComponents" />
</template>

<script>
	import ProfileTabLayout from '@/components/tab/FrameDefaultTabLayout.vue';
	import TeamJoinManageTab from '@/views/authUser/profile/tab/TeamJoinManageTab.vue';
	import MyProfileUpdateTab from '@/views/authUser/profile/tab/MyProfileUpdateTab.vue';

	export default {
		components: {
			ProfileTabLayout,
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
