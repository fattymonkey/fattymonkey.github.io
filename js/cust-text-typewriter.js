let footerTypingTimer = null;

function runFooterTypeWriter() {
  if (footerTypingTimer) clearTimeout(footerTypingTimer);
  const textSpan = document.querySelector('.footer-type-text');
  if (!textSpan) return;

  // 原始文本
  const originText = textSpan.textContent.trim();
  textSpan.textContent = '';

  let idx = 0;
  // 配置参数
  const typeSpeed = 150;     // 打字速度，越小越快
  const delSpeed = 60;       // 删除文字速度
  const holdFullText = 2000; // 打完完整文字停留时间 ms
  const holdEmpty = 400;     // 删除完毕短暂停顿再开始下一轮

  // 创建闪烁光标元素，如果不存在就插入
  let cursorEl = textSpan.querySelector('.type-cursor');
  if (!cursorEl) {
    cursorEl = document.createElement('span');
    cursorEl.className = 'type-cursor';
    cursorEl.textContent = '|';
    textSpan.appendChild(cursorEl);
  }

  // 打字阶段：逐字输出
  function typePhase() {
    if (idx < originText.length) {
      // 在光标前面插入新字符
      cursorEl.before(originText[idx]);
      idx++;
      footerTypingTimer = setTimeout(typePhase, typeSpeed);
    } else {
      // 全部打完，等待后进入删除阶段
      footerTypingTimer = setTimeout(deletePhase, holdFullText);
    }
  }

  // 删除阶段：从后往前删文字，不是一次性清空
  function deletePhase() {
    if (idx > 0) {
      idx--;
      // 删除光标前最后一个字符
      textSpan.childNodes[textSpan.childNodes.length - 2].remove();
      footerTypingTimer = setTimeout(deletePhase, delSpeed);
    } else {
      // 删除完成，短暂停顿，开启新一轮打字
      footerTypingTimer = setTimeout(typePhase, holdEmpty);
    }
  }

  typePhase();
}

document.addEventListener('DOMContentLoaded', ()=>{
  setTimeout(runFooterTypeWriter, 120);
});

document.addEventListener('pjax:complete', ()=>{
  setTimeout(runFooterTypeWriter, 120);
});