<template>
	<div>
		<!-- 상위 컴포넌트에서 목록 데이터를 props로 전달 받음 -->
		<!-- 목록 처리 -->
		<div v-for="(item, idx) in pList" :key="idx">
			<!-- 목록 데이터의 요소데이터를 상위 컴포넌트에서 정의한 컴포넌트에 전달. 
            상위 컴포넌트에서는 상위컴포넌트 변수명을 정의한후 .items로 데이터 접근가능 -->
			<slot name="itemSlot" :item="item" :idx="idx"></slot>
		</div>

		<!-- 보여줄 데이터가 없을 경우 -->
		<v-container v-if="pList.length == 0">
			<slot name="itemEmptySlot"></slot>
		</v-container>

		<!-- 페이징 데이터 처리-->
		<v-pagination
			v-model="pagination.pageNo"
			:length="pagination.totalPageCount"
			@input="onClickPage"
		/>
	</div>
</template>

<script>
	import ValidationUtil from '@/common/util/ValidationUtil';

	export default {
		props: {
			pList: Array,
			pPagination: Object,
		},
		data() {
			return {
				pagination	: this.initPagination(),
			};
		},
		watch: {
			// 상위 컴포넌트에서 받아온 페이징 데이터의 변경사항 체크하여 초기화
			pPagination: {
				handler() {
					this.pagination = this.initPagination();
				},
				deep	: true,
			},
		},
		methods: {
			initPagination() {
				if (ValidationUtil.isNull(this.pPagination)) {
					return {
						pageNo: 1,
						totalPageCount: 1,
						totalCount: 0,
					};
				}
				return this.pPagination;
			},
			onClickPage() {
				console.log(this.pagination);
				this.$emit('click-page', this.pagination);
			},
		},
	};
</script>

<style lang="scss" scoped></style>
