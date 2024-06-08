import {VuexModule, Module, Mutation, Action} from 'vuex-module-decorators'

@Module({
    namespaced:true
})
class Alertas extends VuexModule{

    alertas:Array<any> = [];

    @Mutation
    public setAlerts(alert: any){
        this.alertas.push(alert)
    }

    @Mutation
    public deleteAlert(alert:any){
        const list = this.alertas.filter((item)=>{return item.id!=alert.id});
        this.alertas = list;
    }

    @Action({commit:"setAlerts"})
    public onSetAlert(alert: any){
        const uint8Array = new Uint8Array(1);
        try{
            alert.id=window.crypto.getRandomValues(uint8Array)[0];
        }catch (e){
            alert.id=null;
        }
        return alert;
    }

    @Action({commit:"deleteAlert"})
    public onDeleteAlert(alert: any){
        return alert;
    }

}

export default Alertas;