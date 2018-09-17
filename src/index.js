//common
import React from "react";
import ReactDOM from "react-dom";
import loginService from "@services/loginService";
//component
import App from "./App";
import MessageJs from "@/components/MessageJS/";
import Confirm from "@/components/Confirm/";
//redux
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";
import configureStore from "./redux/configureStore.js";
import "./utils/globle"
//ServiceWorker
import registerServiceWorker from "./registerServiceWorker";
const { persistor, store } = configureStore();
//global import
window.$store = store;
window.$message = MessageJs;
window.$confirm = Confirm;
window.onload = loginService.check;

const onBeforeLift = () => {
  // take some action before the gate lifts
};

ReactDOM.render(
  <Provider store={store}>
    <PersistGate
      //   loading={<Loading />}
      loading={null}
      onBeforeLift={onBeforeLift}
      persistor={persistor}
    >
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();

export { store };
