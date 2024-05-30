<template>
    <v-row>

        <v-col cols="1"> {{ this.pLabel }} </v-col>
        <v-col>
            <v-radio-group v-model="model" row>
                <div v-for="radio in pRadioList" :key="radio.label">
                    <v-radio 
                        :label="radio.label"
                        :value="radio.value">
                    </v-radio>
                </div>
            </v-radio-group>
        </v-col>
    </v-row>

</template>

<script>
    /** Backend API */
    /** Code */
    /** Utils */
    import ValidationUtil from '@/common/util/ValidationUtil';
    /** Components */
    /** Emit Event */

	export default {
        props : {
            pLabel      : String    ,   // input의 Label명칭
            pData       : String    ,   // input의 초기화 데이터
            pRequired   : Boolean   ,   // input 입력값의 필수여부 ( 입력 정책 추가 및 별도 표시용 )
            pArrangeType : {
                type    : String,
                default : "row",
            },
            pRadioList : {
                type : Array,
                required : true,
            },
        },
        data() {
            return {
                model : ValidationUtil.isNotNull( this.pData ) ? this.pData : "",
            }
        },
        methods: {
            getSelected() {
                return this.model;
            },
            checkValue() {
                if ( !this.pRequired ) {
                    return true;
                }
                if ( ValidationUtil.isNull( this.model ) ) {
                    return "라디오는 필수 선택값입니다.";
                }
                return true;
            }
        },
    }

</script>

<style>
</style>



