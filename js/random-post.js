// 全局缓存文章链接数组，页面刷新前永久保存
window.__articleUrls = window.__articleUrls || [];

function goRandom(){
  // 如果缓存里已有数据，直接随机跳转，不用重新拉取归档
  if(window.__articleUrls.length > 0){
    const idx = Math.floor(Math.random() * window.__articleUrls.length);
    location.href = window.__articleUrls[idx];
    return;
  }

  // 缓存为空，自动后台请求归档页面抓取链接，不用手动点开归档
  fetch('/archives')
  .then(res => res.text())
  .then(html => {
    const dom = new DOMParser().parseFromString(html, 'text/html');
    const links = dom.querySelectorAll('.article-sort-item-info a.article-sort-item-title');
    window.__articleUrls = Array.from(links).map(el => el.href);
    if(window.__articleUrls.length === 0){
      alert("未读取到文章");
      return;
    }
    const idx = Math.floor(Math.random() * window.__articleUrls.length);
    location.href = window.__articleUrls[idx];
  })
  .catch(err => {
    alert("获取文章列表失败，请刷新页面");
    console.error(err);
  })
}