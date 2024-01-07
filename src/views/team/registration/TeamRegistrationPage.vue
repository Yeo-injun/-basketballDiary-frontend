<template>
	<v-container>
		<MainTitle pTitleName="팀등록화면" />
		<TeamInfoFormComp ref="teamRegisterForm" />
		<TeamRegistrationBtn pBtnName="팀등록" @do-save="registerTeam()" />
	</v-container>
</template>

<script>
	/** Backend API */
	import TeamAPI from '@/api/TeamAPI.js';

	/** Code */
	/** Utils */
	import ValidationUtil from '@/common/util/ValidationUtil.js';

	/** Components */
	import MainTitle from '@/components/title/FramePageMainTitle.vue';
	import TeamInfoFormComp from '@/components/team/TeamInfoFormComp.vue';
	import TeamRegistrationBtn from '@/components/button/FrameSaveBtn.vue';

	/** Emit Event */


	export default {
		components: {
			MainTitle,
			TeamInfoFormComp,
			TeamRegistrationBtn,
		},
		methods: {
			async registerTeam() {
				// ref로 등록된 하위 컴포넌트의 속성/메소드에 직접 접근한다. ( cf. mounted완료된 컴포넌트만 ref참조 가능 )
				if ( !this.$refs.teamRegisterForm.validate() ) {
					return;
				}

				// input데이터는 form컴포넌트에서 관리 책임. 부모컴포넌트는 필요할때 form데이터를 가져와서 사용할 것.
				const teamInfoForm = this.$refs.teamRegisterForm.getForm();
				await TeamAPI.registerTeam({
					teamInfo: {
						teamName: teamInfoForm.teamInfo.teamName,
						foundationYmd: teamInfoForm.teamInfo.foundationYmd,
						introduction: teamInfoForm.teamInfo.introduction,
						hometown: teamInfoForm.teamInfo.hometown,
						sidoCode: teamInfoForm.teamInfo.sidoCode,
						sigunguCode: teamInfoForm.teamInfo.sigunguCode,
						teamRegularExercises: ValidationUtil.isNull( teamInfoForm.teamRegularExercises ) ? [] : teamInfoForm.teamRegularExercises,
					},
					teamLogoImage: teamInfoForm.teamLogoImageFile,
				});
				alert('팀이 정상적으로 등록되었습니다.');
				this.$router.push({ name: 'MyTeamListPage' });
			},
		},
	};
</script>

<style lang="scss" scoped></style>
