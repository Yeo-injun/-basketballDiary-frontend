<template>
	<v-data-table
		:headers="headers"
		:items="this.pGameJoinPlayers"
		hide-default-footer
		class="elevation-1"
	/>
</template>

<script>
	export default {
		props: {
			pGameJoinPlayers: Array,
		},
		data() {
			return {
				headers: [
					{ text: '등번호', value: 'backNumber' },
					{ text: '포지션', value: 'positionCodeName' },
					{ text: '이름', value: 'userName' },
					{ text: '팀원 구분', value: 'playerTypeCodeName' },
				],
			};
		},
	};
</script>

<style lang="scss" scoped></style>
