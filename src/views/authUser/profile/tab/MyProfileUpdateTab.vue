<template>
	<div>
		<MainTitle pTitleName="내정보" />
		<v-container>
			<v-card>
				<v-row>
					<v-col>이름 :</v-col>
					<v-col>
						<v-text-field v-model="userName" solo></v-text-field>
					</v-col>
				</v-row>
				<v-row>
					<v-col>이메일 :</v-col>
					<v-col>
						<v-text-field v-model="email" solo></v-text-field>
					</v-col>
				</v-row>
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
				<v-row>
					<v-col>키 : </v-col>
					<v-col cols="1">
						<v-text-field v-model="height" solo></v-text-field>
					</v-col>
				</v-row>
				<v-row>
					<v-col>몸무게 : </v-col>
					<v-col>
						<v-text-field v-model="weight" solo></v-text-field>
					</v-col>
				</v-row>
				<v-container>
					<ProfileAddressInput pLabel="주소검색"
						ref="profileAddressInput"
						:pData="{
							address		: this.roadAddress,
							sidoCode	: this.sidoCode,
							sigunguCode	: this.sigunguCode,
						}"
					/>
				</v-container>
				<ProfileUpdateBtn @do-update="updateProfile" pBtnName="수정" />
				<PasswordUpdatePageMoveBtn
					pRoutePageName="PasswordUpdatePage"
					pBtnName="비밀번호 변경"
				/>
				<RemoveUserPageMoveBtn
					pRoutePageName="AccountSignOutPage"
					pBtnName="회원 탈퇴"
				/>
			</v-card>
		</v-container>
	</div>
</template>

<script>
	/** Backend API */
	import UserAPI from '@/api/UserAPI';
	/** Code */
	/** Utils */
	/** Components */
	import MainTitle from '@/components/title/FrameTabMainTitle.vue';

	import ProfileAddressInput from '@/components/input/AddressInput.vue';
	
	import ProfileUpdateBtn from '@/components/button/FrameUpdateBtn.vue';
	import PasswordUpdatePageMoveBtn from '@/components/button/FramePageMoveBtn.vue';
	import RemoveUserPageMoveBtn from '@/components/button/FramePageMoveBtn.vue';

	/** Emit Event */
	
	export default {
		components: {
			MainTitle,
			ProfileAddressInput,
			ProfileUpdateBtn,
			PasswordUpdatePageMoveBtn,
			RemoveUserPageMoveBtn,
		},
		mounted() {
			this.load();
		},
		data() {
			return {
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
			},
			async updateProfile() {
				const addressInput = this.$refs.profileAddressInput.getValue();
				await UserAPI.updateMyProfile({
					userName 		: this.userName,
					email 			: this.email,
					gender 			: this.gender,
					positionCode 	: this.positionCode,
					height 			: this.height,
					weight 			: this.weight,
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
