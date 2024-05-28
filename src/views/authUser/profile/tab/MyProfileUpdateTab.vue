<template>
	<v-container>
		<MainTitle pTitleName="내정보" />
		<v-container v-if="dataInit">
			<UserNameInput pLabel="이름"
				ref="userNameInput"
				:pData="this.userName"
				:pRequired="true"
			/>
			<EmailInput pLabel="이메일"
				ref="emailInput"
				:pData="email"
				:pRequired="true"
			/>
			<v-row>
				<v-col>성별 :</v-col>
				<v-col>
					<v-radio-group v-model="gender">
						<v-radio label="남" value="01"></v-radio>
						<v-radio label="여" value="02"></v-radio>
					</v-radio-group>
				</v-col>
			</v-row>
			<v-row>
				<v-col>포지션 : </v-col>
				<v-col>
					<v-row>
						<v-radio-group v-model="positionCode">
							<v-radio label="포인트 가드" value="11"></v-radio>
							<v-radio label="슈팅가드" value="12"></v-radio>
							<v-radio label="스몰포워드" value="21"></v-radio>
							<v-radio label="파워포워드" value="22"></v-radio>
							<v-radio label="센터" value="30"></v-radio>
						</v-radio-group>
					</v-row>
				</v-col>
			</v-row>
			<HeightInput pLabel="신장(cm)" 
				ref="heightInput"
				:pData="this.height"
				:pRequired="true"
			/>
			<WeightInput
				ref="weightInput"
				pLabel="몸무게(kg)" 
				:pData="this.weight"
				:pRequired="true"
			/>
			
			<ProfileAddressInput pLabel="주소검색"
				ref="profileAddressInput"
				:pData="{
					address		: this.roadAddress,
					sidoCode	: this.sidoCode,
					sigunguCode	: this.sigunguCode,
				}"
			/>
		
			<ProfileUpdateBtn @do-update="updateProfile" pBtnName="수정" />
			<PasswordUpdatePageMoveBtn
				pRoutePageName="PasswordUpdatePage"
				pBtnName="비밀번호 변경"
			/>
			<RemoveUserPageMoveBtn
				pRoutePageName="AccountSignOutPage"
				pBtnName="회원 탈퇴"
			/>
		</v-container>
	</v-container>
</template>

<script>
	/** Backend API */
	import UserAPI from '@/api/UserAPI';
	/** Code */
	/** Utils */
	/** Components */
	import MainTitle from '@/components/title/FrameTabMainTitle.vue';

	import UserNameInput from '@/components/input/FrameTextFieldInput.vue';
	import EmailInput from '@/components/input/FrameTextFieldInput.vue';

	import HeightInput from '@/components/input/FrameTextFieldInput.vue';
	import WeightInput from '@/components/input/FrameTextFieldInput.vue';
	import ProfileAddressInput from '@/components/input/AddressInput.vue';
	
	import ProfileUpdateBtn from '@/components/button/FrameUpdateBtn.vue';
	import PasswordUpdatePageMoveBtn from '@/components/button/FramePageMoveBtn.vue';
	import RemoveUserPageMoveBtn from '@/components/button/FramePageMoveBtn.vue';

	/** Emit Event */
	
	export default {
		components: {
			MainTitle,
			UserNameInput,
			EmailInput,
			HeightInput,
			WeightInput,
			ProfileAddressInput,
			ProfileUpdateBtn,
			PasswordUpdatePageMoveBtn,
			RemoveUserPageMoveBtn,
		},
		mounted() {
			console.log( "mounted Start!");
			this.load();
			console.log( "mounted End!");
		},
		data() {
			return {
				dataInit		: false,
				userName		: '',
				email			: '',
				gender			: '',
				positionCode	: '',
				height			: '',
				weight			: '',
				roadAddress		: '',
				sidoCode		: '',
				sigunguCode		: '',
				userImagePath	: '',
			};
		},
		methods: {
			async load() {

				const profile = await UserAPI.getMyProfile();
				console.log( "data load Done" );
				this.userName		= profile.userName;
				this.email			= profile.email;
				this.gender			= profile.gender;
				this.positionCode	= profile.positionCode;
				this.height			= profile.height;
				this.weight			= profile.weight;
				this.roadAddress	= profile.roadAddress;
				this.sidoCode		= profile.sidoCode;
				this.sigunguCode	= profile.sigunguCode;
				this.userImagePath	= profile.userImagePath;
				this.dataInit = true;
			},
			async updateProfile() {
				const refs 			= this.$refs;
				const addressInput 	= refs.profileAddressInput.getValue();
				await UserAPI.updateMyProfile({
					userName 		: refs.userNameInput.getValue(),
					email 			: refs.emailInput.getValue(),
					gender 			: this.gender,
					positionCode 	: this.positionCode,
					height 			: refs.heightInput.getValue(),
					weight 			: refs.weightInput.getValue(),
					roadAddress 	: addressInput.address,
					sidoCode 		: addressInput.sidoCode,
					sigunguCode 	: addressInput.sigunguCode,
					userImagePath 	: this.userImagePath,
				});

				alert( "회원정보가 수정되었습니다." );
			},
		},
	};
</script>

<style></style>
