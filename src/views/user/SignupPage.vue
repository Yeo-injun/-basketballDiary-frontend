<template>
	<v-container>
		<v-form ref="form">
			<!-- 필수 입력값 표시 -->
			회원가입
			<v-text-field
				label="아이디"
				v-model="userRegInfo.userId"
				:rules="this.rules.userId"
				required
				@change="initDuplicationCheckStatus"
			></v-text-field>
			<v-btn block @click="checkUserIdAvailable">ID중복확인</v-btn>

			<v-text-field
				label="비밀번호"
				type="password"
				v-model="userRegInfo.password"
				:rules="this.rules.password"
				required
			></v-text-field>
			<v-text-field
				label="비밀번호 확인"
				type="password"
				v-model="passwordCheck"
			></v-text-field>

			<v-text-field
				label="이름"
				v-model="userRegInfo.name"
				:rules="this.rules.name"
				required
			></v-text-field>
			<v-text-field
				label="이메일"
				v-model="userRegInfo.email"
				:rules="this.rules.email"
				required
			></v-text-field>
			<BirthDayInput pLabel="생년월일"
				:pData="userRegInfo.birthYmd"
				:pRequired="true"
				@compliance="setBirthYmd"
			/>
			<v-radio-group
				v-model="userRegInfo.gender"
				row
				:rules="this.rules.gender"
				required
			>
				<v-radio label="남성" value="01" />
				<v-radio label="여성" value="02" />
			</v-radio-group>
			<v-text-field
				label="신장(cm)"
				v-model="userRegInfo.height"
			></v-text-field>
			<v-text-field
				label="몸무게(kg)"
				v-model="userRegInfo.weight"
			></v-text-field>

			<v-container>
				포지션
				<v-radio-group v-model="userRegInfo.positionCode" row>
					<v-radio label="포인트가드" value="11" color="primary" />
					<v-radio label="슈팅가드" value="12" color="primary" />
					<v-radio label="스몰포워드" value="23" color="primary" />
					<v-radio label="파워포워드" value="24" color="primary" />
					<v-radio label="센터" value="30" color="primary" />
				</v-radio-group>
			</v-container>
			<!-- 시도, 시군구 코드 -->
		</v-form>
		<v-btn block color="primary" v-on:click="signUp">회원가입</v-btn>
	</v-container>
</template>

<script>
	/** Backend API */
	import UserAPI from '@/api/UserAPI.js';

	/** Code */
	/** Utils */
	import ValidationUtil from '@/common/util/ValidationUtil';
	import InputRule from '@/common/input/InputRule.js';

	/** Components */
	import BirthDayInput from '@/components/input/DatePickerInput.vue';

	/** Emit Event */

	// id중복체크 - 자동으로 체크하기 https://pozafly.github.io/tripllo/(6)login3-vue/
	// 참고자료 : https://vuetifyjs.com/en/components/forms/#vuelidate
	export default {
		components: {
			BirthDayInput,
		},
		data: () => {
			return {
				isModalOpen: '',
				isNotDuplicateUserId: false,
				passwordCheck: '',
				userRegInfo: {
					userId: '',
					password: '',
					name: '',
					email: '',
					birthYmd: '',
					gender: '',
					height: 0,
					weight: 0,
					positionCode: '', // TODO 현재는 포지션을 하나만 선택하. 향후에는 포지션 2개이상 선택 가능
				},
				/**-------------------
				 * 회원가입 정보 (Validation)
				 *--------------------*/
				rules: {
					userId: InputRule.userId,
					password: InputRule.password,
					name: InputRule.userName,
					email: InputRule.email,
					gender: [(value) => ValidationUtil.input.checkNotEmpty(value)],
					height: [(value) => ValidationUtil.input.checkNotEmpty(value)],
					weight: [(value) => ValidationUtil.input.checkNotEmpty(value)],
					positionCode: [(value) => ValidationUtil.input.checkNotEmpty(value)],
				},
			};
		}, // data
		methods: {
			setBirthYmd( e ) {
				this.userRegInfo.birthYmd = e.data;
			},
			initDuplicationCheckStatus() {
				this.isNotDuplicateUserId = false;
			},
			// 아이디 중복체크  API - 중복체크 후 다시 아이디를 고쳤을때
			async checkUserIdAvailable() {
				const { isAvailable } = await UserAPI.checkUserIdAvailable({
					userId: this.userRegInfo.userId,
				});

				if ( isAvailable ) {
					this.isNotDuplicateUserId = true;
					alert('사용할 수 있는 ID입니다!');
					return;
				}

				this.isNotDuplicateUserId = false;
				alert('중복된 ID가 존재합니다.');

			},
			// 비밀번호 확인 로직
			checkPassword() {
				if (this.passwordCheck == this.userRegInfo.password) {
					return true;
				}
				return false;
			},
			// 회원가입 요청
			async signUp() {
				if (!this.isNotDuplicateUserId) {
					alert('ID중복확인을 해주시기 바랍니다.');
					return;
				}

				if (!this.checkPassword()) {
					alert('비밀번호가 일치하지 않습니다.');
					return;
				}

				// 참고자료 : v-form으로 감싸고 ref속성 추가 - https://crispypotato.tistory.com/133
				if (!this.$refs.form.validate()) {
					return;
				}

				await UserAPI.signUp( this.userRegInfo );
				alert('회원가입이 완료되었습니다.');
				this.$router.push('/login');
			},
		}, // methods
	};
</script>

<style lang="scss" scoped></style>
