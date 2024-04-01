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
				<v-row>
					<v-col>주소 : </v-col>
					<v-col>
						<v-btn @click="showAPI()" solo>주소찾기</v-btn>
						<span
							>도로명주소<v-text-field v-model="roadAddress" solo></v-text-field
						></span>
						<span
							>우편번호<v-text-field v-model="zoneCode" solo></v-text-field
						></span>
					</v-col>
				</v-row>
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
	import MainTitle from '@/components/title/FrameTabMainTitle.vue';

	import ProfileUpdateBtn from '@/components/button/FrameUpdateBtn.vue';
	import PasswordUpdatePageMoveBtn from '@/components/button/FramePageMoveBtn.vue';
	import RemoveUserPageMoveBtn from '@/components/button/FramePageMoveBtn.vue';

	import myProfileApi from '@/api/AuthUserAPI';
	import UserAPI from '@/api/UserAPI';
	export default {
		components: {
			MainTitle,
			ProfileUpdateBtn,
			PasswordUpdatePageMoveBtn,
			RemoveUserPageMoveBtn,
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
				await myProfileApi.updateUser({
					userName 		: this.userName,
					email 			: this.email,
					gender 			: this.gender,
					positionCode 	: this.positionCode,
					height 			: this.height,
					weight 			: this.weight,
					roadAddress 	: this.roadAddress,
					sidoCode 		: this.sidoCode,
					sigunguCode 	: this.sigunguCode,
					userImagePath 	: this.userImagePath,
				});
			},
			// kakao Address API 사용 설명 : https://chlost.tistory.com/53
			showAPI() {
				// 단, 왜 arrow function을 사용했을까?
				// 출처 : https://medium.com/@hozacho/vuejs%EC%97%90%EC%84%9C-arrow-function%EC%9D%84-%EC%82%AC%EC%9A%A9%ED%95%B4%EC%95%BC%ED%95%98%EB%8A%94-%EC%9D%B4%EC%9C%A0-ec067c342412
				new window.daum.Postcode({
					oncomplete: (data) => {
						this.roadAddress = data.roadAddress;
						this.zoneCode = data.zonecode;
						this.sidoCode = data.sigunguCode.substring(0, 2);
						this.sigunguCode = data.sigunguCode;
						console.log(data);
					},
				}).open();
			},
		},
		mounted() {
			this.load();
		},
	};
</script>

<style></style>
