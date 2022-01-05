import React, { Component } from "react";
import ReactDOM from "react-dom";
import {observer} from 'mobx-react';
import "./app.less";
import store from './store/index';
import Modal from './modal/modal';
import MD from '../MD';
MD();

//此处为spark-cli动态生成
import Loading from "@src/pages/loading/loading";
import HomePage from "@src/pages/homePage/homePage";

const pageMap = {
  loading: <Loading/>,
  homePage: <HomePage/>,
}
@observer
class App extends Component {
  render() {
    let { curPage } = store;
    return (
      <div>
        {{...pageMap[curPage], props: {changePage: 'homePage'}}}
        <Modal />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
