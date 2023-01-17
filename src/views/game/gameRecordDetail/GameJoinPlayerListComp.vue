<template>
	<v-col cols="6">
		<v-data-table
			:headers="headers"
			:items="players"
			hide-default-footer
			class="elevation-1"
		></v-data-table>
	</v-col>
</template>

<script>
	export default {
		data() {
			return {
				headers: [
					{ text: '등번호', value: 'backnumber' },
					{ text: '포지션', value: 'calories' },
					{ text: '이름', value: 'fat' },
					{ text: '팀원 구분', value: 'carbs' },
				],
				players: [],
			};
		},
	};
</script>

<style lang="scss" scoped></style>
