<template>
	<v-container>
		<!-- <v-form v-if="dataInit" ref="form" lazy-validation > -->
			<v-form v-if="dataInit">
			<v-row>
				<v-col cols="7">
					<v-row>
						<TeamNameInput pLabel="팀명"
							:pData="teamInfo.teamName"
							:pRequired="true"
							@compliance="onComplianceTeamName"
							@violation="onViolationTeamName"
						/>
						<FoundationDatePickerInput pLabel="창단일"
							:pData="teamInfo.foundationYmd"
							:pRequired="true"
							@compliance="onComplianceFoundationYmd"
							@violation="onViolationFoundationYmd"
						/>
					</v-row>
					<v-row>
						<HomeTownAddressInput pLabel="연고지"
							:pData="{ 
								address : teamInfo.hometown,
							 	sidoCode : teamInfo.sidoCode,
								sigunguCode : teamInfo.sigunguCode,
							}"
							@data="onComplianceTeamAddressInfo"
							@violation="onViolationTeamAddressInfo"
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
						@exceed-max-size="handleImageFileInputEvent"
						@clear-input="handleImageFileInputEvent"
						@select-valid-image="handleImageFileInputEvent"
					/>
				</v-col>
			</v-row>
			<v-row>
				<TeamIntroductionInput pLabel="팀 소개글을 작성해주세요."
					:pData="teamInfo.introduction"
					:pRequired="true"
					@compliance="onComplianceTeamIntroduction"
					@violation="onViolationTeamIntroduction"
				/>
			</v-row>

			<v-row>
				<TeamRegularExercisesInput 
					:pData="teamRegularExercises"
					@data="handleTeamRegularExercises"
				/>
			</v-row>
		</v-form>
	</v-container>
</template>

<script>
	import TeamNameInput from '@/components/input/FrameTextFieldInput.vue';
	import HomeTownAddressInput from '@/components/input/AddressInput.vue';
	import FoundationDatePickerInput from '@/components/input/DatePickerInput.vue';

	import TeamLogoImage from '@/components/image/FrameImageComp.vue';
	import TeamLogoImageInput from '@/components/input/FrameImageInput.vue';

	import TeamIntroductionInput from '@/components/input/FrameTextAreaInput.vue';
	import TeamRegularExercisesInput from '@/components/team/TeamRegularExercisesInput.vue';

	import ValidationUtil from '@/common/util/ValidationUtil.js';

	/**---------------------------------
	 * 해당 컴포넌트가 Emit하는 이벤트명
	 **---------------------------------*/
	 const Event = {
		CHANGE_TEAM_INFO 		: 'change-team-info',
		CHANGE_TEAM_LOGO_IMAGE 	: 'change-team-logo-image',
		CHANGE_TEAM_EXERCISES 	: 'change-team-exercises',
    } 

	export default {
		components: {
			TeamNameInput,
			HomeTownAddressInput,
			FoundationDatePickerInput,
			TeamLogoImage,
			TeamLogoImageInput,
			TeamIntroductionInput,
			TeamRegularExercisesInput,
		},
		mounted() {
			console.log( ["FormMounted", this.pTeamInfo])
			// 화면 초기화에 사용할 데이터를 props로 받을 경우 data에 세팅 ( 팀정보 수정인 경우에 해당 )
			if (ValidationUtil.isNull(this.pTeamInfo)) {
				this.dataInit = true;	// init할 데이터가 없어도 데이터 초기화 단계가 완료된 상태로 바꿔줘야 함.
				return;
			}
			this.teamInfo = this.pTeamInfo;
			this.teamLogoImage = this.pTeamLogoImagePath;
			if (ValidationUtil.isNotNull(this.pTeamRegularExercises)) {
				this.teamRegularExercises = this.pTeamRegularExercises;
			}
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
				teamRegularExercises: [{}],
				teamLogoImageFile: null,
				teamLogoImageFileErrorMessage: "",
			}
		},
		/**-------------------------------------------------
		 * Vue 인스턴스의 watch속성 : 인스턴스내 객체 데이터의 변경을 감지한다.
		 * - input의 속성이 변경될때마다 상위 컴포넌트로 데이터 전달 ( $emit 사용 )
		 **-------------------------------------------------*/
		watch: {
			teamRegularExercises: {
				deep: true,
				handler: function (newData) {
					this.$emit(Event.CHANGE_TEAM_EXERCISES, newData);
				},
			},
		},
		props: {
			pTeamInfo: Object,
			pTeamLogoImagePath: String,
			pTeamRegularExercises: Array,
		},
		methods: {
			_createEmitTemplate( data, errorMessage ) {
				return {
					data : data,
					errorMessage : errorMessage,
				}
			},
			emitValidTeamInfo() {
				this.$emit( Event.CHANGE_TEAM_INFO, this._createEmitTemplate( this.teamInfo, "" ) );
			},
			emitInValidTeamInfo() {
				this.$emit( Event.CHANGE_TEAM_INFO, this._createEmitTemplate( this.teamInfo,  "팀정보 입력값이 유효하지 않습니다. 입력값을 확인해주세요." ) );
			},
			/** 팀정보 */
			onComplianceTeamName( e ) {
				this.teamInfo.teamName = e.data;
				this.emitValidTeamInfo();
			},
			onComplianceTeamAddressInfo( data ) {
				this.teamInfo.hometown = data.address;
				this.teamInfo.sidoCode = data.sidoCode;
				this.teamInfo.sigunguCode = data.sigunguCode;
				this.emitValidTeamInfo();
			},
			onComplianceFoundationYmd( e ) {
				this.teamInfo.foundationYmd = e.data;
				this.emitValidTeamInfo();
			},
			onComplianceTeamIntroduction( e ) {
				this.teamInfo.introduction = e.data;
				this.emitValidTeamInfo();
			},
			/** 팀정보 - 입력정책 위반시 발생하는 이벤트 */
			onViolationTeamName( e ) {
				this.teamInfo.teamName = e.data;
				this.emitInValidTeamInfo();
			},
			onViolationTeamAddressInfo( data ) {
				this.teamInfo.hometown = data.address;
				this.teamInfo.sidoCode = data.sidoCode;
				this.teamInfo.sigunguCode = data.sigunguCode;
				this.emitInValidTeamInfo();
			},
			onViolationFoundationYmd( e ) {
				this.teamInfo.foundationYmd = e.data;
				this.emitInValidTeamInfo();
			},
			onViolationTeamIntroduction( e ) {
				this.teamInfo.introduction = e.data;
				this.emitInValidTeamInfo();
			},
			/** 팀로고 이미지 */
			handleImageFileInputEvent( event ) {
				this.teamLogoImageFile				= event.imageFile;
				this.teamLogoImageFileErrorMessage 	= event.errorMessage;
				console.log( ['logoImage', this.teamLogoImageFile, this.teamLogoImageFileErrorMessage])
				this.$emit(Event.CHANGE_TEAM_LOGO_IMAGE, this._createEmitTemplate(
					this.teamLogoImageFile,
					this.teamLogoImageFileErrorMessage,						
				));
			},
			/** 팀정기운동 목록 - 입력 정책 관련 이벤트 제어하는 로직 추가 필요 TODO */
			handleTeamRegularExercises( data ) {
				this.teamRegularExercises = data;
			},
		},
	};
</script>

<style lang="scss" scoped></style>
