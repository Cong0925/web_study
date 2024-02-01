import { getRequest, postRequest } from '../utils/request.js';
// 使用示例
export const getViews =()=>{
  return {
    getBeginnerRanking:async(params)=>{
      try {
        const result = await getRequest('/views/beginner-rankings',params);
        console.log(result);
        return result
      } catch (error) {
        console.error('Error fetching data:', error);
        return error
      }
    },
    getBeginnerRankingByUserId:async(userID,params)=>{
      try {
        const result = await getRequest(`/views/beginner-rankings/${userID}`,params);
        console.log(result);
        return result
      } catch (error) {
        console.error('Error fetching data:', error);
        return error
      }
    },
    getIntermediateRanking:async(params)=>{
      try {
        const result = await getRequest('/views/intermediate-rankings',params);
        console.log(result);
        return result
      } catch (error) {
        console.error('Error fetching data:', error);
        return error
      }
    },
    getIntermediateRankingByUserId:async(userID,params)=>{
      try {
        const result = await getRequest(`/views/intermediate-rankings/${userID}`,params);
        console.log(result);
        return result
      } catch (error) {
        console.error('Error fetching data:', error);
        return error
      }
    },
    getAdvancedRanking:async(params)=>{
      try {
        const result = await getRequest('/views/advanced-rankings',params);
        console.log(result);
        return result
      } catch (error) {
        console.error('Error fetching data:', error);
        return error
      }
    },
    getAdvancedRankingByUserId:async(userID,params)=>{
      try {
        const result = await getRequest(`/views/advanced-rankings/${userID}`,params);
        console.log(result);
        return result
      } catch (error) {
        console.error('Error fetching data:', error);
        return error
      }
    },
  }
}
