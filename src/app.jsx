import React, { Component } from "react";
import ReactDOM from "react-dom";
import { observer } from "mobx-react";
import "./app.less";
import store from "./store/index";
import Modal from "./modal/modal";
import MD from "../MD";
import {shareWXmini} from "@src/utils/share"
import API from "./api";

MD();

//此处为spark-cli动态生成
// import Loading from "@src/pages/loading/loading";
import HomePage from "@src/pages/homePage/homePage";
import Gamepage from "./pages/gamepage/gamepage";
import Mappage from "./pages/mappage/mappage";

const pageMap = {
  // loading: <Loading/>,
  homePage: <HomePage />,
  Gamepage: <Gamepage />,
  Mappage: <Mappage />,
};
@observer
class App extends Component {

  async componentDidMount() {
    const {success, data} = await API.getInviteCode();
    if(success && data) {
      store.setInviteCode(data.inviteCode);
      shareWXmini(data.inviteCode)
    }
  }
  render() {
    let { curPage } = store;
    return (
      <div style={{width: '100vw',
        height: '100vh'}}>
        {{ ...pageMap[curPage], props: { changePage: "homePage" }}}
        <Modal />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
