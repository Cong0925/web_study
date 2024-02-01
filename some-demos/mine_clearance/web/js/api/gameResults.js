import { getRequest, postRequest } from '../utils/request.js';
// 使用示例
export const useGameResultsApi =()=>{
  return {
    getGameResults:async()=>{
      try {
        const result = await getRequest('/gameResult/gameResults');
        console.log(result);
        return result
      } catch (error) {
        console.error('Error fetching data:', error);
        return error
      }
    },
    getGameResultByID:async(userId)=>{
      try {
        const result = await getRequest(`/gameResult/gameResults/${userId}`);
        console.log(result);
        return result
      } catch (error) {
        console.error('Error fetching data:', error);
        return error
      }
    },
    postGameResult: async (data) => {
      try {
        const result = await postRequest('/gameResult/gameResults', data);
        console.log(result);
        return result
      } catch (error) {
        console.error('Error posting data:', error);
        return error
      }
    },
    postBeginnerRanking:async(data)=>{
      try {
        const result = await postRequest('/beginnerRanking/beginnerRankings', data);
        console.log(result);
        return result
      } catch (error) {
        console.error('Error posting data:', error);
        return error
      }
    },
    postIntermediateRanking:async(data)=>{
      try {
        const result = await postRequest('/intermediateRanking/intermediateRankings', data);
        console.log(result);
        return result
      } catch (error) {
        console.error('Error posting data:', error);
        return error
      }
    },
    postAdvancedRanking:async(data)=>{
      try {
        const result = await postRequest('/advancedRanking/advancedRankings', data);
        console.log(result);
        return result
      } catch (error) {
        console.error('Error posting data:', error);
        return error
      }
    },
  }
}