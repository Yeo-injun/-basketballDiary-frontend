<template>
	<v-container>
		<h2>{{ this.pTitleName }}</h2>
	</v-container>
</template>

<script>
	export default {
		props: {
			pTitleName: String,
		},
	};
</script>

<style lang="scss" scoped></style>
