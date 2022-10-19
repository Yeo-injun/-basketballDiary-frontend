/** * 화면ID : G001P01 * 화면명 : 게임생성 화면 * 생성일시 : 2022.10.17 * 작성자
: 여인준 * 작업일지 * 2022.10.17(월) 여인준 : 최초생성 */

<template>
	<!-- props를 내려줄때 Tips
	내려주는 props가 변수에 담겨있을 때는 :props명으로
	내려주는 props가 값일때는 props명으로 작성
	-->
	<v-container>
		<h2>경기 정보</h2>
		<PageMoveBtn pRouteCompName="GameJoinTeamSelectionPage" />

		<CustomDatePickerComp p-label-name="경기일자" :p-init-value="currentYmd" />
		<v-text-field label="경기시작시간" /> ~
		<v-text-field label="경기종료시간" />
		<v-text-field label="주소" />
		<v-btn @click="searchAddress()">주소검색</v-btn>
		<v-text-field label="경기장명" />
	</v-container>
</template>

<script>
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
				currentYmd: DateUtil.getCurrentYmd(),
			};
		},
		methods: {
			searchAddress() {
				AddressOpenApi.open(function (data) {
					console.log('===============');
					console.log(data);
				});
			},
			getCurrentYmd() {
				return DateUtil.getCurrentYmd();
			},
		},
	};
</script>

<style lang="scss" scoped></style>
