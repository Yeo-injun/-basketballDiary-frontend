<template>
	<div>
		<v-img
			max-height="120"
			max-width="120"
			class="ms-5"
			:src="this.pImageUrl"
		/>
	</div>
</template>

<script>
	export default {
		props: {
			pImageUrl: {
				type: String,
				required: false,
			},
		},
	};
</script>

<style lang="scss" scoped></style>
