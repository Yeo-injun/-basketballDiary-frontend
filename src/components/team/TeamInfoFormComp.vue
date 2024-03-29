<template>
	<v-container>
		<v-form v-if="dataInit" ref="form">
			<v-row>
				<v-col cols="7">
					<v-row>
						<TeamNameInput pLabel="팀명"
							ref="teamNameInput"
							:pData="this.teamInfo.teamName"
							:pRequired="true"
						/>
						<FoundationYmdInput pLabel="창단일"
							ref="foundationYmdInput"
							:pData="this.teamInfo.foundationYmd"
							:pRequired="true"
						/>
					</v-row>
					<v-row>
						<HomeTownAddressInput pLabel="연고지"
							ref="homeTownAddressInput"
							:pData="{ 
								address : teamInfo.hometown,
							 	sidoCode : teamInfo.sidoCode,
								sigunguCode : teamInfo.sigunguCode,
							}"
							:pRequired="true"
						/>
					</v-row>
				</v-col>
				<v-col cols="5">
					<TeamLogoImage
						:pImageUrl="pTeamLogoImagePath"
						:pMaxHeight="String(250)"
						:pMaxWidth="String(250)"
					/>
					<TeamLogoImageInput pLabel="팀 로고 사진"
						ref="teamLogoImageInput"
					/>
				</v-col>
			</v-row>
			<v-row>
				<TeamIntroductionInput pLabel="팀 소개글을 작성해주세요."
					ref="teamIntroductionInput"
					:pData="this.teamInfo.introduction"
					:pRequired="true"
				/>
			</v-row>

			<v-row>
				<TeamRegularExercisesInput
					ref="teamRegularExercsiesInput"
					:pData="this.pTeamRegularExercises"
				/>
			</v-row>
		</v-form>
	</v-container>
</template>

<script>
	import TeamNameInput from '@/components/input/FrameTextFieldInput.vue';
	import HomeTownAddressInput from '@/components/input/AddressInput.vue';
	import FoundationYmdInput from '@/components/input/DatePickerInput.vue';

	import TeamLogoImage from '@/components/image/FrameImageComp.vue';
	import TeamLogoImageInput from '@/components/input/FrameImageInput.vue';

	import TeamIntroductionInput from '@/components/input/FrameTextAreaInput.vue';
	import TeamRegularExercisesInput from '@/components/team/TeamRegularExercisesInput.vue';

	import ValidationUtil from '@/common/util/ValidationUtil.js';

	export default {
		components: {
			TeamNameInput,
			HomeTownAddressInput,
			FoundationYmdInput,
			TeamLogoImage,
			TeamLogoImageInput,
			TeamIntroductionInput,
			TeamRegularExercisesInput,
		},
		mounted() {
			// 화면 초기화에 사용할 데이터를 props로 받을 경우 data에 세팅 ( 팀정보 수정인 경우에 해당 )
			if (ValidationUtil.isNull(this.pTeamInfo)) {
				this.dataInit = true;	// init할 데이터가 없어도 데이터 초기화 단계가 완료된 상태로 바꿔줘야 함.
				return;
			}
			this.teamInfo = this.pTeamInfo;
			this.teamLogoImage = this.pTeamLogoImagePath;
			this.dataInit = true;
		},
		data() {
			return {
				/*---------------------------
				 * 컴포넌트 데이터 init 상태 
				 *---------------------------*/
				dataInit: false,
				/*---------------------------
				 * input 데이터 속성 
				 *---------------------------*/
				teamInfo: {
					teamName: '',
					hometown: '',
					sidoCode: '',
					sigunguCode : '',
					foundationYmd: '',
					introduction: '',
				},
				teamLogoImageFile: null,
			}
		},
		props: {
			pTeamInfo: Object,
			pTeamLogoImagePath: String,
			pTeamRegularExercises: Array,
		},
		methods: {
			/**
			 * Form내 input컴포넌트의 유효성을 체크한다.
			 * @return Boolean  
			 */
			validate() {
				return this.$refs.form.validate();
			},
			/**
			 * Form컴포넌트 내부에 존재하는 사용자 input 값을 
			 * data속성으로 관리하지 않기.
			 * 
			 * data 속성으로 관리하는 데이터는 각 input컴포넌트에서 관리하고
			 * 필요할 때 해당 input컴포넌트에서 가져와서 return하기. 
			 * 
			 * 각 input마다 refs를 달아서 직접 input의 value 값 가져오는 방식 검토...
			 */
			getForm() {
				const refs 					= this.$refs;
				const homeTownAddressInfo 	= refs.homeTownAddressInput.getValue();
				return {
					teamInfo: {
						teamName		: refs.teamNameInput.getValue()			,
						hometown		: homeTownAddressInfo.address			,
						sidoCode		: homeTownAddressInfo.sidoCode			,
						sigunguCode 	: homeTownAddressInfo.sigunguCode		,
						foundationYmd	: refs.foundationYmdInput.getValue()	,
						introduction	: refs.teamIntroductionInput.getValue()	,
					},
					teamRegularExercises: refs.teamRegularExercsiesInput.getValue(),
					teamLogoImageFile	: refs.teamLogoImageInput.getImage(),
				}
			},
		},
	};
</script>

<style lang="scss" scoped></style>
