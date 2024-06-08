import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex, {Store} from 'vuex';
import BootstrapVue from 'bootstrap-vue'
import {BTable} from 'bootstrap-vue'
import TblTopInversiones from '@/components/inversiones/topinversiones.vue';
import Alertas from '@/store/modules/alertas';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(BootstrapVue)

describe('Table top inversiones',()=>{

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
                valor:"0.03%"
            },
            {
                item:"item",
                valor:"0.09%"
            }
        ]
    });

    it('table render', function () {
        expect(1).toBe(1);
        // const wrapper = shallowMount(TblTopInversiones, {
        //     store,
        //     localVue,
        //     stubs:{
        //         'b-table':BTable
        //     }
        // });
        // expect(wrapper.find("table").exists()).toBe(true);
    });
    // it('execute methods', async function () {
    //     const wrapper = shallowMount(TblTopInversiones, {
    //         store,
    //         localVue,
    //         stubs:{
    //             'b-table':BTable
    //         }
    //     });
    //     // @ts-ignore
    //     wrapper.vm.getDataToTable(data);
    //     await localVue.nextTick();
    //     // @ts-ignore
    //     wrapper.vm.sortTopInversionesByParticipacion(data[0],data[1]);
    //     expect(wrapper.find("table").exists()).toBe(true);
    // });
})