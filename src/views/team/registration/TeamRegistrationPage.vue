<template>
	<v-container>
		<PageTitle pTitleName="팀등록화면" />
		<TeamInfoFormComp @e-team-info="setTeamInfo" />
		<TeamRegistrationBtn pBtnName="팀등록" @do-save="registerTeam()" />
	</v-container>
</template>

<script>
	import TeamAPI from '@/api/TeamAPI.js';
	import PageTitle from '@/components/title/FramePageMainTitle.vue';
	import TeamInfoFormComp from '@/components/team/TeamInfoFormComp.vue';
	import TeamRegistrationBtn from '@/components/button/FrameSaveBtn.vue';

	import ValidationUtil from '@/common/util/ValidationUtil.js';

	export default {
		components: {
			PageTitle,
			TeamInfoFormComp,
			TeamRegistrationBtn,
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
