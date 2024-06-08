import { shallowMount, mount } from "@vue/test-utils";
import axiosInstance from "@/config/axiosInstance";

import ButtonRSS from '@/components/reportingservices/buton.vue';

jest.mock("@/config/axiosInstance", () => ({
    __esModule: true,
    default: {
      get: jest.fn()
    }
  }));

describe("Reporting Services",()=>{
    it("Render buttom",async ()=>{
        //axios.get = jest.fn().mockResolvedValue(null);
        const wrapper = mount(ButtonRSS,{
            propsData:{
                data:{
                    fecha: "2020-01-30",
                    codigoPortafolio:"AXS-123"
                }
            }
        });
        expect(wrapper.findAll("div").exists()).toBe(false);
    })

    it("Event click button",async ()=>{
        //axios.get = jest.fn().mockResolvedValue({payload:""});
        const wrapper = mount(ButtonRSS,{
            propsData:{
                data:{
                    fecha: "2020-01-30",
                    codigoPortafolio:"AXS-123"
                }
            }
        });
        expect(wrapper.findAll("div").exists()).toBe(false);
    })
})