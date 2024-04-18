<template>
    <v-container>
        <PasswordInput 
            pLabel="비밀번호" 
            ref="passwordInput"
        />
        <v-container>
            <WithdrawalBtn pBtnName="회원탈퇴" @do-delete="withdrawalMembership()" />
        </v-container>
        <v-container>
            <WithdrawalCancelBtn pBtnName="취소" pRoutePageName="MyProfilePage" />
        </v-container>
    </v-container>
</template>

<script>
  /** Backend API */
  import UserAPI from "@/api/UserAPI";
  /** Code */
  /** Utils */
  import ValidationUtil from "@/common/util/ValidationUtil";
  import AuthStateManager from "@/common/state/AuthStateManager";
  /** Components */
  import PasswordInput from "@/components/input/FrameTextFieldInput.vue";
  import WithdrawalBtn from "@/components/button/FrameDeleteBtn.vue";
  import WithdrawalCancelBtn from "@/components/button/FramePageMoveBtn.vue";
  /** Emit Event */


export default {
    components: {
        PasswordInput,
        WithdrawalBtn,
        WithdrawalCancelBtn,
    },
    methods: {
        async withdrawalMembership() {
            const password = this.$refs.passwordInput.getValue();
            if ( ValidationUtil.isNull( password ) ) {
                alert( "비밀번호를 입력해주시기 바랍니다." );
                return;
            }
            await UserAPI.withdrawalMembership({ password : password });
            alert( "회원탈퇴 처리되었습니다.");
            AuthStateManager.mutations.processLogout();
            this.$router.push('/'); // 메인화면으로 이동
        },
    },
};
</script>

<style></style>
