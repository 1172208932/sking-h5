/*
将此文件放到project/config/scripts/assets/目录下
在package.json文件的"scripts"字段下，分别修改dev和build命令：
"dev": "node ./config/scripts/assets/generateAssetList.js && node ./config/webpack.dev.config.js"
"build": "node ./config/scripts/assets/generateAssetList.js && node ./config/scripts/assets/index.js imgmin imgup && node ./config/webpack.prod.config.js"
*/

const fs = require('fs')
const path = require('path')



/*请先配置：预加载的资源文件夹名称，或者设置预加载、异步加载资源路径*/
const preloadFolder = ['loading']; //在/src/assets文件夹下，请设置需要预加载的资源文件目录，默认值预加载为loading文件夹， 其他均为异步加载
const initAssetList = {   //初始化预设资源处理
    preLoadImg:[],  //设置预加载图片，例如：["loading/bg174.png","loading/上面.png","loading/底部173.png"]
    asyncLoadImg:[]  //设置异步加载图片
}
/**
 * 搜索文件夹里的文件
 * @param {*} folderList 预加载文件夹名称数组
 * @param {*} folderPath 文件夹地址，绝对路径
 * @param {*} regExp 正则表达式，用于匹配目标文件
 * @returns {string[]} 返回文件相对路径地址
 */
function searchFileFromFolder(folderPath='/src/assets', regExp=/\.(png|jpg|jpeg|svga|spi|json|mp3|wav)$/i) {
    let preLoadImg = [], asyncLoadImg = [];
    const searchOneDir = (absolutePath, relativePath) => {
        fs.readdirSync(absolutePath).forEach(v => {
            let absPath = absolutePath + '/' + v;
            let relPath = relativePath ? relativePath + '/' + v :  v;
            if(fs.statSync(absPath).isFile()) {
                if(regExp.test(v)){
                    if(preloadFolder.includes(relPath.split('/')[0])){
                        preLoadImg.push(relPath);
                    }else{
                        asyncLoadImg.push(relPath)
                    }
                }
            }else {
                searchOneDir(absPath, relPath);
            }
        });
    }
    searchOneDir(path.resolve('.') + folderPath, '');
    console.log('资源预处理成功~')

    return {
        preLoadImg: [
            ...initAssetList.preLoadImg,
            ...preLoadImg
        ],
        asyncLoadImg: [
            ...initAssetList.asyncLoadImg,
            ...asyncLoadImg
        ]
    };
}

// 读资源目录
const assetList = searchFileFromFolder();

// 写资源列表json
fs.writeFileSync(path.resolve('.') + '/src/assetList.json', JSON.stringify(assetList))