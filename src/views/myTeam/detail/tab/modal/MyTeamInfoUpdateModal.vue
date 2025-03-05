<template>
	<ModalFrame ref="modal" 
		:pSize="{
			maxWidth: '1100px',
		}"
		:onOpen="this.getTeamInfo"
	>
		<template v-slot:modal-activator>
			<ModalActivateBtn pBtnName="팀정보 수정"
				@do-open="openModal()"
			/>
		</template>

		<template v-slot:title>
			<v-card-title class="text-h5 grey lighten-2"> 팀정보 </v-card-title>
		</template>

		<template v-slot:contents>
			<v-container>
				<TeamInfoFormComp
					ref="teamInfoUpdateForm"
					:pTeamInfo="teamInfo"
					:pTeamLogoImagePath="teamLogoImagePath"
					:pTeamRegularExercises="teamRegularExercises"
				/>
			</v-container>
		</template>

		<template v-slot:actions>
			<TeamInfoUpdateBtn pBtnName="수정" @do-update="modifyTeamInfo()" />
		</template>

	</ModalFrame>

</template>

<script>
	/** Backend API */
	import MyTeamAPI from '@/api/MyTeamAPI';

	/** Code */

	/** Utils */
	
	/** Components */
	import ModalFrame from '@/components/frame/DefaultModalFrame.vue';

	import ModalActivateBtn from '@/components/button/FrameOpenBtn.vue';

	import TeamInfoFormComp from '@/components/team/TeamInfoFormComp.vue';
	import TeamInfoUpdateBtn from '@/components/button/FrameUpdateBtn.vue';
	
	export default {
		components: {
			ModalFrame,
			ModalActivateBtn,
			TeamInfoFormComp,
			TeamInfoUpdateBtn,
		},
		props: {
			pTeamSeq: {
				type	: String,
				required: true,
			},
		},
		data() {
			return {
				/*-----------------------
				 * teamInfoForm 초기화 데이터
				 *-----------------------*/
				teamInfo: {},
				teamRegularExercises: [],
				teamLogoImageFile: null,
				teamLogoImagePath: '',
			};
		},
		methods: {
			openModal() {
				this.$refs.modal.open();
			},
			closeModal() {
				this.$refs.modal.close();
			},
			async getTeamInfo() {
				const data = await MyTeamAPI.getTeamInfo(this.pTeamSeq);
				this.teamInfo = {
					teamSeq			: data.teamSeq			,
					teamName		: data.teamName			,
					foundationYmd	: data.foundationYmd	,
					hometown		: data.hometown			,
					sidoCode		: data.sidoCode			,
					sigunguCode		: data.sigunguCode		,
					introduction	: data.introduction		,
				};
				this.teamLogoImagePath 		= data.teamLogoImagePath;
				this.teamRegularExercises 	= data.regularExercises;
			},
			async modifyTeamInfo() {
				if ( !this.$refs.teamInfoUpdateForm.validate() ) {
					return;
				}

				const form = this.$refs.teamInfoUpdateForm.getForm();
				await MyTeamAPI.modifyMyTeamInfo(
					this.pTeamSeq,
					{
						teamName				: form.teamInfo.teamName,
						hometown				: form.teamInfo.hometown,
						introduction			: form.teamInfo.introduction,
						foundationYmd			: form.teamInfo.foundationYmd,
						sidoCode				: form.teamInfo.sidoCode,
						sigunguCode				: form.teamInfo.sigunguCode,
						teamRegularExercises	: form.teamRegularExercises,
					},
					form.teamLogoImageFile
				);
				this.closeModal();
			},
		},
	};
</script>

<style lang="scss" scoped></style>
