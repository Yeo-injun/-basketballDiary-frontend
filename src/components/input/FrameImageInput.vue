<template>
    <v-file-input
        accept="image/*"
        show-size
        :label="this.pLabel || '사진 업로드'"
        :v-model="imageFile"
        :rules="[ this.checkValidImageInput ]"
        @click:clear="this.clearImageInput"
    />
</template>

<script>
    import ValidationUtil from '@/common/util/ValidationUtil.js';
    import BytesUtil from '@/common/util/BytesUtil';
	
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
            getImage() {
                return this.imageFile;
            },
            checkValidImageInput( imageFile ) {
                if ( null == imageFile ) { // ValidationUtil 내부에서 File객체의 key갯수를 파악하지 못하는 오류가 존재해서 null 비교로 처리
                    this.clearImageInput();
                    return true;
                }

                const maxSizeCheckResult = this.checkMaxSize( imageFile );
                if ( ValidationUtil.isNotNull( maxSizeCheckResult ) ) {
                    this.clearImageInput();
                    this.$emit( 'violation', {
                        data : "",
                        message : maxSizeCheckResult,
                    } );
                    return maxSizeCheckResult;
                }

                this.imageFile = imageFile;
                return true;
            },
            checkMaxSize( imageFile ) {
                const MAX_BYTES = ValidationUtil.isNotNull( this.pMaxBytes ) 
                                ? this.pMaxBytes : 1 * 1024 * 1024 * 3 / 2; // 1.5mb
                const MAX_BYTES_WITH_UNIT = BytesUtil.withUnit( MAX_BYTES );
                if ( MAX_BYTES < imageFile.size ) {
                    return `업로드 최대 크기 ( ${MAX_BYTES_WITH_UNIT} )를 초과하였습니다.`;
                }
                return "";
            },
            clearImageInput() {
                this.imageFile = null;
                this.$emit( 'clear-input' );
            },
        },
    }
</script>

<style lang="scss" scoped></style>