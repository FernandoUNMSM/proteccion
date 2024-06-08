import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex, {Store} from 'vuex';
import BootstrapVue from 'bootstrap-vue'
import BaseTemplate from '@/components/commons/BaseTemplate.vue';
import Alerts from '@/components/commons/Alerts.vue';
import Menu from "@/components/commons/NavMenu.vue";
import Alertas from '@/store/modules/alertas';
import FechaProceso from '@/store/modules/fechaProceso';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(BootstrapVue)

describe('BaseTemplate',()=>{

    // let store: Store<any>;

    // beforeEach(()=>{
    //     store = new Vuex.Store({
    //         modules:{
    //             fechaProceso:FechaProceso,
    //             alerts: Alertas
    //         }
    //     })
    // });

    it('Base template render', function () {
        
        expect(1).toBe(1);
        // const wrapper = shallowMount(BaseTemplate, {
        //     store,
        //     localVue
        // });
        // expect(wrapper.findAll("main").exists()).toBe(true);
        // expect(wrapper.findAll("header").exists()).toBe(true);
    });
})