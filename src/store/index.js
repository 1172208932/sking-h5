import { makeAutoObservable } from 'mobx';
import API from '../api/index';

const store = makeAutoObservable({
    ruleInfo: '',
    curPage: 'loading',
    setRule(ruleInfo) {
        this.ruleInfo = ruleInfo
    },
    changePage(page, callback) {
        this.curPage = page;
        callback && callback();
    },
    async initRule() {
        // 模拟获取远程的数据
        const { data } = await API.getRule();
        this.setRule(data)
    }
})
export default store; 