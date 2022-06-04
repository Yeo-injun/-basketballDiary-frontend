import axios from "../common/CustomAxios"
const axiosService = axios.createAxiosInstance();

class UploadFiles{
    upload(file,onUploadProgree){
        let formData = new FormData();
        formData.append("file",file);
        return axiosService.post(onUploadProgree,file,{
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
    }
}

export default new UploadFiles();