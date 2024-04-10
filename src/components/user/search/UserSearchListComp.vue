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
			:items-per-page="pRowCount"
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
            this.searchUsers();
        },
		data() {
			return {
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
			async searchUsers() {
				const data = await UserAPI.getUsersExcludingTeamMembers(
					{ teamSeq: this.pTeamSeq },
					this.getSearchParams()
				);
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
