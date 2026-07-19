const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

// Hexo生成的静态页面根目录，根据你的层级配置
const publicDir = path.resolve(__dirname, '../../public');
// 输出：全站去重字符清单
const charOutputFile = path.join(__dirname, 'chars.txt');

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
    const htmlContent = fs.readFileSync(fullFilePath, 'utf8');
    const $ = cheerio.load(htmlContent);
    // 累加页面所有可见文字
    allRawText += $('body').text();
  });
}

// 执行全站扫描
scanAllHtml(publicDir);

// 字符去重，大幅减少字体体积
const uniqueCharSet = new Set(allRawText);
const uniqueCharString = [...uniqueCharSet].join('');

// 写入字符文件
fs.writeFileSync(charOutputFile, uniqueCharString, 'utf8');
console.log(`  ===================== ✅ 全站字符提取已经完成，共收集：${uniqueCharString.length} 个 ====`);