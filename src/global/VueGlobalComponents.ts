import Vue from 'vue';
import layout from '@/components/commons/BaseTemplate.vue';
import LBreadCrumb from '@/components/commons/Breadcrumb.vue';
import title from '@/components/commons/Title.vue';

Vue.component("layout", layout);
Vue.component("l-breadcrumb", LBreadCrumb);
Vue.component("l-title", title);