<template>
        <v-dialog 
            :value="dialog" 
            @input="dialog = $event"
            width="1200">
            <v-card>
                <v-card-title class="text-h5 grey lighten-2">
                    프로필 수정
                </v-card-title>
                
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="4">이름</v-col>
                            <v-col cols="4">
                                <v-text-field v-model="name" outlined clearable>{{name}}</v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="4">소속팀</v-col>
                            <v-col cols="4">
                                <v-text-field v-model="teamName" outlined clearable>{{teamName}}</v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="4">등번호</v-col>
                            <v-col cols="4">
                                <v-text-field v-model="backNumber" outlined clearable>{{backNumber}}</v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>       
                            <v-card-text>
                                <v-file-input
                                show-size
                                label="Select Image"
                                accept="image/*"
                                outlined
                                @change="selectImage"
                                ></v-file-input>    
                            </v-card-text>               
                        </v-row>
                        <v-card-actions>
                            <v-btn position: absolute right bottom v-on:click="updateProfile">수정</v-btn>          
                        </v-card-actions>       
                    </v-container>
                </v-card-text>
            </v-card>
        </v-dialog>
</template>

<script>
import MyTeamApi from '@/api/MyTeamAPI';
// import UploadFile from '@/common/UploadFiles';

export default {
  data: ()=>{
    return {
        name: undefined,
        teamName: undefined,
        backNumber: undefined,
        image: undefined,
    }
  },
  props: {
    pTeamSeq: {
        type: Number,
        required: true
    },
    value: {
        type: Boolean,
        required: true
    }
  },
  computed: {
    dialog: {
        get() {
            return this.value;
        },
        set(value) {
            this.$emit('input', value);
        }
    }
  },
  methods: {
    async load(){
        const response = (await MyTeamApi.findMyTeamsProfile(this.pTeamSeq)).data;
        this.name = response.userName;
        this.teamName = response.teamName;
        this.backNumber = response.backNumber;
        this.image = response.image;
        console.log(response);
    },
    selectImage(image){
        this.image = image;
    },
    async updateProfile(){
        // const headers = "Content-Type: multipart/form-data";
        const formData = new FormData();

        formData.append("backNumber",this.backNumber);
        formData.append("imageFile",this.image);      
        
        try{
            const response = await MyTeamApi.modifyMyTeamsProfile(this.pTeamSeq,formData);
            // const response = await UploadFile.upload(`/myTeams/${this.pTeamSeq}/profile`,formData);
            console.log("response: "+response);
        }catch(error){
            console.log(error);
        }
    }
  },
  mounted () {
    this.load();
  }
}
</script>

<style lang="scss" scoped>

</style>