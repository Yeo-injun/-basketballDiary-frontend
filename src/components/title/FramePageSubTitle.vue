<template>
	<v-container>
		<h3>{{ this.pTitleName }}</h3>
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
