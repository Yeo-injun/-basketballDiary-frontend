import axios from '../http/CustomAxios';
const axiosService = axios.createAxiosInstance('');

class UploadFiles {
	upload(url, formData) {
		return axiosService.post(url, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
	}
}

export default new UploadFiles();
