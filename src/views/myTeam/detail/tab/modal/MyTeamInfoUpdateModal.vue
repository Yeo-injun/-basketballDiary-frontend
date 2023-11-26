<template>
	<v-dialog v-model="isActivate" width="1200">
		<v-card>
			<v-card-title class="text-h5 grey lighten-2"> 팀정보 </v-card-title>

			<v-card-text>
				<TeamInfoFormComp
					v-if="this.dataInit"
					:pTeamInfo="this.teamInfo"
					@change-team-info="setTeamInfo"
					@change-team-logo-image="setTeamLogoImage"
				/>
			</v-card-text>

			<v-card-actions>
				<v-btn outlined depressed text @click.stop="isActivate = false">
					취소
				</v-btn>
				<v-btn color="primary" depressed @click="modifyTeamInfo()">
					저장
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
	import TeamInfoFormComp from '@/components/team/TeamInfoFormComp.vue';

	import MyTeamAPI from '@/api/MyTeamAPI';

	export default {
		components: {
			TeamInfoFormComp,
		},
		props: {
			value: {
				type: Boolean,
				required: true,
			},
			pTeamSeq: {
				type: Number,
				required: true,
			},
		},
		computed: {
			isActivate: {
				get() {
					return this.value;
				},
				set(value) {
					this.$emit('input', value);
				},
			},
		},
		data() {
			return {
				/** 데이터 초기화 완료여부 */
				dataInit: false,
				/** 관리 데이터 */
				teamInfo: {},
				teamLogoImage: null,
			};
		},
		methods: {
			setTeamInfo(teamInfo) {
				this.teamInfo = teamInfo;
			},
			setTeamLogoImage(logoImage) {
				this.teamLogoImage = logoImage;
			},
			async getTeamInfo() {
				this.teamInfo = await MyTeamAPI.getTeamInfo(this.pTeamSeq);
				this.teamInfo.teamLogoImage = this.teamInfo.teamImagePath;
			},
			async modifyTeamInfo() {
				await MyTeamAPI.modifyMyTeamInfo(
					this.pTeamSeq,
					this.teamInfo,
					this.teamLogoImage
				);
				this.isActivate = false;
			},
		},
		watch: {
			/**
			 * Modal 활성화시 API를 동기처리하여 dataInit 상태를 제어
			 * 이를 통해 하위 컴포넌트가 create되지 않도록 제어
			 * cf. 해당 컴포넌트가 다른 컴포넌트의 자식컴포넌트가 되면 mounted는 한번만 호출됨.
			 *      Modal을 활성화할때마다 데이터를 새로 받아오기 위해서는 mounted가 아니라 Modal의 활성화상태를 감지하여 API통신해야 함.
			 **/
			isActivate: async function (isDialogOpend) {
				if (isDialogOpend) {
					await this.getTeamInfo();
					this.dataInit = true;
					return;
				}
				this.dataInit = false;
			},
		},
	};
</script>

<style lang="scss" scoped></style>
