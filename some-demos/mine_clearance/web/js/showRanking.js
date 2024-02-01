// import { fetchData } from './api/user.js'
import { getViews } from './api/rankingViews.js'

let getRankingParams = {
  Page: 1,          // 当前页
  Size: 10,         // 每页显示的项数
  totalCount: 0,    // 总项数
};
let totalPages = Math.ceil(getRankingParams.totalCount / getRankingParams.Size); // 总页数
let rankingDifficulty = '初级'
document.addEventListener('DOMContentLoaded', function () {
  // 获取所有按钮
  const buttons = document.querySelectorAll('.ranking-select');

  let myBestRanking = document.getElementById('my-best-ranking')
  // 监听点击事件,隐藏排行榜  获取所有具有 'ranking-close' 类名的元素
  const closeButtons = document.getElementsByClassName('ranking-close');

  // 获取要添加分页器和内容的元素
  const paginationContainer = document.getElementById("pagination");
  const contentContainer = document.getElementById("rankingContent");
  const currentPageElement = document.getElementById("currentPage");
  const totalPagesElement = document.getElementById("totalPages");

  // 初始化分页器
  function initPagination(params) {
    getRankingParams.Page = params.Page
    currentPageElement.textContent = getRankingParams.Page;
    totalPagesElement.textContent = totalPages;
    updatePaginationStyle()
  }
  // 检查排行榜提示
  const checkRankingTip = async (params, text, getRanking, getRankingByID) => {
    let tableTitle = document.getElementById('ranking-table-title');
    let data = await getRanking(params);
    tableTitle.innerHTML = text;
    if (data.data) {
      getRankingParams.totalCount = data.totalCount
      totalPages = Math.ceil(getRankingParams.totalCount / getRankingParams.Size);
      initPagination(params)
      let UserRank;
      if (params.Page === 1) {
        if (localStorage.getItem('user')) {
          try {
            let ranking = await getRankingByID(localStorage.getItem('userID'), params);
            if (ranking.data.length > 0) {
              UserRank = ranking.data[0].UserRank
              myBestRanking.innerHTML =
                ` <span style="color: red;">${ranking.data[0].Username}</span> 最高记录：第 
              <span style="color: red;">${ranking.data[0].UserRank}</span> 名，用时： 
              <span style="color: red;">${ranking.data[0].ChallengeTime}</span> S`;
            } else {
              myBestRanking.innerHTML = `用户 还未上传过成绩`;
            }
          } catch (error) {
            console.error("Error fetching ranking:", error);
            myBestRanking.innerHTML = `发生错误，请稍后重试`;
          }
        } else {
          myBestRanking.innerHTML = `用户 还未上传过成绩`;
        }
      }
      showContent(data.data, UserRank);

    } else {
      document.getElementById('ranking-content').innerHTML = '未知错误';
    }
  };

  // 显示指定页的内容
  const showPage = () => {
    updatePaginationStyle()
    let params = {
      Page: getRankingParams.Page,
      Size: getRankingParams.Size
    }
    console.log(params, rankingDifficulty);

    if (rankingDifficulty === '初级') {
      checkRankingTip(params, '难度：初级', getViews().getBeginnerRanking, getViews().getBeginnerRankingByUserId)

    } else if (rankingDifficulty === '中级') {
      checkRankingTip(params, '难度：中级', getViews().getIntermediateRanking, getViews().getIntermediateRankingByUserId)

    } else if (rankingDifficulty === '高级') {
      checkRankingTip(params, '难度：高级', getViews().getAdvancedRanking, getViews().getAdvancedRankingByUserId)

    }

  }

  // 更新分页器的样式，例如禁用上一页和下一页按钮
  function updatePaginationStyle() {
    const prevButton = document.getElementById('prevPage')
    const nextButton = document.getElementById('nextPage')

    prevButton.disabled = getRankingParams.Page === 1;
    nextButton.disabled = getRankingParams.Page === totalPages;
  }

  // 上一页
  function prevPage() {
    if (getRankingParams.Page > 1) {
      getRankingParams.Page--;
      currentPageElement.textContent = getRankingParams.Page;
      showPage();
    }
  }

  // 下一页
  function nextPage() {
    if (getRankingParams.Page < totalPages) {
      getRankingParams.Page++;
      currentPageElement.textContent = getRankingParams.Page;
      showPage();
    }
  }

  // 跳转到指定页
  function gotoPage(pageNumber) {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      getRankingParams.Page = pageNumber;
      currentPageElement.textContent = getRankingParams.Page;
    } else if (pageNumber < 1) {
      getRankingParams.Page = 1
      currentPageElement.textContent = 1
    } else if (pageNumber > totalPages) {
      getRankingParams.Page = totalPages
      currentPageElement.textContent = totalPages
    }
    showPage();
  }

  // 分页按钮事件添加
  document.getElementById('goFirstPage').addEventListener('click', (event) => {
    gotoPage(1)
  });
  document.getElementById('prevPage').addEventListener('click', (event) => {
    prevPage()
  });
  document.getElementById('nextPage').addEventListener('click', (event) => {
    nextPage()
  });
  document.getElementById('goLastPage').addEventListener('click', (event) => {
    gotoPage(totalPages)
  });

  // 给每个按钮添加点击事件
  buttons.forEach(function (button) {
    button.addEventListener('click', async function () {
      // 获取按钮的 difficulty 类型
      const difficulty = button.getAttribute('data-difficulty');
      let params = {
        Page: 1,
        Size: 10
      }
      // 执行不同的函数
      switch (difficulty) {
        case 'beginner':
          rankingDifficulty = '初级'
          checkRankingTip(params, '难度：初级', getViews().getBeginnerRanking, getViews().getBeginnerRankingByUserId)
          break;
        case 'intermediate':
          rankingDifficulty = '中级'
          checkRankingTip(params, '难度：中级', getViews().getIntermediateRanking, getViews().getIntermediateRankingByUserId)
          break;
        case 'advanced':
          rankingDifficulty = '高级'
          checkRankingTip(params, '难度：高级', getViews().getAdvancedRanking, getViews().getAdvancedRankingByUserId)
          break;
        default:
          console.error('Invalid difficulty type');
      }
    });
  });


  // 监听点击事件,显示排行榜
  document.getElementById('showRanking').addEventListener('click', (event) => {
    event.preventDefault(); // 阻止默认链接跳转行为
    showRanking(); // 调用 fetchData 函数
  });

  // 为每个元素添加事件监听器
  Array.from(closeButtons).forEach(button => {
    button.addEventListener('click', (event) => {
      event.preventDefault(); // 阻止默认按钮行为
      closeRanking(); // 调用关闭排行榜的函数
    });
  });

  // 显示排行榜
  const showRanking = async () => {
    let popup = document.getElementById("ranking-box");
    popup.style.display = "block";
    let params = {
      Page: 1,
      Size: 10
    }
    checkRankingTip(params, '难度：初级', getViews().getBeginnerRanking, getViews().getBeginnerRankingByUserId)
  };

  // 关闭排行榜
  const closeRanking = () => {
    let popup = document.getElementById("ranking-box");
    popup.style.display = "none";
  };

  // 显示排行榜内容
  const showContent = async (data, UserRank) => {
    // 获取表格元素
    const table = document.getElementById('ranking-content');

    if (!table) {
      console.error('Content div not found');
      return;
    }

    // 获取表格主体部分
    const tbody = table.querySelector('tbody');
    tbody.innerHTML = '';


    // 遍历数据数组，动态添加表格内容
    data.forEach((item, index) => {
      const row = document.createElement('tr');
      const cell1 = document.createElement('td');
      const cell2 = document.createElement('td');
      const cell3 = document.createElement('td');
      cell1.textContent = item.UserRank;
      cell2.textContent = item.Username;
      cell3.textContent = item.ChallengeTime;
      row.appendChild(cell1);
      row.appendChild(cell2);
      row.appendChild(cell3);
      // 如果UserRank等于mark，则将整行文本颜色设置为红色
      if (item.UserRank === UserRank) {
        row.style.color = 'red';
      }
      tbody.appendChild(row);
    });
    console.log(data.length);
    if (data.length !== 10) {
      document.getElementById('rankingContent').style.marginTop = 10 + (10 - data.length) * 39 + 'px'
    } else {
      document.getElementById('rankingContent').style.marginTop = 10 + 'px'
    }
  };


});
