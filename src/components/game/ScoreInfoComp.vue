<template>
	<v-container>
		<v-col align-self="center">
			<v-row no-gutters justify="center">
				{{ this.pGameTypeCodeName }}
			</v-row>
		</v-col>
	</v-container>
</template>

<script>
	export default {
		props: {
			pGameTypeCode: String,
			pGameTypeCodeName : String,
		},
	};
</script>

<style lang="scss" scoped></style>
