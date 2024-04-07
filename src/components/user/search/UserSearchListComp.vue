<template>
    <div>
        <!-- 검색 조건 영역 -->
        <v-select
            v-model="searchCondType"
            :items="searchCondTypes"
            item-text="text"
            item-value="value"
            label="검색 유형을 선택해주세요."
        />
        <v-text-field label="검색어" v-model="searchKeyword" />
        <UserSearchBtn @do-search="clickSearchButton" />

        <!-- 검색 목록 영역 -->
        <v-data-table
            :headers="userListHeader"
            :items="users"
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
	// import MyTeamAPI from '@/api/MyTeamAPI.js';

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
			// async sendInvitation(e) {
			// 	if (!confirm('초대요청을 보내시겠습니까?')) {
			// 		return;
			// 	}
			// 	const params = {
			// 		teamSeq: this.pTeamSeq,
			// 		userSeq: e.userSeq,
			// 	};
			// 	await MyTeamAPI.inviteTeamMember(params);
			// 	alert('초대 완료했습니다. 선수의 승인을 기다리세요.');
			// },
		},
	};
</script>

<style lang="scss" scoped></style>
