import Vue from 'vue'
import App from './App.vue'
import router from '../route'
import './assets/animate/animate.css'
import './assets/style.css'
import store from './store/store'
import axIos from 'axios'
import './http/http'
import 'view-design/dist/styles/iview.css'
import { Icon, Button, Row, Col, Form, FormItem, Input, InputNumber, MessageBox, Message, Menu, Submenu, MenuItem, MenuItemGroup, Select, Option, Loading, Table, TableColumn, Pagination, Popover, Dialog, Drawer } from 'element-ui'
import { Tabs, TabPane } from 'view-design'
import echarts from 'echarts'

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
// Element UI
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$message = Message
Vue.prototype.$axios = axIos
Vue.prototype.$loading = Loading.service
Vue.use(Icon)
Vue.use(Button)
Vue.use(Row)
Vue.use(Col)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Select)
Vue.use(Option)
Vue.use(Loading.directive)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(Popover)
Vue.use(Dialog)
Vue.use(Drawer)
//  iView UI
Vue.component('Tabs', Tabs)
Vue.component('TabPane', TabPane)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
