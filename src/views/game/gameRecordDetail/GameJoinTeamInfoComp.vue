<template>
	<v-container>
		<h2>팀 정보</h2>
		{{ this.pGameJoinTeamsInfo.homeTeamInfo.teamName }}
		{{ this.pGameJoinTeamsInfo.awayTeamInfo.teamName }}
	</v-container>
</template>

<script>
	// TODO 팀명과 홈어웨이 사진 등을 보여주는 컴포넌트 하나를 만들어서 재사용
	export default {
		props: {
			pGameJoinTeamsInfo: Object,
		},
	};
</script>

<style lang="scss" scoped></style>
