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
	import Pagination from '@/components/list/Pagination';
    import UserSearchBtn from '@/components/button/FrameSearchBtn.vue';
    /** Emit Event */

	export default {
        components : {
            UserSearchBtn,
        },
		props: {
			pTeamSeq	: String,
            pRowBtnName : String,
		},
        mounted() {
            this.searchUsers();
        },
		data() {
			return {
				pagination 		: Pagination.init(),
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
				this.searchUsers();
			},
			async searchUsers( pageNo ) {
				// 페이지 정보 세팅
				const data = await UserAPI.getUsersExcludingTeamMembers( this.getSearchParams( pageNo ) );
				// 결과 세팅
				this.users 		= data.users;
				this.pagination = Pagination.of( data.pagination );
			},
			getSearchParams( pageNo ) {
				const params = {
					teamSeq 	: this.pTeamSeq,
					pageNo		: Pagination.getPageNo( pageNo ), 
					userName	: "",
					email		: "",
				}
				switch ( this.searchCondType ) {
					case 'userName'	: params.userName 	= this.searchKeyword; break;
					case 'email'	: params.email		= this.searchKeyword; break;
					default:
					throw new Error( "유효한 검색항목이 아닙니다." );
				}
				return params;
			},
            emitEventClickRowBtn( userInfo ) {
                this.$emit( 'click-row-btn', userInfo );
            },
		},
	};
</script>

<style lang="scss" scoped></style>
