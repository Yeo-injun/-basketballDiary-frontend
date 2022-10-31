/** * 화면ID : G001P01 * 화면명 : 게임생성 화면 * 생성일시 : 2022.10.17 * 작성자
: 여인준 * 작업일지 * 2022.10.17(월) 여인준 : 최초생성 */

<template>
	<!-- props를 내려줄때 Tips
	내려주는 props가 변수에 담겨있을 때는 :props명으로
	내려주는 props가 값일때는 props명으로 작성
	-->
	<v-container>
		<h2>경기 정보</h2>
		<PageMoveBtn :pRouteCompName="this.routeCompName" />
		<v-btn @click="createGame()">게임생성(임시)</v-btn>

		<CustomDatePickerComp
			p-label-name="경기일자"
			:p-init-value="currentYmd"
			@pickup-date="setGameYmd"
		/>
		<!-- 경기시작시간 및 종료시간 셀렉트박스로 만드는거 검토 -->
		<v-text-field
			label="경기시작시간"
			v-model="gameCreationDTO.gameStartTime"
		/>
		~
		<v-text-field label="경기종료시간" v-model="gameCreationDTO.gameEndTime" />

		<v-text-field label="주소" v-model="gameCreationDTO.gamePlaceAddress" />
		<v-btn @click="popupAddressSearch()">주소검색</v-btn>
		<v-text-field label="경기장명" v-model="gameCreationDTO.gamePlaceName" />
	</v-container>
</template>

<script>
	import gameApi from '@/api/GameAPI.js';

	import AddressOpenApi from '@/common/address/AddressOpenApi.js';
	import CustomDatePickerComp from '@/components/common/CustomDatePickerComp.vue';
	import PageMoveBtn from '@/components/button/PageMoveBtn.vue';

	import DateUtil from '@/common/DateUtil.js';

	export default {
		components: {
			CustomDatePickerComp,
			PageMoveBtn,
		},
		data() {
			return {
				routeCompName: 'GameJoinTeamSelectionPage',
				currentYmd: DateUtil.getCurrentYmd(),
				// TODO 파라미터값 정리 / rule부여해서 필수값 체크
				gameCreationDTO: {
					teamSeq: '1',
					creatorTeamMemberSeq: '1',
					gameYmd: '20221021',
					gameStartTime: '1000',
					gameEndTime: '1300',
					gamePlaceAddress: '경기도 시흥시 배곧',
					gamePlaceName: '빈대떡과찜',
					sidoCode: '11',
					sigunguCode: '110',
				},
			};
		},
		methods: {
			popupAddressSearch() {
				AddressOpenApi.open(function (data) {
					console.log('===============');
					console.log(data);
				});
			},
			getCurrentYmd() {
				return DateUtil.getCurrentYmd();
			},
			setGameYmd(ymd) {
				this.gameCreationDTO.gameYmd = DateUtil.Format.toString(ymd);
			},
			createGame() {
				const params = this.gameCreationDTO;
				console.log(params);
				gameApi.createGame(params);
			},
		},
	};
</script>

<style lang="scss" scoped></style>
