<template>
    <div>
        <!-- 검색 조건 영역 -->
		<v-row>
			<v-col cols="3">
				<v-select
					v-model="searchCondType"
					:items="searchCondTypes"
					item-text="text"
					item-value="value"
					label="검색 유형을 선택해주세요."
				/>
			</v-col>
			<v-col>
				<v-text-field label="검색어" v-model="searchKeyword" />
			</v-col>
		</v-row>

        <UserSearchBtn @do-search="clickSearchButton" />

        <!-- 검색 목록 영역 -->
        <v-data-table
            :headers="userListHeader"
            :items="users"
			item-key="userSeq"
			:options="{
				page 			: pagination.pageNo,
				itemsPerPage 	: pagination.rowCount
			}"
			hide-default-footer
			class="elevation-1"
        >
			<!-- row별 버튼 -->
			<template v-if="pRowBtnName" v-slot:[`item.button`]="{ item }">
				<template>
					<v-btn class="mr-2" small @click="emitEventClickRowBtn( item )">
						{{ pRowBtnName }}
					</v-btn>
				</template>
			</template>
        </v-data-table>
		<!-- 하단 페이지네이션 -->
		<div class="text-center pt-2">
			<v-pagination
				v-model="pagination.pageNo"
				:length="pagination.totalPageCount"
				@input="searchUsers"
			/>
		</div>

    </div>
</template>

<script>
    /** Backend API */
	import UserAPI from '@/api/UserAPI.js';

    /** Code */
    /** Utils */
    /** Components */
    import UserSearchBtn from '@/components/button/FrameSearchBtn.vue';
    /** Emit Event */

	export default {
        components : {
            UserSearchBtn,
        },
		props: {
			pTeamSeq: Number,
			pRowCount: {
				type : Number,
				default() { return 5; },
			},
            pRowBtnName : String,
		},
        mounted() {
            this.searchUsers({ pageNo : 1 });
        },
		data() {
			return {
				pagination : {
					pageNo 			: 1,
					totalCount 		: 0,
					totalPageCount 	: 1,
					rowCount 		: this.pRowCount,
				},
				searchCondType	: 'userName',
				searchCondTypes	: [
					{ text: '이름', value: 'userName' },
					{ text: '이메일', value: 'email' },
				],
				searchKeyword: '',
				userListHeader: [
                    { text: '성별', value: 'genderName' },
					{ text: '이름', value: 'userName' },
					{ text: '이메일', value: 'email', sortable: false },
					{ text: '키', value: 'height', sortable: false },
					{ text: '몸무게', value: 'weight', sortable: false },
					{ text: '포지션', value: 'positionCodeName' },
					{ test: '버튼', value: 'button', sortable: false },
				],
				users: [],
			};
		},
		methods: {
			clickSearchButton() {
				if ( !this.searchCondType ) {
					alert('검색 유형을 선택해주세요.');
					return;
				}
				this.searchUsers({ pageNo : 1});
			},
			async searchUsers( { pageNo } ) {
				this.pagination.pageNo = pageNo;
				const params = this.getSearchParams();
				params.teamSeq 	= this.pTeamSeq;
				params.pageNo	= this.pagination.pageNo; 
				const data = await UserAPI.getUsersExcludingTeamMembers( params );
				this.users = data.users;
			},
			getSearchParams() {
				switch ( this.searchCondType ) {
					case 'userName':
						return {
							userName: this.searchKeyword,
						};
					case 'email':
						return {
							email: this.searchKeyword,
						};
					default:
						return {
							userName: '',
							email: '',
						};
				}
			},
            emitEventClickRowBtn( userInfo ) {
                this.$emit( 'click-row-btn', userInfo );
            },
		},
	};
</script>

<style lang="scss" scoped></style>
