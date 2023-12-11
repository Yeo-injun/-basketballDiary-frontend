<template>
    <v-file-input
        show-size
        :label="this.pLabel || '수정할 프로필 사진 업로드'"
        accept="image/*"
        :model-value="this.imageFile"
        :rules="[ this.checkMaxFileSize ]"
    />
</template>

<script>
    import ValidationUtil from '@/common/util/ValidationUtil.js';
	
    export default {
        props : {
            pLabel : String,
            pMaxBytes : String,
        },
		data() {
			return {
				/*-------------------
				 * Input 데이터
				 *-------------------*/
				imageFile: null,
			};
		},
        methods : {
            checkMaxFileSize( imageFile ) {
                if ( !imageFile ) {
                    return true;
                }

                const MAX_BYTES = ValidationUtil.isNotNull( this.pMaxBytes ) 
                                ? this.pMaxBytes : 1 * 1024 * 1024 * 3; // 3mb
                if ( MAX_BYTES < imageFile.size ) {
                    this.imageFile = null;
                    this.$emit('exceed-max-size', `업로드 최대 크기 ( ${MAX_BYTES} )를 초과하였습니다.`);
                    return false;
                }
                // 유효할 경우에만 사진 파일을 emit함
                this.$emit('select-valid-image', this.imageFile );
                return true;
            },
        },
    }
</script>

<style lang="scss" scoped></style>