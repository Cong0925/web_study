import { useUserApi } from './api/user.js'
import { useGameResultsApi } from './api/gameResults.js'

let game_difficulty = 'easy' //默认难度

// 简单难度
let easy_parmas = {
  rows: 10,
  cols: 10,
  totalMines: 20,
}
// 中等难度
let intermediate_parmas = {
  rows: 30,
  cols: 30,
  totalMines: 200,
}
// 困难难度
let difficult_parmas = {
  rows: 50,
  cols: 50,
  totalMines: 300,
}

// 游戏难度设置
let game_parmas = easy_parmas
// let game_parmas = {
//   rows: 20,
//   cols: 10,
//   totalMines: 5,
// }

// 游戏区域元素
let boardElement
// 初始化被右键标记的元素数量为0
let markedCount = 0;
// 在全局定义一个数组，用于存储地雷的位置
let allMineLocations = [];

// 计时器
let timerInterval = null;
// 开始计时时间
let startTime;
// 计时器 秒数/毫秒数
let elapsedSeconds = 0;
let milliseconds = 0;

// 记录每次切换模式的时间
let lastClickTime = 0;

// 切换游戏难度
function selectDifficulty(gameDifficulty, event) {
  if (timerInterval) {
    // 如果计时器正在运行，停止计时
    stopTimer();
  }
  const currentTime = new Date().getTime();
  // 计算时间差
  const timeDiff = currentTime - lastClickTime;

  // 设置时间间隔，例如 1000 毫秒（1秒）
  const clickInterval = 100;

  // 在合理的时间间隔内点击，执行相应的动作
  if (timeDiff > clickInterval) {
    // 游戏模式赋值
    if (gameDifficulty === 'easy') {
      game_parmas = easy_parmas
      game_difficulty = '初级'
    } else if (gameDifficulty === 'intermediate') {
      game_parmas = intermediate_parmas
      game_difficulty = '中级'
    } else if (gameDifficulty === 'difficult') {
      game_parmas = difficult_parmas
      game_difficulty = '高级'
    } else if (gameDifficulty === 'mySetting') {
      openDifficultySellectPopup()
      game_difficulty = '自定义'
    }
    // 删除上一个模式的内容
    while (boardElement.firstChild) {
      boardElement.removeChild(boardElement.firstChild);
    }

    // 初始化游戏
    initializeBoard()

    // 记录当前点击时间
    lastClickTime = currentTime;
  } else {
    // 短时间内连续点击，不执行动作
    console.log('你切换的太快了呦');
  }

  // 阻止事件继续冒泡和默认行为
  event.stopPropagation();
  event.preventDefault();
}

function updateColumnCount(newColumnCount) {
  var board = document.querySelector('.board');
}

// 初始化游戏
function initializeBoard() {

  // 清空记录所有地雷位置的数组
  allMineLocations = [];
  // 清空所有标记
  markedCount = 0

  // 获取游戏区域元素
  boardElement = document.getElementById('board');
  // 设置grid的行列
  boardElement.style.gridTemplateColumns = `repeat(${game_parmas.cols}, 30px)`;

  // 文字显示 提示信息
  document.getElementById('totalMines').textContent = `总地雷数：${game_parmas.totalMines}`;
  document.getElementById('residueMines').textContent = `剩余地雷数：${game_parmas.totalMines}`;
  document.getElementById('time').textContent = '时间：0';

  // 循环生成每个游戏格子，并添加响应事件
  for (let i = 0; i < game_parmas.rows; i++) {
    for (let j = 0; j < game_parmas.cols; j++) {
      // 在游戏区域创建 cell块
      const cell = document.createElement('div');
      // 给cell块添加类名
      cell.classList.add('cell', 'cell-action');
      // 给cell块记录它的坐标
      cell.dataset.row = i;
      cell.dataset.col = j;
      // 添加点击事件
      cell.addEventListener('click', cellClick);
      // 添加右键点击事件监听器
      cell.addEventListener('contextmenu', function (e) {
        e.preventDefault(); // 阻止默认右键菜单
        toggleRightClickEffect(cell);
      });
      // 将生成的cell添加到游戏区域
      boardElement.appendChild(cell);
    }
  }
  // 生成地雷
  generateMines();
}

// 每个格子的右键标记事件
function toggleRightClickEffect(cell) {
  // 检查是否已经添加了特定类名
  const hasClass = cell.classList.contains('icon-hongqi');

  if (!hasClass) {
    // 如果没有类名，检查是否已经达到最大允许的被右键标记数量
    if (markedCount < game_parmas.totalMines) {
      // 添加类名并阻止左键点击效果
      cell.classList.add('iconfont', 'icon-hongqi');
      cell.removeEventListener('click', cellClick);
      markedCount++;

      // 更新剩余地雷数的显示
      document.getElementById('residueMines').textContent = `剩余地雷数：${game_parmas.totalMines - markedCount}`;

      // 检查胜利条件
      // 检查是否所有地雷都被标记
      const allMinesMarked = allMineLocations.every(location => {
        const cell = document.querySelector(`.cell[data-row="${location.row}"][data-col="${location.col}"]`);
        return cell && cell.classList.contains('icon-hongqi');
      });

      // 异步显示
      setTimeout(() => {
        if (allMinesMarked) {
          openPopup('success')
        }
      }, 10)
    }
  } else {
    // 如果已经有类名，移除类名并恢复左键点击效果
    cell.classList.remove('iconfont', 'icon-hongqi');
    cell.addEventListener('click', cellClick);
    markedCount--;

    // 更新剩余地雷数的显示
    document.getElementById('residueMines').textContent = `剩余地雷数：${game_parmas.totalMines - markedCount}`;
  }
}

// 生成地雷
function generateMines() {
  allMineLocations = []; // 重置所有地雷的位置数组
  for (let i = 0; i < game_parmas.totalMines; i++) {
    let row, col;
    do {
      row = Math.floor(Math.random() * game_parmas.rows);
      col = Math.floor(Math.random() * game_parmas.cols);
    } while (allMineLocations.some(location => location.row === row && location.col === col));

    allMineLocations.push({ row, col }); // 记录所有地雷的位置
  }
  console.log(allMineLocations)
}


//点击事件
function cellClick(event) {
  if (!timerInterval) {
    // 如果计时器未运行，开始计时
    startTimer();
  }

  const clickedCell = event.target;
  const row = parseInt(clickedCell.dataset.row);
  const col = parseInt(clickedCell.dataset.col);

  if (allMineLocations.some(location => location.row === row && location.col === col)) {
    // 游戏结束 - 点击到地雷
    // 在游戏重置时，为所有地雷位置的单元格添加类名
    allMineLocations.forEach(location => {
      const cell = document.querySelector(`.cell[data-row="${location.row}"][data-col="${location.col}"]`);
      if (cell && !cell.classList.contains('icon-hongqi')) {
        cell.classList.add('iconfont', 'icon-dilei');
      }
    });
    // 异步显示
    setTimeout(() => {
      openPopup('false')
    }, 0);
  } else {
    // 获取当前单元格的相邻地雷数量
    const adjacentMines = countAdjacentMines(row, col);
    if (adjacentMines > 0) {
      clickedCell.textContent = adjacentMines;
    } else {
      // 如果没有相邻的地雷，递归地揭示相邻的单元格
      revealEmptyCells(row, col, clickedCell);
    }
    // 更改点击的格子颜色
    clickedCell.classList.remove('cell-action');

    // 检查胜利条件
    const revealedCells = document.querySelectorAll('.cell-action').length;
    // console.log(revealedCells, game_parmas.totalMines);
    // 异步显示
    setTimeout(() => {
      if (revealedCells === game_parmas.totalMines) {
        openPopup('success')
      }
    }, 0);
  }
  // 当单元格被点击之后，移除它所有的事件
  removeAllEventListeners(clickedCell);
}


// 移除元素的所有事件监听器
function removeAllEventListeners(element) {
  const clone = element.cloneNode(true);
  element.replaceWith(clone);
}

// 如果没有相邻的地雷，递归地揭示相邻的单元格
function revealEmptyCells(row, col, clickedCell) {
  // 已揭示的单元格标记
  const revealedCells = new Set();

  // 递归函数，用于揭示相邻的空白单元格
  function recursiveReveal(r, c) {
    // 检查是否在边界内
    if (r < 0 || r >= game_parmas.rows || c < 0 || c >= game_parmas.cols) {
      return;
    }

    // 生成当前单元格的唯一标识
    const cellKey = `${r}-${c}`;

    // 检查是否已经揭示过该单元格
    if (revealedCells.has(cellKey)) {
      return;
    }

    // 将当前单元格标记为已揭示
    revealedCells.add(cellKey);

    // 获取当前单元格的相邻地雷数量
    const adjacentMines = countAdjacentMines(r, c);

    // 如果相邻地雷数量为0，则揭示相邻单元格
    if (adjacentMines === 0) {
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          recursiveReveal(r + i, c + j);
        }
      }
    }

    // 在界面上显示相邻地雷数量
    const cell = document.querySelector(`.cell[data-row="${r}"][data-col="${c}"]`);
    cell.textContent = adjacentMines;
    cell.classList.remove('cell-action'); // 移除 'cell-action' 类

    // 如果当前单元格有红旗类名且不是地雷，移除红旗
    if (cell.classList.contains('icon-hongqi') && !allMineLocations.some(location => location.row === r && location.col === c)) {
      cell.classList.remove('iconfont', 'icon-hongqi');
      markedCount--;
    }
    // 更新剩余地雷数的显示
    document.getElementById('residueMines').textContent = `剩余地雷数：${game_parmas.totalMines - markedCount}`;
    // 移除事件监听器
    removeAllEventListeners(cell);
  }
  // 调用递归函数开始揭示
  recursiveReveal(row, col);
}

// 计算当前点击格子周围是否有地雷
function countAdjacentMines(row, col) {
  let count = 0;

  // 相邻的八个方向
  const directions = [
    { row: -1, col: -1 },
    { row: -1, col: 0 },
    { row: -1, col: 1 },
    { row: 0, col: -1 },
    { row: 0, col: 1 },
    { row: 1, col: -1 },
    { row: 1, col: 0 },
    { row: 1, col: 1 }
  ];

  directions.forEach(direction => {
    const newRow = row + direction.row;
    const newCol = col + direction.col;

    // 检查是否在边界内
    if (newRow >= 0 && newRow < game_parmas.rows && newCol >= 0 && newCol < game_parmas.cols) {
      // 检查相邻单元格是否有地雷
      if (allMineLocations.some(location => location.row === newRow && location.col === newCol)) {
        count++;
      }
    }
  });

  return count;
}

// 重置
function resetGame() {
  allMineLocations = [];
  boardElement.innerHTML = '';
  initializeBoard();
}

// 开始计时
function startTimer() {
  startTime = Date.now();  // 记录开始时间
  timerInterval = setInterval(updateTime, 10);
}
// 停止计时
function stopTimer() {
  elapsedSeconds = 0
  milliseconds == 0
  clearInterval(timerInterval);
  timerInterval = null; // 设置为 null 表示计时器已停止
}
// 显示计时
function updateTime() {
  const currentTime = Date.now();
  const elapsedMilliseconds = currentTime - startTime;
  elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
  milliseconds = elapsedMilliseconds % 1000;
  document.getElementById('time').textContent = `时间：${elapsedSeconds}.${milliseconds} s`;
}

let scoreDate = {
  userID: localStorage.getItem('userID') | '',
  challengeTime: '',
  difficulty: game_difficulty === 'easy' ? '初级' : ''
}
// 显示提示信息弹窗
function openPopup(type) {

  // 获取遮罩层和弹窗元素
  var overlay = document.getElementById("overlay");
  var popup = document.getElementById("popup");

  // 显示遮罩层和弹窗
  overlay.style.display = "block";
  popup.style.display = "block";

  if (type === 'success') {
    scoreDate.challengeTime = `${elapsedSeconds}.${milliseconds} `
    document.getElementById('popupTitle').innerHTML = '胜利！'
    document.getElementById('popup-tip-content').innerHTML = '恭喜成功！' + '用时：' + `${elapsedSeconds}.${milliseconds} s`

    if (game_difficulty === '自定义') {
      document.getElementById('submitScore').style.display = "none";
    } else {
      document.getElementById('submitScore').style.display = "block";
      scoreDate.difficulty = game_difficulty
      markUser()
    }
  } else if (type === 'false') {
    document.getElementById('popupTitle').innerHTML = '失败！'
    document.getElementById('popup-tip-content').innerHTML = '很遗憾，你失败了！' + '用时：' + `${elapsedSeconds}.${milliseconds} s`
    document.getElementById('submitScore').style.display = "none";
  }
  // 如果计时器正在运行，停止计时
  stopTimer();
}
let inputUsername;
let contentDiv;
let textInfo;
const markUser = () => {
  contentDiv = document.getElementById('popup-content')
  if (localStorage.getItem('user')) {
    // 添加文字信息
    textInfo = document.createElement('p');
    textInfo.textContent = `${localStorage.getItem('user')} 是否上传本次成绩？`
    contentDiv.appendChild(textInfo);
  } else {
    // 添加文字信息
    textInfo = document.createElement('p');
    textInfo.textContent = '请输入您的用户名用于进入排行榜';
    contentDiv.appendChild(textInfo);

    // 添加输入框
    inputUsername = document.createElement('input');
    inputUsername.type = 'text';
    inputUsername.placeholder = '请输入用户名';
    contentDiv.appendChild(inputUsername);
  }
}


const submitScore = async () => {
  let enteredUsername;
  let postUsersRes;
  let postGameResultRes;
  let postDifficultyRes;
  // 获取输入的用户名
  if (contentDiv.contains(inputUsername)) {
    enteredUsername = inputUsername.value;
    localStorage.setItem('user', enteredUsername)
    let data = {
      username: enteredUsername,
      IPAddress: ''
    }
    postUsersRes = await useUserApi().postUsers(data)
    localStorage.setItem('userID', postUsersRes.data.UserID)
    scoreDate.userID = postUsersRes.data.UserID
  } else {
    enteredUsername = localStorage.getItem('user')
    console.log(scoreDate);
  }
  postGameResultRes = await useGameResultsApi().postGameResult(scoreDate)
  console.log(postGameResultRes.data[0].ResultID);
  let postDifficultyParams = {
    resultID: postGameResultRes.data[0].ResultID
  }

  if (game_difficulty === '初级' || game_difficulty === 'easy') {
    postDifficultyRes = await useGameResultsApi().postBeginnerRanking(postDifficultyParams)
  } else if (game_difficulty === '中级' || game_difficulty === 'intermediate') {
    postDifficultyRes = await useGameResultsApi().postIntermediateRanking(postDifficultyParams)
  } else if (game_difficulty === '高级' || game_difficulty === 'difficult') {
    postDifficultyRes = await useGameResultsApi().postAdvancedRanking(postDifficultyParams)
  }
  console.log(postDifficultyRes);



  closePopup()
}

// 关闭提示信息弹窗
function closePopup() {
  // 获取遮罩层和弹窗元素
  var overlay = document.getElementById("overlay");
  var popup = document.getElementById("popup");

  // 隐藏遮罩层和弹窗
  overlay.style.display = "none";
  popup.style.display = "none";

  if (contentDiv) {
    if (contentDiv.contains(textInfo)) {
      contentDiv.removeChild(textInfo);
      if (contentDiv.contains(inputUsername)) {
        contentDiv.removeChild(inputUsername);
      }
    }
  }

  resetGame();
}

// 显示自定义扫雷弹窗
function openDifficultySellectPopup() {
  let overlay = document.getElementById("overlay");
  let popup = document.getElementById("difficulty-sellect-popup");
  overlay.style.display = "block";
  popup.style.display = "block";
}

// 隐藏自定义扫雷弹窗
function closeDifficultySellectPopup() {
  var overlay = document.getElementById("overlay");
  overlay.style.display = "none";
  let popup = document.getElementById("difficulty-sellect-popup");
  popup.style.display = "none";
  document.getElementById("rows").value = null;
  document.getElementById("columns").value = null;
  document.getElementById("mines").value = null;
}

// 获取 自定义扫雷弹窗 输入的值
function confirmDifficultySellectPopup() {
  let rows = document.getElementById("rows").value;
  let columns = document.getElementById("columns").value;
  let mines = document.getElementById("mines").value;
  if (rows && columns) {
    game_parmas.rows = Number(rows)
    game_parmas.cols = Number(columns)

    game_parmas.totalMines = mines ? Number(mines) : (rows * columns * 0.2 >= 1 ? rows * columns * 0.2 : 1)
  } else {
    game_parmas = easy_parmas
  }
  // 删除上一个模式的内容
  while (boardElement.firstChild) {
    boardElement.removeChild(boardElement.firstChild);
  }
  initializeBoard();

  // 隐藏弹窗
  closeDifficultySellectPopup();
}


// 初始化
document.addEventListener('DOMContentLoaded', function () {

  // 添加事件监听器
  document.getElementById('closeDifficultySellectPopup').addEventListener('click', closeDifficultySellectPopup);
  document.getElementById('confirmDifficultySellectPopup').addEventListener('click', confirmDifficultySellectPopup);
  document.getElementById('difficulty-sellect-close').addEventListener('click', closeDifficultySellectPopup);
  document.querySelectorAll('.popup-close').forEach(function (button) {
    button.addEventListener('click', closePopup);
  });
  document.getElementById('submitScore').addEventListener('click', submitScore);

  // 获取所有按钮
  const buttons = document.querySelectorAll('.difficulty-selection-btn');

  // 给每个按钮添加点击事件
  buttons.forEach(function (button) {
    button.addEventListener('click', async function () {
      // 获取按钮的 difficulty 类型
      const difficulty = button.getAttribute('data-difficulty');
      selectDifficulty(difficulty, event)
    });
  });

  initializeBoard();
});