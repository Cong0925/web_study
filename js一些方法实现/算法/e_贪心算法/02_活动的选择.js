/**
 * 活动选择算法
 * 假设有一组活动，每个活动都有一个开始时间和结束时间。
 * 我们的目标是选择尽可能多的活动，使得它们之间不会发生时间上的重叠。
 * 我们可以使用贪心算法来解决这个问题，具体步骤如下：
 * 
 * @param activities 活动列表，每个活动为一个对象，包含开始时间和结束时间，形如 {start: number, end: number}
 * @returns 返回选择后的活动列表
 */
function activitySelection(activities) {
  // 按结束时间排序
  activities.sort((a, b) => a.end - b.end);

  // 选择第一个活动
  const selectedActivities = [activities[0]];
  // 记录上一个被选中的活动
  let lastSelected = activities[0];

  for (let i = 1; i < activities.length; i++) {
    // 如果活动的开始时间晚于上一个被选中的活动的结束时间，则选择该活动
    if (activities[i].start >= lastSelected.end) {
      // 选择该活动
      selectedActivities.push(activities[i]);
      // 更新上一个被选中的活动
      lastSelected = activities[i];
    }
  }

  return selectedActivities;
}

// 示例活动数据
const activities = [
  { start: 1, end: 4 },
  { start: 3, end: 5 },
  { start: 0, end: 6 },
  { start: 5, end: 7 },
  { start: 3, end: 8 },
  { start: 5, end: 9 },
  { start: 6, end: 10 },
  { start: 8, end: 11 },
  { start: 8, end: 12 },
  { start: 2, end: 13 },
  { start: 12, end: 14 },
];

console.log(activitySelection(activities));
