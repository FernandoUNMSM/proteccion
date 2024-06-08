import { createLocalVue } from '@vue/test-utils'
import Vuex, {Store} from 'vuex'
import Alertas from '@/store/modules/alertas'

describe("Store alertas testing", ()=>{
    let localVue;
    let store:Store<any>;
    beforeEach(()=>{
        localVue = createLocalVue();
        localVue.use(Vuex);
        store = new Vuex.Store({
            modules:{
                alerts:Alertas
            }
        })
    });

    it("test onsetalert", ()=>{
        store.dispatch('alerts/onSetAlert',{});
    });

    it("test ondeletealert", ()=>{
        store.dispatch('alerts/onDeleteAlert',{});
    });
})