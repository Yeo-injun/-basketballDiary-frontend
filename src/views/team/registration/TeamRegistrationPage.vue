<template>
	<v-container>
		<MainTitle pTitleName="팀등록화면" />
		<TeamInfoFormComp
			@change-team-info="setTeamInfo"
			@change-team-logo-image="setTeamLogoImage"
		/>
		<TeamRegistrationBtn pBtnName="팀등록" @do-save="registerTeam()" />
	</v-container>
</template>

<script>
	import TeamAPI from '@/api/TeamAPI.js';
	import MainTitle from '@/components/title/FramePageMainTitle.vue';
	import TeamInfoFormComp from '@/components/team/TeamInfoFormComp.vue';
	import TeamRegistrationBtn from '@/components/button/FrameSaveBtn.vue';

	import ValidationUtil from '@/common/util/ValidationUtil.js';

	export default {
		components: {
			MainTitle,
			TeamInfoFormComp,
			TeamRegistrationBtn,
		},
		data() {
			return {
				teamInfo: {},
				teamLogoImage: null,
			};
		},
		methods: {
			setTeamInfo(teamInfo) {
				this.teamInfo = teamInfo;
			},
			setTeamLogoImage(logoImage) {
				this.teamLogoImage = logoImage;
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
						teamRegularExercises: teamInfo.teamRegularExercises,
						sidoCode: teamInfo.sidoCode,
						sigunguCode: teamInfo.sigunguCode,
					},
					teamLogoImage: this.teamLogoImage,
				});
				alert('팀이 정상적으로 등록되었습니다.');
				this.$router.push({ name: 'MyTeamListPage' });
			},
		},
	};
</script>

<style lang="scss" scoped></style>
