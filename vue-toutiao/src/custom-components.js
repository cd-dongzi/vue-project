import IconSvg from 'components/Icon-svg'
import Github from 'components/Github'
import NoneData from 'components/NoneData/index'
import NoneData2 from 'components/NoneData/index2'
import HeaderBar from 'components/HeaderBar'
import SwitchCheck from 'components/Switch'
import CircleLoading from 'components/CircleLoading/index.vue'
import FullCircleLoading from 'components/CircleLoading/full-loading.vue'
import DefaultLoading from 'components/DefaultLoading/index.vue'
import Alert from 'components/Dialog/index.js'
import { showLoading, hideLoading } from './components/DefaultLoading/index.js'
import { showCircleLoading, hideCircleLoading } from './components/CircleLoading/full-loading.js'

const install = Vue => {
    Vue.component('Icon', IconSvg)
    Vue.component('Github', Github)
    Vue.component('NoneData', NoneData)
    Vue.component('NoneData2', NoneData2)
    Vue.component('HeaderBar', HeaderBar)
    Vue.component('SwitchCheck', SwitchCheck)
    Vue.component('CircleLoading', CircleLoading)
    Vue.component('FullCircleLoading', FullCircleLoading)
    Vue.component('DefaultLoading', DefaultLoading)

    Vue.prototype.$alert = Alert
    Vue.prototype.$showLoading = showLoading
    Vue.prototype.$hideLoading = hideLoading
    Vue.prototype.$showCircleLoading = showCircleLoading
    Vue.prototype.$hideCircleLoading = hideCircleLoading
}

export default install
