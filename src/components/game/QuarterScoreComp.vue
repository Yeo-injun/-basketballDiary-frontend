<template>
	<v-container>
		<v-row>
			<v-col cols="12" sm="3"><v-row justify="center">1Q</v-row></v-col>
			<v-col cols="12" sm="3"><v-row justify="center">2Q</v-row></v-col>
			<v-col cols="12" sm="3"><v-row justify="center">3Q</v-row></v-col>
			<v-col cols="12" sm="3"><v-row justify="center">4Q</v-row></v-col>
		</v-row>
		<v-row>
			<!-- v-for 디렉티브로 렌더링해주기 -->
			<v-col cols="12" sm="3"><v-row justify="center">1Q</v-row></v-col>
			<v-col cols="12" sm="3"><v-row justify="center">2Q</v-row></v-col>
			<v-col cols="12" sm="3"><v-row justify="center">3Q</v-row></v-col>
			<v-col cols="12" sm="3"><v-row justify="center">4Q</v-row></v-col>
		</v-row>
	</v-container>
</template>

<script>
	export default {
		data() {
			return {
				quarterScoreInfo: {},
			};
		},
	};
</script>

<style lang="scss" scoped></style>
