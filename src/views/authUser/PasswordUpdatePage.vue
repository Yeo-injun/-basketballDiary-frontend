<template>
	<v-container >
		<MainTitle pTitleName="비밀번호변경" />
		<PasswordUpdateComp />
	</v-container>
</template>

<script>
import MainTitle from "@/components/title/FramePageMainTitle.vue";
import PasswordUpdateComp from "@/views/authUser/components/PasswordUpdateComp.vue";

export default {
	components: {
		MainTitle,
		PasswordUpdateComp,
	},
};
</script>

<style></style>
