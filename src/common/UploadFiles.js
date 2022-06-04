import axios from "./CustomAxios"
const axiosService = axios.createAxiosInstance("/myTeams");

class UploadFiles{
    upload(dto,url){
        let formData = new FormData();
        formData.append("dto",dto);
        return axiosService.post(url,formData,{
            headers: {
                "Content-Type": "multipart/form-data"
            },
        });
    }
}

export default new UploadFiles();