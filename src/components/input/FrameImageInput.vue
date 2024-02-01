<template>
    <v-file-input
        accept="image/*"
        show-size
        :label="this.pLabel || '사진 업로드'"
        :model-value="this.imageFile"
        :rules="[ this.checkMaxFileSize ]"
        @click:clear="onImageClear"
    />
</template>

<script>
    import ValidationUtil from '@/common/util/ValidationUtil.js';
    import BytesUtil from '@/common/util/BytesUtil';
	
    const EventName = {
        EXCEED_MAX_SIZE : 'exceed-max-size',
        SELECT_VALID_IMAGE : 'select-valid-image',
        CLEAR_INPUT : "clear-input",
    } 
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
                                ? this.pMaxBytes : 1 * 1024 * 1024 * 3 / 2; // 1.5mb
                const MAX_BYTES_WITH_UNIT = BytesUtil.withUnit( MAX_BYTES );
                if ( MAX_BYTES < imageFile.size ) {
                    this.$emit( EventName.EXCEED_MAX_SIZE, {
                        imageFile : null,
                        errorMessage : `업로드 최대 크기 ( ${MAX_BYTES_WITH_UNIT} )를 초과하였습니다.`, 
                    });
                    return `업로드 최대 크기 ( ${MAX_BYTES_WITH_UNIT} )를 초과하였습니다.`; // false;             
                }
                // 유효할 경우에만 사진 파일을 emit함
                this.$emit( EventName.SELECT_VALID_IMAGE, {
                    imageFile : imageFile,
                    errorMessage : "", 
                });
                return true;
            },
            onImageClear() {
                this.$emit( EventName.CLEAR_INPUT, {
                    imageFile : null,
                    errorMessage : "", 
                });
            },
        },
    }
</script>

<style lang="scss" scoped></style>