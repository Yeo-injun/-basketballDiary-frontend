/** * 화면ID : G001P01 * 화면명 : 게임생성 화면 * 생성일시 : 2022.10.17 * 작성자
: 여인준 * 작업일지 * 2022.10.17(월) 여인준 : 최초생성 */

<template>
	<v-container>
		<h2>경기 정보</h2>
		<v-btn :to="{ name: 'GameJoinTeamSelectionPage' }">다음</v-btn>
		<v-text-field label="경기">경기일자</v-text-field>
		<v-text-field label="경기시작시간" /> ~
		<v-text-field label="경기종료시간" />
		<v-text-field label="주소" />
		<v-btn @click="searchAddress()">주소검색</v-btn>
		<v-text-field label="경기장명" />
	</v-container>
</template>

<script>
	import AddressOpenApi from '@/common/address/AddressOpenApi.js';

	export default {
		setup() {
			return {};
		},

		methods: {
			searchAddress() {
				AddressOpenApi.open(function (data) {
					console.log('===============');
					console.log(data);
				});
			},
		},
	};
</script>

<style lang="scss" scoped></style>
