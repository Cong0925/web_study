window.addEventListener("mousedown", function (e) {
  console.log(e.clientX,e.clientY);
})

document.addEventListener("DOMContentLoaded", function() {
  let isDragging = false;
  let offsetX, offsetY;

  // 获取弹窗元素
  const difficultySellectPopup = document.getElementById("difficulty-sellect-popup");
  const tipPopup = document.getElementById("popup");


  // 获取弹窗头部元素
  const difficultySellectPopupHeader = document.getElementById("difficulty-sellect-popup-header");
  const tipPopupHeader = document.getElementById("popup-header");


  // 鼠标按下时的事件处理程序
  difficultySellectPopupHeader.addEventListener("mousedown", function (e) {
    isDragging = true;

     // 记录鼠标按下时相对于整个弹窗的偏移量
     offsetX = e.clientX - difficultySellectPopup.getBoundingClientRect().left;
     offsetY = e.clientY - difficultySellectPopup.getBoundingClientRect().top;

  });

  // 鼠标移动时的事件处理程序
  document.addEventListener("mousemove", function (e) {
    if (isDragging) {
      console.log(e.clientX,e.clientY,difficultySellectPopup.getBoundingClientRect().left,difficultySellectPopup.getBoundingClientRect().top,offsetX,offsetY);
      // 更新弹窗的位置
      difficultySellectPopup.style.left = e.clientX - offsetX + "px";
      difficultySellectPopup.style.top = e.clientY - offsetY + "px";
    }
  });

  // 鼠标松开时的事件处理程序
  document.addEventListener("mouseup", function () {
    isDragging = false;

  });
});