<template>
	<v-container>
		팀 등록 화면
		<TeamInfoFormComp @e-team-info="setTeamInfo" />
		<v-btn color="primary" depressed @click="registerTeam()"> 등록 </v-btn>
	</v-container>
</template>

<script>
	import TeamAPI from '@/api/TeamAPI.js';
	import TeamInfoFormComp from '@/components/team/TeamInfoFormComp.vue';

	import ValidationUtil from '@/common/util/ValidationUtil.js';

	export default {
		components: {
			TeamInfoFormComp,
		},
		data() {
			return {
				teamInfo: {},
			};
		},
		watch: {},
		methods: {
			setTeamInfo(eTeamInfo) {
				this.teamInfo = eTeamInfo;
			},
			async registerTeam() {
				// TODO 팀정보를 제대로 입력했는지 검증로직 추가 수정요망
				const teamInfo = this.teamInfo;
				if (ValidationUtil.isNull(teamInfo)) {
					alert('팀 정보를 입력해주세요.');
					return;
				}

				await TeamAPI.registerTeam({
					teamInfo: {
						teamName: teamInfo.teamName,
						hometown: teamInfo.hometown,
						foundationYmd: teamInfo.foundationYmd,
						introduction: teamInfo.introduction,
						teamRegularExercises: ValidationUtil.isNull(
							teamInfo.teamRegularExercises
						)
							? teamInfo.teamRegularExercises
							: [],
						sidoCode: teamInfo.sidoCode,
						sigunguCode: teamInfo.sigunguCode,
					},
					teamLogoImage: teamInfo.teamLogoImage,
				});
				alert('팀이 정상적으로 등록되었습니다.');
				this.$router.push({ name: 'MyTeamListPage' });
			},
		},
	};
</script>

<style lang="scss" scoped></style>
