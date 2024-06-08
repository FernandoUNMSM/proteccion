import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex, {Store} from 'vuex';
import BootstrapVue from 'bootstrap-vue'
import {BTable} from 'bootstrap-vue'
import TblSectores from '@/components/inversiones/sectores.vue';
import Alertas from '@/store/modules/alertas';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(BootstrapVue)

describe('Monedas Table',()=>{

    let store: Store<any>;
    let data : Array<any>

    beforeEach(()=>{
        store = new Vuex.Store({
            modules:{
                alerts: Alertas
            }
        })
        data = [
            {
                item:"item",
                valor:"0.01%"
            },
            {
                item:"item",
                valor:"0.09%"
            },
        ]
    });

    it('table monedas render', function () {
        const wrapper = shallowMount(TblSectores, {
            store,
            localVue,
            stubs:{
                'b-table':BTable
            }
        });
        expect(wrapper.find("table").exists()).toBe(true);
    });
    it('execute method', function () {
        const wrapper = shallowMount(TblSectores, {
            store,
            localVue,
            stubs:{
                'b-table':BTable
            }
        });
        // @ts-ignore
        wrapper.vm.getDataToTable(data);
        // @ts-ignore
        wrapper.vm.sortSectoresByValor(data[0],data[1]);
        expect(wrapper.find("table").exists()).toBe(true);
    });
})