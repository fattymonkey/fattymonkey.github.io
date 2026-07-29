const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// 注册自定义命令：hexo font
hexo.extend.console.register(
  'font',
  '自动提取全站文字，裁剪源字体文件并生成新的字体文件',
  function () {
    console.log('\n  ===================== ✅ 启动字体文件裁剪任务 =====================');
    try {
      // 博客根目录（当前终端执行目录，稳定可靠）
      const blogDir = process.cwd();
      // 字体目录 source/fonts
      const fontSourceDir = path.resolve(blogDir, './source/fonts');
      // 输出目录
      const bookFontPath = path.resolve(fontSourceDir, 'GlowSansSC-Normal-Book.woff2');
      const boldFontPath = path.resolve(fontSourceDir, 'GlowSansSC-Normal-Bold.woff2');
      // 静态页面目录 public
      const publicDir = path.resolve(blogDir, './public');

      // 前置校验1：public 必须存在
      if (!fs.existsSync(publicDir)) {
        throw new Error('  ===================== ❌ public文件夹不存在，请先执行hexo generate =====================');
      }
      // 前置校验2：public内必须有html页面
      const publicFiles = fs.readdirSync(publicDir);
      const hasHtml = publicFiles.some(file => file.endsWith('.html'));
      if (!hasHtml) {
        throw new Error('  ===================== ❌ public内没有html文件，页面生成不完整 =====================');
      }
      // 前置校验3：字体目录存在
      if (!fs.existsSync(fontSourceDir)) {
        throw new Error('  ===================== ❌ 字体目录 source/fonts 不存在 =====================');
      }

      // 切换工作目录到字体文件夹，方便执行相对路径命令
      process.chdir(fontSourceDir);

      // 1. 删除旧woff2字体文件
      if (fs.existsSync(bookFontPath)) {
        try {
          fs.unlinkSync(bookFontPath);
          console.log('  ===================== ✅ 已删常规书本字体文件 =====================');
        } catch (err) {
          console.warn('  ===================== ⚠️ 常规书本字体删除失败：', err.message);
        }
      }
      if (fs.existsSync(boldFontPath)) {
        try {
          fs.unlinkSync(boldFontPath);
          console.log('  ===================== ✅ 已删常规粗体字体文件 =====================');
        } catch (err) {
          console.warn('  ===================== ⚠️ 常规粗体字体删除失败：', err.message);
        }
      }

      // 2. 删除临时字符文件
      const tempCharFile = path.resolve(fontSourceDir, 'all-font-glyphs.txt');
      if (fs.existsSync(tempCharFile)) {
        try {
          fs.unlinkSync(tempCharFile);
          console.log('  ===================== ✅ 已删除旧临时字符文件 =====================');
        } catch (err) {
          console.warn('  ===================== ⚠️ 临时字符文件删除失败：', err.message);
        }
      }

      // 3. 运行字符提取脚本（使用绝对路径，稳定无路径坑）
      const extractScriptPath = path.resolve(fontSourceDir, 'extract-font-glyphs.js');
      try {
        execSync(`NODE_PATH=$(npm root -g) node ${extractScriptPath}`, { stdio: 'inherit' });
        console.log('  ===================== ✅ 已生成新临时字符文件 =====================');
      } catch (err) {
        throw new Error(`  ===================== ❌ 字符提取脚本执行失败：${err.message}`);
      }

      // 4. 裁剪常规字重（输出同目录，去掉../fonts）
      try {
        execSync(
          'pyftsubset GlowSansSC-Normal-Book.otf --text-file=all-font-glyphs.txt --flavor=woff2 --output-file=GlowSansSC-Normal-Book.woff2',
          { stdio: ['inherit', 'inherit', 'ignore'] }
        );
        if (fs.existsSync(bookFontPath)) {
          console.log('  ===================== ✅ 生成常规书本字体文件 =====================');
        } else {
          throw new Error('未输出常规woff2文件');
        }
      } catch (err) {
        throw new Error(`  ===================== ❌ 常规书本字体裁剪失败：${err.message}`);
      }

      // 5. 裁剪粗体字重（输出同目录，去掉../fonts）
      try {
        execSync(
          'pyftsubset GlowSansSC-Normal-Bold.otf --text-file=all-font-glyphs.txt --flavor=woff2 --output-file=GlowSansSC-Normal-Bold.woff2',
          { stdio: ['inherit', 'inherit', 'ignore'] }
        );
        if (fs.existsSync(boldFontPath)) {
          console.log('  ===================== ✅ 生成常规粗体字体文件 =====================');
        } else {
          throw new Error('未输出粗体woff2文件');
        }
      } catch (err) {
        throw new Error(`  ===================== ❌ 常规粗体字体裁剪失败：${err.message}`);
      }

      console.log('  ===================== 🎉 字体裁剪任务执行完毕 =====================');

    } catch (error) {
      console.error('  ===================== ❌ 字体裁剪任务终止执行：', error.message);
    }
  }
);

// 新增：注册别名 hexo f，直接调用上面的 font 命令
hexo.extend.console.register(
  'f',
  '自动提取全站文字，裁剪源字体文件并生成新的字体文件（等价 hexo font）',
  function(args) {
    return this.call('font', args);
  }
);