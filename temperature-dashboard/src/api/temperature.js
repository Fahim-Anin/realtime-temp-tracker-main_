import AxiosInstance from "../Components/AxiosInstance";


export const fetchTemperature = async () => {
    try {
        const response = await AxiosInstance.get('temperature/');
        return response.data;
    } catch (error) {
        if (error.response?.status === 429) {
            alert('Too many requests! Please wait...');
        }
        throw error;
    }
};
