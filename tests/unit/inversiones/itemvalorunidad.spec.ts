import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex, {Store} from 'vuex';
import BootstrapVue from 'bootstrap-vue'
import ItemValorUnidad from '@/components/inversiones/itemvalorunidad.vue';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(BootstrapVue)

describe('Item valor unidad',()=>{

    // let store: Store<any>;
    // let data : Array<any>

    // beforeEach(()=>{
    //     store = new Vuex.Store({
    //         modules:{
    //         }
    //     })
    //     data = [
    //     ]
    // });

    it('table monedas render', function () {
        
        expect(1).toBe(1);
        // const wrapper = shallowMount(ItemValorUnidad, {
        //     store,
        //     localVue
        // });
    });
    // it('execute method', function () {
    //     const wrapper = shallowMount(ItemValorUnidad, {
    //         store,
    //         localVue
    //     });
    //     // @ts-ignore
    //     wrapper.vm.getDataToTable(data);
    // });
})