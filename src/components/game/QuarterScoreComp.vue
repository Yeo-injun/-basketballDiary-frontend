<template>
	<v-container>
		<v-row>
			<v-col cols="12" sm="3"><v-row justify="center">1Q</v-row></v-col>
			<v-col cols="12" sm="3"><v-row justify="center">2Q</v-row></v-col>
			<v-col cols="12" sm="3"><v-row justify="center">3Q</v-row></v-col>
			<v-col cols="12" sm="3"><v-row justify="center">4Q</v-row></v-col>
		</v-row>
		<v-row>
			<v-col cols="12" sm="3"
				><v-row justify="center"> {{ this.pScore.quarterScore1st }} </v-row></v-col
			>
			<v-col cols="12" sm="3"
				><v-row justify="center"> {{ this.pScore.quarterScore2nd }} </v-row></v-col
			>
			<v-col cols="12" sm="3"
				><v-row justify="center"> {{ this.pScore.quarterScore3rd }} </v-row></v-col
			>
			<v-col cols="12" sm="3"
				><v-row justify="center"> {{ this.pScore.quarterScore4th }} </v-row></v-col
			>
		</v-row>
	</v-container>
</template>

<script>
	export default {
		props: {
			pScore: Object,
		},
	};
</script>

<style lang="scss" scoped></style>
