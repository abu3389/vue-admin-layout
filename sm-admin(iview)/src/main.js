import Vue from 'vue';
import iView from 'iview';
import VueOccupy from 'vue-occupy'
import {router} from './router/index';
import store from './store';
import App from './app.vue';

import './theme/theme.less';

import util from '@/libs/util';

Vue.use(iView);
Vue.use(VueOccupy);

new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App),
    data: {
        currentPageName: ''
    },
    mounted () {
        util.initRouter(this);
    },
    created () {
    }
});


/**
 * 
 */
if (window.HTMLElement) {
    if (Object.getOwnPropertyNames(HTMLElement.prototype).indexOf('dataset') === -1) {
        Object.defineProperty(HTMLElement.prototype, 'dataset', {
            get: function () {
                var attributes = this.attributes;
                var name = [];
                var value = [];
                var obj = {};
                for (var i = 0; i < attributes.length; i++) {
                    if (attributes[i].nodeName.slice(0, 5) == 'data-') {
                        name.push(attributes[i].nodeName.slice(5));
                        value.push(attributes[i].nodeValue);
                    }
                }
                for (var j = 0; j < name.length; j++) {
                    obj[name[j]] = value[j];
                }
                return obj;
            }
        });
    }
}
