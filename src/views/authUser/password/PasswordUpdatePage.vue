<template>
	<v-container >
		<MainTitle pTitleName="비밀번호변경" />
		<v-form ref="passwordUpdateForm">
			<PrevPasswordInput pLabel="현재 비밀번호"
				ref="prevPasswordInput"
				:pRequired=true
			/>
			<NewPasswordInput pLabel="새로운 비밀번호"
				ref="newPasswordInput"
				:pRequired=true
			/>
			<NewPasswordCheckInput pLabel="새로운 비밀번호 확인"
				ref="newPasswordCheckInput"
				:pRequired=true
			/>
		</v-form>
		<PasswordUpdateBtn class="button-bottom" pBtnName="비밀번호 변경" @do-update="updatePassword()" />
		<PasswordUpdateCancelBtn class="button-bottom" pBtnName="취소" pRoutePageName="MyProfilePage" />
	</v-container>
</template>

<script>

	/** Backend API */
	import UserAPI from "@/api/UserAPI";
	/** Code */
	/** Utils */
	/** Components */
	import MainTitle from "@/components/title/FramePageMainTitle.vue";
	import PrevPasswordInput from "@/components/input/FrameTextFieldInput.vue";
	import NewPasswordInput from "@/components/input/FrameTextFieldInput.vue";
	import NewPasswordCheckInput from "@/components/input/FrameTextFieldInput.vue";
	import PasswordUpdateBtn from "@/components/button/FrameUpdateBtn.vue";
	import PasswordUpdateCancelBtn from "@/components/button/FramePageMoveBtn.vue";

	/** Emit Event */

export default {
	components : {
		MainTitle,
		PrevPasswordInput,
		NewPasswordInput,
		NewPasswordCheckInput,
		PasswordUpdateBtn,
		PasswordUpdateCancelBtn,
	},
	methods: {
		async updatePassword() {
			if ( !this.$refs.passwordUpdateForm.validate() ) {
				return;
			}

			const prevPassword 		= this.$refs.prevPasswordInput.getValue();
			const newPassword 		= this.$refs.newPasswordInput.getValue();
			const newPasswordCheck 	= this.$refs.newPasswordCheckInput.getValue();		

			if ( newPassword !== newPasswordCheck ) {
				alert( "새로운 비밀번호가 일치하지 않습니다." );
				return;
			}

			await UserAPI.updatePassword( {
				prevPassword	: prevPassword,
				newPassword		: newPassword
			} );
			alert("비밀번호가 정상적으로 변경되었습니다.");
			this.$router.push("/");
		},
	},
};
</script>

<style lang="scss" scoped>
	.button-bottom {
		margin-top: 10px;
		margin-bottom: 10px;
	}
</style>
