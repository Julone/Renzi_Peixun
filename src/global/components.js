//set Global-Components here
import Vue from 'vue';
import QT from './../components/Test/QuestionTitle.vue';
import AT from './../components/AppTitle.vue'
import VCI from './../components/Video/ComItem.vue'
import APR from './../components/AppPullRefresh.vue'
import HIMG from './../components/Home/img.vue'
Vue.component('test-qt', QT);
Vue.component('app-title', AT);
Vue.component('video-com-item',VCI);
Vue.component('app-pull-refresh', APR);
Vue.component('home-img',HIMG)
