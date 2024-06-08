import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex, {Store} from 'vuex';
import Alerts from '@/components/commons/Alerts.vue';
import Alertas from '@/store/modules/alertas';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('Alerts',()=>{

    let store: Store<any>;

    beforeEach(()=>{
        store = new Vuex.Store({
            modules:{
                alerts: Alertas
            }
        })
    });

    it('alerts render', function () {
        const wrapper = shallowMount(Alerts, {store, localVue})
        expect(wrapper.text()).toBe("");
    });
})