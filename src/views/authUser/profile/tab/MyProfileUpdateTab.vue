<template>
	<v-container>
		<MainTitle pTitleName="내정보" />
		<v-container v-if="dataInit" >
			
			<v-form ref="profileUpdateForm">
				<UserNameInput pLabel="이름"
					ref="userNameInput"
					:pData="this.userName"
					:pRequired="true"
				/>
				<EmailInput 
					ref="emailInput"
					:pData="email"
					:pRequired="true"
				/>
				<GenderRadioInput pLabel="성별"
					ref="genderRadioInput"
					:pButtons="this.genderRadio"
					:pRequired="true"
					:pData="this.gender"
				/>
				<PositionRadioInput pLabel="포지션"
					ref="positionRadioInput"
					:pButtons="this.positionRadio"
					:pRequired="true"
					:pData="this.positionCode"
				/>
				<HeightInput pLabel="신장(cm)" 
					ref="heightInput"
					:pData="this.height"
					:pRequired="true"
				/>
				<WeightInput pLabel="몸무게(kg)"
					ref="weightInput"
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
			</v-form>
		
			<ProfileUpdateBtn @do-update="updateProfile" pBtnName="수정" />
			<v-container>
				<PasswordUpdatePageMoveBtn
					pRoutePageName="PasswordUpdatePage"
					pBtnName="비밀번호 변경"
				/>
			</v-container>
			<v-container>
				<RemoveUserPageMoveBtn
					pRoutePageName="AccountSignOutPage"
					pBtnName="회원 탈퇴"
				/>
			</v-container>
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
	import EmailInput from '@/components/input/EmailInput.vue';

	import GenderRadioInput from '@/components/input/FrameRadioInput.vue';
	import PositionRadioInput from '@/components/input/FrameRadioInput.vue';
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
			GenderRadioInput,
			PositionRadioInput,
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
				genderRadio 	: [
					{ label : "남성"		, value : "01" },
					{ label : "여성"		, value : "02" },
				],
				positionRadio 	: [
					{ label : "포인트가드"		, value : "11" },
					{ label : "슈팅가드"		, value : "12" },
					{ label : "스몰포워드"		, value : "21" },
					{ label : "파워포워드"		, value : "22" },
					{ label : "센터"		, value : "30" },
				],
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
				if ( !refs.profileUpdateForm.validate() ) {
					return;
				}
				const addressInput 	= refs.profileAddressInput.getValue();
				await UserAPI.updateMyProfile({
					userName 		: refs.userNameInput.getValue(),
					email 			: refs.emailInput.getValue(),
					gender 			: refs.genderRadioInput.getSelected(),
					positionCode 	: refs.positionRadioInput.getSelected(),
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
