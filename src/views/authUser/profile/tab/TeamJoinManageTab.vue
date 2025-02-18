<template>
	<v-container>
		<JoinRequestListSubTitile class="sub-title" pTitleName="가입요청 목록"/>
		<JoinRequestListComp />

		<InvitationListSubTitile class="sub-title" pTitleName="초대 목록"/>
		<InvitationListComp />
	</v-container>
</template>

<script>
	import JoinRequestListSubTitile from '@/components/title/FrameTabSubTitle.vue';
	import JoinRequestListComp from '@/views/authUser/profile/components/JoinRequestListComp.vue';

	import InvitationListSubTitile from '@/components/title/FrameTabSubTitle.vue';
	import InvitationListComp from '@/views/authUser/profile/components/InvitationListComp.vue';

	export default {
		components: {
			JoinRequestListSubTitile,
			JoinRequestListComp,
			InvitationListSubTitile,
			InvitationListComp,
		},
		data: () => {
			return {};
		},
	};
</script>

<style lang="scss" scoped>
	.sub-title {
		margin-top: 20px;
		margin-bottom: 10px;
	}
</style>
