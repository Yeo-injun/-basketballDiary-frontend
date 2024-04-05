<template>
	<v-container>
		<MainTitle pTitleName="회원탈퇴" />
		<AccountSignOutComp />
	</v-container>
</template>

<script>
import MainTitle from "@/components/title/FramePageMainTitle.vue";
import AccountSignOutComp from "@/views/authUser/components/AccountSignOutComp.vue";

export default {
	components: {
		MainTitle,
		AccountSignOutComp,
	},
};
</script>

<style></style>
