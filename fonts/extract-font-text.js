const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

// Hexo生成的静态页面根目录
const publicDir = path.resolve(__dirname, '../../public');
// 输出纯中文字符清单（无英文/数字）
const charOutputFile = path.join(__dirname, 'chars.txt');

let allRawText = '';

// 递归遍历读取所有html页面文字
function scanAllHtml(dirPath) {
  const fileList = fs.readdirSync(dirPath);
  fileList.forEach(fileName => {
    const fullFilePath = path.join(dirPath, fileName);
    const stat = fs.statSync(fullFilePath);
    if (stat.isDirectory()) {
      scanAllHtml(fullFilePath);
      return;
    }
    if (!fileName.endsWith('.html')) return;
    const htmlContent = fs.readFileSync(fullFilePath, 'utf8');
    const $ = cheerio.load(htmlContent);
    allRawText += $('body').text();
  });
}

scanAllHtml(publicDir);

// 1. 去重全部字符
const uniqueCharSet = new Set(allRawText);
// 2. 过滤规则：只保留汉字、中文全角标点，剔除英文、数字、半角符号
const chineseOnlyChars = [...uniqueCharSet].filter(char => {
  const code = char.charCodeAt(0);
  // 匹配中文字符范围：
  // 汉字 0x4E00 ~ 0x9FFF | 中文标点 0x3000 ~ 0x303F | 全角符号 0xFF00 ~ 0xFFEF
  return (code >= 0x4E00 && code <= 0x9FFF)
      || (code >= 0x3000 && code <= 0x303F)
      || (code >= 0xFF00 && code <= 0xFFEF);
});

const chineseOnlyStr = chineseOnlyChars.join('');

// 写入纯中文字符文件
fs.writeFileSync(charOutputFile, chineseOnlyStr, 'utf8');
console.log(`  ===================== ✅ 仅仅提取中文字符完成，共收集：${chineseOnlyStr.length} 个 ====`);