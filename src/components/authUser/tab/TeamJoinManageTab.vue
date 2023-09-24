<template>
	<v-container>
		<JoinRequestListComp />
		<InvitationListComp />
	</v-container>
</template>

<script>
	import JoinRequestListComp from '@/components/authUser/JoinRequestListComp.vue';
	import InvitationListComp from '@/components/authUser/InvitationListComp.vue';

	export default {
		components: {
			JoinRequestListComp,
			InvitationListComp,
		},
		data: () => {
			return {};
		},
	};
</script>

<style lang="scss" scoped></style>
