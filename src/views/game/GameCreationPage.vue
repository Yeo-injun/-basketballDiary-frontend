/** * 화면ID : G001P01 * 화면명 : 게임생성 화면 * 생성일시 : 2022.10.17 * 작성자
: 여인준 * 작업일지 * 2022.10.17(월) 여인준 : 최초생성 */

<template>
	<v-container>
		<h2>경기 정보</h2>
		<v-button>다음</v-button>
		<v-text-field>경기일자</v-text-field>
		<v-text-field>경기시간</v-text-field>
		<v-text-field>주소</v-text-field>
		<v-button @click="searchAddress()">주소검색</v-button>
		<v-text-field>경기장명</v-text-field>
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
