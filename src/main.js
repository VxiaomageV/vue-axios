import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from "axios"
import {Button,
  Table,
  TableColumn,
  Input,
  Form,
  Row,
  Col,
  Pagination,
  MessageBox,
  Message,
  Dialog,
  FormItem,
  Select,
  Option} from 'element-ui'

Vue.config.productionTip = false;

Vue.prototype.$axios = Axios;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = Message;
Vue.prototype.$alert = MessageBox.alert;

Vue.prototype.HOST = '/api';

Vue.use(router)
Vue.use(Button)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Input)
Vue.use(Form)
Vue.use(Row)
Vue.use(Col)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(FormItem)
Vue.use(Select)
Vue.use(Option)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
