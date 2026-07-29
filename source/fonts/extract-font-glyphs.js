const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

// 生成的静态页面根目录
const publicDir = path.resolve(__dirname, '../../public');
// 输出：全站去重字符清单
const charOutputFile = path.join(__dirname, 'all-font-glyphs.txt');

let allRawText = '';

// 递归遍历读取所有html页面文字
function scanAllHtml(dirPath) {
  const fileList = fs.readdirSync(dirPath);
  fileList.forEach(fileName => {
    const fullFilePath = path.join(dirPath, fileName);
    const stat = fs.statSync(fullFilePath);
    // 递归进入子文件夹
    if (stat.isDirectory()) {
      scanAllHtml(fullFilePath);
      return;
    }
    // 只处理html后缀文件
    if (!fileName.endsWith('.html')) return;
    try {
      const htmlContent = fs.readFileSync(fullFilePath, 'utf8');
      const $ = cheerio.load(htmlContent, {
        decodeEntities: false,
        scriptingEnabled: false
      });
      // 移除不需要的区块，避免抓取脚本、样式、代码
      $('script, style, noscript, template, pre, figure.highlight').remove();

      // 页面正文
      allRawText += $('body').text();
      // 追加 alt title aria-label 文字
      $('[alt]').each((_, el) => allRawText += $(el).attr('alt') || '');
      $('[title]').each((_, el) => allRawText += $(el).attr('title') || '');
      $('[aria-label]').each((_, el) => allRawText += $(el).attr('aria-label') || '');
    } catch (err) {
      console.warn(`文件解析跳过：${fullFilePath}，错误：${err.message}`);
    }
  });
}

// 执行全站扫描
scanAllHtml(publicDir);

// 只保留中文字符【重要！你原版脚本缺少这一步，混杂大量符号英文】
const chineseReg = /[\u4e00-\u9fa5]/g;
const onlyChineseList = allRawText.match(chineseReg) || [];

// 字符去重
const uniqueCharSet = new Set(onlyChineseList);
const uniqueCharString = [...uniqueCharSet].sort().join('');

// 自动创建目录，解决文件夹不存在报错
fs.mkdirSync(path.dirname(charOutputFile), { recursive: true });
fs.writeFileSync(charOutputFile, uniqueCharString, 'utf8');

console.log(`  ===================== ✅ 全站字形提取已经完成,共收集：${uniqueCharString.length} 个汉字 =`);