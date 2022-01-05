// 端口是否被占用
exports.getProcessIdOnPort=function(port) {
    try {
        const execOptions = {
            encoding: 'utf8',
            stdio: [
                'pipe',
                'pipe',
                'ignore',
            ],
        };
        return execSync('lsof -i:' + port + ' -P -t -sTCP:LISTEN', execOptions)
            .split('\n')[0]
            .trim();
    } catch (e) {
        return null;
    }
}
const childProcessSync=async function(cmd, params, cwd, printLog = true) {
    return new Promise((resolve, reject) => {
        let proc = childProcess(cmd, params, cwd, printLog);

        proc.on('close', (code) => {
            if (code === 0) {
                resolve(proc['logContent']);
            } else {
                reject(code);
            }
        });
    });
}
const getGitBranch=async function(cwd) {
    try {
        const result = await childProcessSync('git', ['rev-parse', '--abbrev-ref', 'HEAD'], cwd, false);

        if (!result.startsWith('fatal:')) {
            return result.trim();
        }
    } catch (e) {
        return undefined;
    }
}

const getProjectNameByPackage=function() {
    return require(`${process.cwd()}/package.json`).name
}
/**
 * 理论上每个项目独一无二的文件夹名字-默认取分支名
 * 如果当前未创建分支，取包名+日期
 * （实际很多情况是直接clone老项目，包名相同，以防资源被替换，所以用日期加一下）
 */
exports.getCdnFolderName=async function() {
    const branch = await getGitBranch(process.cwd());
    const date = Date.now();
    if (branch) {
        return branch + "/" + date;
    }
    let foldername = getProjectNameByPackage() + "/" + date;
    return foldername;

}