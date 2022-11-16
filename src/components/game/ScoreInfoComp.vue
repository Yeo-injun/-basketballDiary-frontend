<template>
	<v-container>
		<v-col align-self="center">
			<v-row no-gutters justify="center">
				{{ this.pGameTypeCode }}
			</v-row>
		</v-col>
	</v-container>
</template>

<script>
	export default {
		props: {
			pGameTypeCode: String,
		},
		data() {
			return {
				gameTypeCode: this.pGameTypeCode,
			};
		},
	};
</script>

<style lang="scss" scoped></style>
