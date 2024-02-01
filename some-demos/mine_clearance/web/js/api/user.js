import { getRequest, postRequest } from '../utils/request.js';
// 使用示例
export const useUserApi =()=>{
  return {
    getUsers:async()=>{
      try {
        const result = await getRequest('/user/users');
        console.log(result);
        return result
      } catch (error) {
        console.error('Error fetching data:', error);
        return error
      }
    },
    getUsersByID:async(userId)=>{
      try {
        const result = await getRequest(`/user/users/${userId}`);
        console.log(result);
        return result
      } catch (error) {
        console.error('Error fetching data:', error);
        return error
      }
    },
    postUsers: async (data) => {
      try {
        const result = await postRequest('/user/users', data);
        console.log(result);
        return result
      } catch (error) {
        console.error('Error posting data:', error);
        return error
      }
    },
  }
}
