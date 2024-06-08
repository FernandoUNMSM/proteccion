import  Vuex, { Store }  from 'vuex';
import ConsultarInformacion from '@/views/procesos/ConsultarInformacion.vue';
import { createLocalVue, mount, shallowMount } from '@vue/test-utils';
import FechaProceso from '@/store/modules/fechaProceso';
import TableProcesos from '@/components/procesos/tableprocesos.vue';
import Alertas from '@/store/modules/alertas';
import TblMonedas from '@/components/inversiones/monedas.vue';
import ItemParticipes from '@/components/inversiones/itemparticipes.vue';
import TblSectores from '@/components/inversiones/sectores.vue';
import { BBreadcrumb, BBreadcrumbItem, BTable } from 'bootstrap-vue';
import TblInformacionActivo from '@/components/inversiones/tblinformacionactivo.vue';
import Inicio from '@/views/Inicio.vue';
import layout from '@/components/commons/BaseTemplate.vue';

const localVue = createLocalVue();
localVue.use(Vuex);
jest.mock("@/store/index", () => ({
  state: {
    fechaProceso: {
      fecha: 1
    }
  },
  dispatch: jest.fn().mockResolvedValue(undefined) 
}));

describe('ConsultarInformacion.vue', () => {
  let store: Store<any>;
  let data: Array<any>;

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        alerts: Alertas
      }
    });
    // data = [
    //   {
    //     item: "item",
    //     valor: "0.01%"
    //   },
    //   {
    //     item: "item",
    //     valor: "0.09%"
    //   }
    // ];
  });
  it('renders correctamente', () => {
    const wrapper = shallowMount(TblSectores, {
      store,
      localVue,
      stubs: {
        "b-table": BTable,
      },
    });
  })
  // it('renders correctamente', () => {
  //   const wrapper = shallowMount(Inicio, {
  //     store,
  //     localVue,
  //     stubs: {
  //       "b-breadcrumb-item": BBreadcrumbItem,
  //       "b-breadcrumb": BBreadcrumb,
  //       "layout": layout
  //     },
  //   });
  // })
});
