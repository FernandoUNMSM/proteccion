<template>
  <b-row>
    <b-col>
      <div class="accordion" role="tablist">
        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" role="tab">
            <b-button class="font-weight-bold" block v-b-toggle.grupo1 variant="info" size="sm">
              Caracteristicas portafolio
              <b-icon icon="arrow-down-circle-fill" class="float-right" />
            </b-button>
          </b-card-header>
          <b-collapse id="grupo1" accordion="my-accordion" role="tabpanel">
            <b-container class="mb-3 mt-3">
              <b-row>
                <b-col md="4" v-for="(data , i) of group1" :key="data.idCampo" class="pt-2 pb-2">
                  <b-row>
                    <b-col md="10">
                      <label class="font-weight-bold">
                        <b-icon icon="arrow-right-circle-fill" />
                        {{data.nombreCampo}}
                      </label>
                    </b-col>
                    <b-col md="2">
                      <b-icon icon="box-arrow-in-up" class="text-success icon-select" v-b-tooltip title="Actualizar valor" @click="actualizarValor(group1[i])" />
                    </b-col>
                  </b-row>
                  <date-picker v-if="'FECHA' === data.tipoCampo" v-model="group1[i].valor" :value="data.valor" :formatter="momentFormatter" value-type="format" class="full-witdh" :editable="false" :clearable="false"></date-picker>
                  <b-input-group v-else-if="'MONEDA' === data.tipoCampo">
                    <b-input-group-prepend is-text><b>$</b></b-input-group-prepend>
                    <b-form-input  type="text" v-model="group1[i].valor" :value="group1[i].valor" @change="onValueChanged($event, group1[i])" v-on:keypress="isNumber($event)"></b-form-input>
                  </b-input-group>
                  <b-input-group v-else-if="'PORCENTAJE' === data.tipoCampo">
                    <b-form-input  type="text" v-model="group1[i].valor" :value="group1[i].valor" @change="validatePercentValue($event, i)" v-on:keypress="isPercent"></b-form-input>
                    <b-input-group-append is-text><b>%</b></b-input-group-append>
                    <b-input-group-append is-text v-if="data.idCampo === 15">m&aacute;xima</b-input-group-append>
                  </b-input-group>
                  <b-input-group v-else-if="'ENTERO' === data.tipoCampo">
                    <!-- @change="onValueChanged($event, group1[i])-->
                    <b-form-input  type="text" v-model="group1[i].valor" :value="group1[i].valor"></b-form-input>
                    <b-input-group-append is-text>d&iacute;as</b-input-group-append>
                  </b-input-group>
                  <b-form-input :value="data.valor" v-model="group1[i].valor" v-else-if="data.tipoCampo === 'TEXTO' && data.valor.length<30"></b-form-input>
                  <b-form-textarea v-else-if="data.tipoCampo === 'TEXTO' && data.valor.length>=30" rows="3" :value="data.valor" v-model="group1[i].valor"></b-form-textarea>
                  <div role="group" v-else-if="'PORC_MONEDA' === data.tipoCampo">
                    <b-form-input :id="'input-' + data.idCampo" type="text" v-model="group1[i].valor" :value="group1[i].valor"></b-form-input>
                    <b-form-text :id="'input-' + data.idCampo">Para ingresar moneda use: $1,232,345</b-form-text>
                    <b-form-text :id="'input-' + data.idCampo">Para ingresar porcentaje use: 12.45%</b-form-text>
                    <b-form-text :id="'input-' + data.idCampo">Para ingresar no aplica use: N/A</b-form-text>
                  </div>
                </b-col>
              </b-row>
            </b-container>
          </b-collapse>
        </b-card> <!--End grupo 1-->
        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" role="tab">
            <b-button class="font-weight-bold" block v-b-toggle.grupo2 variant="info" size="sm">Calificacion tipo riesgo <b-icon icon="arrow-down-circle-fill" class="float-right" /></b-button>
          </b-card-header>
          <b-collapse id="grupo2" accordion="my-accordion" role="tabpanel">
            <b-container class="mb-3 mt-3">
              <b-row>
                <b-col md="4" v-for="(data , i) of group2" :key="data.idCampo" class="pt-2 pb-2">
                  <b-row>
                    <b-col md="10">
                      <label class="font-weight-bold">
                        <b-icon icon="arrow-right-circle-fill" />
                        {{data.nombreCampo}}
                      </label>
                    </b-col>
                    <b-col md="2">
                      <b-icon icon="box-arrow-in-up" class="text-success icon-select" v-b-tooltip title="Actualizar valor" @click="actualizarValor(group2[i])"/>
                      <b-link v-if="'FECHA' === data.tipoCampo" @click="data.valor='N/A'"><b-icon icon="trash-fill" class="text-danger ml-1" v-b-tooltip title="Borrar Fecha"/></b-link>
                    </b-col>
                  </b-row>
                  <date-picker v-if="'FECHA' === data.tipoCampo" v-model="group2[i].valor" :value="data.valor" :formatter="momentFormatter" value-type="format" class="full-witdh" :editable="false" :clearable="false"></date-picker>
                  <b-form-input :value="data.valor" v-model="group2[i].valor" v-else-if="data.valor.length<30"></b-form-input>
                  <b-form-textarea v-else rows="3" :value="data.valor" v-model="group2[i].valor"></b-form-textarea>
                </b-col>
              </b-row>
            </b-container>
          </b-collapse>
        </b-card><!--End grupo 2-->
        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" role="tab">
            <b-button class="font-weight-bold" block v-b-toggle.grupo3 variant="info" size="sm">Estrategia inversion <b-icon icon="arrow-down-circle-fill" class="float-right" /></b-button>
          </b-card-header>
          <b-collapse id="grupo3" accordion="my-accordion" role="tabpanel">
            <b-container class="mb-3 mt-3">
              <b-row>
                <b-col md="4" v-for="(data , i) of group3" :key="data.idCampo" class="pt-2 pb-2">
                  <b-row>
                    <b-col md="10">
                      <label class="font-weight-bold">
                        <b-icon icon="arrow-right-circle-fill" />
                        {{data.nombreCampo}}
                      </label>
                    </b-col>
                    <b-col md="2">
                      <b-icon icon="box-arrow-in-up" class="text-success icon-select" v-b-tooltip title="Actualizar valor" @click="actualizarValor(group3[i])"/>
                    </b-col>
                  </b-row>
                  <b-form-input :value="data.valor" v-model="group3[i].valor" v-if="data.valor.length<30" @change="capitalize($event, i)"></b-form-input>
                  <b-form-textarea v-else rows="3" :value="data.valor" @change="capitalize($event, i)" v-model="group3[i].valor"></b-form-textarea>
                </b-col>
              </b-row>
            </b-container>
          </b-collapse>
        </b-card><!--End grupo 3-->
        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" role="tab">
            <b-button class="font-weight-bold" block v-b-toggle.grupo10 variant="info" size="sm">Gastos y comisiones del portafolio<b-icon icon="arrow-down-circle-fill" class="float-right" /></b-button>
          </b-card-header>
          <b-collapse id="grupo10" accordion="my-accordion" role="tabpanel">
            <b-container class="mb-3 mt-3">
              <b-row>
                <b-col md="4" v-for="(data , i) of group10" :key="data.idCampo" class="pt-2 pb-2">
                  <b-row>
                    <b-col md="10">
                      <label class="font-weight-bold">
                        <b-icon icon="arrow-right-circle-fill" />
                        {{data.nombreCampo}}
                      </label>
                     </b-col>
                    <b-col md="2">
                      <b-icon icon="box-arrow-in-up" class="text-success icon-select" v-b-tooltip title="Actualizar valor" @click="actualizarValor(group10[i])"/>
                    </b-col>
                  </b-row>
                  <b-input-group v-if="'MONEDA' === data.tipoCampo">
                    <b-input-group-prepend is-text><b>$</b></b-input-group-prepend>
                    <b-form-input  type="text" v-model="group10[i].valor" :value="group10[i].valor" @change="onValueChanged($event, group10[i])" v-on:keypress="isNumber($event)"></b-form-input>
                  </b-input-group>
                  <b-form-input :value="data.valor" v-model="group10[i].valor" v-else-if="data.valor.length<30"></b-form-input>
                  <b-form-textarea v-else rows="3" :value="data.valor" v-model="group10[i].valor"></b-form-textarea>
                </b-col>
              </b-row>
            </b-container>
          </b-collapse>
        </b-card><!--End grupo 10-->
        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" role="tab">
            <b-button class="font-weight-bold" block v-b-toggle.grupo12 variant="info" size="sm">Riesgos del portafolio<b-icon icon="arrow-down-circle-fill" class="float-right" /></b-button>
          </b-card-header>
          <b-collapse id="grupo12" accordion="my-accordion" role="tabpanel">
            <b-container class="mb-3 mt-3">
              <b-row>
                <b-col md="4" v-for="(data , i) of group12" :key="data.idCampo" class="pt-2 pb-2">
                  <b-row>
                    <b-col md="10">
                      <label class="font-weight-bold">
                        <b-icon icon="arrow-right-circle-fill" />
                        {{data.nombreCampo}}
                      </label>
                    </b-col>
                    <b-col md="2">
                      <b-icon icon="box-arrow-in-up" class="text-success icon-select" v-b-tooltip title="Actualizar valor" @click="actualizarValor(group12[i])"/>
                    </b-col>
                  </b-row>
                  <b-form-input :value="data.valor" v-model="group12[i].valor" v-if="data.valor.length<30"></b-form-input>
                  <b-form-textarea v-else rows="3" :value="data.valor" v-model="group12[i].valor"></b-form-textarea>
                </b-col>
              </b-row>
            </b-container>
          </b-collapse>
        </b-card><!--End grupo 12-->
        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" role="tab">
            <b-button class="font-weight-bold" block v-b-toggle.grupo11 variant="info" size="sm">Conceptos de comisi&oacute;n del portafolio<b-icon icon="arrow-down-circle-fill" class="float-right" /></b-button>
          </b-card-header>
          <b-collapse id="grupo11" accordion="my-accordion" role="tabpanel">
            <b-container class="mb-3 mt-3">
              <b-row class="row-margin">
                <b-col cols="6">
                  <b-button variant="outline-primary" size="sm" @click="qtyConceptos++"><b-icon-plus></b-icon-plus>Agregar concepto</b-button>
                </b-col>
                <b-col cols="6" class="text-right">
                  <b-button variant="outline-success" size="sm" @click="guardarConceptos"><b-icon-plus></b-icon-plus>Guardar conceptos</b-button>
                </b-col>
              </b-row>
              <b-row><b-col><hr /></b-col></b-row>
              <b-row class="row-margin" v-for="i in qtyConceptos" :key="i">
                <b-col class="text-right">Concepto{{ i-1 }}</b-col>
                <b-col cols="3"><b-form-select size="sm" :options="conceptos" v-model="conceptosSelected[i-1]" @change="onChangeConcepto($event, i-1, conceptosSelected[i-1])"></b-form-select></b-col>
                <b-col cols="4">
                  <b-input-group append="% EA (máxima)" size="sm">
                    <b-form-input type="text" size="sm" placeholder="Porcentaje de comisión" v-model="porcentaje[i-1]" :value="porcentaje[i-1]" @change="validatePercentValueComision($event, i-1)" v-on:keypress="isPercent"></b-form-input>
                  </b-input-group>
                </b-col>
                <b-col cols="3"><b-form-select size="sm" :options="basescomision" v-model="basesSelected[i-1]"></b-form-select></b-col>
                <b-col><b-button variant="outline-danger" size="sm" @click="deleteConcepto(i-1)"><b-icon-trash></b-icon-trash></b-button></b-col>
              </b-row>
            </b-container>
          </b-collapse>
        </b-card><!--End grupo 11-->
        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" role="tab">
            <b-button class="font-weight-bold" block v-b-toggle.grupo4 variant="info" size="sm">Hoja de vida del administrador <b-icon icon="arrow-down-circle-fill" class="float-right" /></b-button>
          </b-card-header>
          <b-collapse id="grupo4" accordion="my-accordion" role="tabpanel">
            <b-container class="mb-3 mt-3">
              <b-row>
                <b-col md="4" v-for="(data , i) of group4" :key="data.idCampo" class="pt-2 pb-2">
                  <b-row>
                    <b-col md="10">
                      <label class="font-weight-bold">
                        <b-icon icon="arrow-right-circle-fill" />
                        {{data.nombreCampo}}
                      </label>
                    </b-col>
                    <b-col md="2">
                      <b-icon icon="box-arrow-in-up" class="text-success icon-select" v-b-tooltip title="Actualizar valor" @click="actualizarValor(group4[i])"/>
                    </b-col>
                  </b-row>
                  <b-form-input :value="data.valor" v-model="group4[i].valor" v-if="data.valor.length<30"></b-form-input>
                  <b-form-textarea v-else rows="3" :value="data.valor" v-model="group4[i].valor"></b-form-textarea>
                </b-col>
              </b-row>
            </b-container>
          </b-collapse>
        </b-card><!--End grupo 5-->
        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" role="tab">
            <b-button class="font-weight-bold" block v-b-toggle.grupo5 variant="info" size="sm">Empresas vinculadas <b-icon icon="arrow-down-circle-fill" class="float-right" /></b-button>
          </b-card-header>
          <b-collapse id="grupo5" accordion="my-accordion" role="tabpanel">
            <b-container class="mb-3 mt-3">
              <b-row>
                <b-col md="4" v-for="(data , i) of group5" :key="data.idCampo" class="pt-2 pb-2">
                  <b-row>
                    <b-col md="10">
                      <label class="font-weight-bold">
                        <b-icon icon="arrow-right-circle-fill" />
                        {{data.nombreCampo}}
                      </label>
                    </b-col>
                    <b-col md="2">
                      <b-icon icon="box-arrow-in-up" class="text-success icon-select"  v-b-tooltip title="Actualizar valor" @click="actualizarValor(group5[i])"/>
                    </b-col>
                  </b-row>
                  <b-form-input :value="data.valor" v-model="group5[i].valor" v-if="data.valor.length<30"></b-form-input>
                  <b-form-textarea v-else rows="3" :value="data.valor" v-model="group5[i].valor"></b-form-textarea>
                </b-col>
              </b-row>
            </b-container>
          </b-collapse>
        </b-card><!--End grupo 6-->
        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" role="tab">
            <b-button class="font-weight-bold" block v-b-toggle.grupo6 variant="info" size="sm">Revisor fiscal <b-icon icon="arrow-down-circle-fill" class="float-right" /></b-button>
          </b-card-header>
          <b-collapse id="grupo6" accordion="my-accordion" role="tabpanel">
            <b-container class="mb-3 mt-3">
              <b-row>
                <b-col md="4" v-for="(data , i) of group6" :key="data.idCampo" class="pt-2 pb-2">
                  <b-row>
                    <b-col md="10">
                      <label class="font-weight-bold">
                        <b-icon icon="arrow-right-circle-fill" />
                        {{data.nombreCampo}}
                      </label>
                    </b-col>
                    <b-col md="2">
                      <b-icon icon="box-arrow-in-up" class="text-success icon-select" v-b-tooltip title="Actualizar valor" @click="actualizarValor(group6[i])"/>
                    </b-col>
                  </b-row>
                  <b-form-input :value="data.valor" v-model="group6[i].valor" v-if="data.valor.length<30"></b-form-input>
                  <b-form-textarea v-else rows="3" :value="data.valor" v-model="group6[i].valor"></b-form-textarea>
                </b-col>
              </b-row>
            </b-container>
          </b-collapse>
        </b-card><!--End grupo 7-->
        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" role="tab">
            <b-button class="font-weight-bold" block v-b-toggle.grupo7 variant="info" size="sm">Defensor del consumidor <b-icon icon="arrow-down-circle-fill" class="float-right" /></b-button>
          </b-card-header>
          <b-collapse id="grupo7" accordion="my-accordion" role="tabpanel">
            <b-container class="mb-3 mt-3">
              <b-row>
                <b-col md="4" v-for="(data , i) of group7" :key="data.idCampo" class="pt-2 pb-2">
                  <b-row>
                    <b-col md="10">
                      <label class="font-weight-bold">
                        <b-icon icon="arrow-right-circle-fill" />
                        {{data.nombreCampo}}
                      </label>
                    </b-col>
                    <b-col md="2">
                      <b-icon icon="box-arrow-in-up" class="text-success icon-select" v-b-tooltip title="Actualizar valor" @click="actualizarValor(group6[i])"/>
                    </b-col>
                  </b-row>
                  <b-form-input :value="data.valor" v-model="group7[i].valor" v-if="data.valor.length<30"></b-form-input>
                  <b-form-textarea v-else rows="3" :value="data.valor" v-model="group7[i].valor"></b-form-textarea>
                </b-col>
              </b-row>
            </b-container>
          </b-collapse>
        </b-card><!--End grupo 8-->
        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" role="tab">
            <b-button class="font-weight-bold" block v-b-toggle.grupo8 variant="info" size="sm">Disclaimer <b-icon icon="arrow-down-circle-fill" class="float-right" /></b-button>
          </b-card-header>
          <b-collapse id="grupo8" accordion="my-accordion" role="tabpanel">
            <b-container class="mb-3 mt-3">
              <b-row>
                <b-col md="4" v-for="(data , i) of group8" :key="data.idCampo" class="pt-2 pb-2">
                  <b-row>
                    <b-col md="10">
                      <label class="font-weight-bold">
                        <b-icon icon="arrow-right-circle-fill" />
                        {{data.nombreCampo}}
                      </label>
                    </b-col>
                    <b-col md="2">
                      <b-icon icon="box-arrow-in-up" class="text-success icon-select" v-b-tooltip title="Actualizar valor" @click="actualizarValor(group8[i])"/>
                    </b-col>
                  </b-row>
                  <b-form-input :value="data.valor" v-model="group8[i].valor" v-if="data.valor.length<30"></b-form-input>
                  <b-form-textarea v-else rows="3" :value="data.valor" v-model="group8[i].valor"></b-form-textarea>
                </b-col>
              </b-row>
            </b-container>
          </b-collapse>
        </b-card><!--End grupo 8-->


        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" role="tab">
            <b-button class="font-weight-bold" block v-b-toggle.grupo13 variant="info" size="sm">Inversiones del portafolio<b-icon icon="arrow-down-circle-fill" class="float-right" /></b-button>
          </b-card-header>
          <b-collapse id="grupo13" accordion="my-accordion" role="tabpanel">
            <b-container class="mb-3 mt-3">
              <b-row class="row-margin">
                <b-col cols="6">  
                  <b-button variant="outline-primary" size="sm" @click="qtyOtrosFactores++"><b-icon-plus></b-icon-plus>Agregar Factor</b-button>
                </b-col>
                <b-col cols="6" class="text-right">
                  <b-button variant="outline-success" size="sm" @click="guardarFactorInversion"><b-icon-plus></b-icon-plus>Guardar Factor</b-button>
                </b-col>
              </b-row>
              <b-row><b-col><hr /></b-col></b-row>
   

              <div v-if=" this.qtyOtrosFactores>=1" style="margin-left: 510px">
                <b-form-text >Para ingresar moneda use: $1,232,345</b-form-text>
                <b-form-text >Para ingresar porcentaje use: 12.45%</b-form-text>        
              </div>

              <b-row class="row-margin" v-for="i in qtyOtrosFactores" :key="i">
               
                <b-col class="text-right">Otro Factor {{ i-1 }}</b-col>
                <b-col cols="3"><b-form-input size="sm" type="text" v-model="factoresInversionSelected[i-1]" placeholder="Factor de Inversión"></b-form-input></b-col>
                <b-col cols="4">
                  <!--                 
                    v-model="factoresInversionSelected[i-1]"
                    @change="onChangeFactorInversion($event, i-1, factoresInversionSelected[i-1])"
                   <b-input-group append="Nombre Factor" size="sm">
                    <b-form-input type="text" size="sm" placeholder="Nombre del Factor" v-model="[i-1]" :value="porcentajeInversion[i-1]" @change="validatePercentValueComision($event, i-1)" v-on:keypress="isPercent"></b-form-input>
                  </b-input-group>

                    <b-input-group append="%" size="sm">
                    -->      
                    <b-input-group size="sm">           
                    <b-form-input type="text" size="sm" placeholder="Porcentaje de Inversion" v-model="porcentajeInversion[i-1]" :value="porcentajeInversion[i-1]"></b-form-input>
                  </b-input-group>
                </b-col>
                <b-col><b-button variant="outline-danger" size="sm" @click="deleteFactorInversion(i-1)"><b-icon-trash></b-icon-trash></b-button></b-col>
              </b-row>
            </b-container>
          </b-collapse>
        </b-card><!--End grupo 13-->    

        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" role="tab">
            <b-button class="font-weight-bold" block v-b-toggle.grupo14 variant="info" size="sm">Observaciones<b-icon icon="arrow-down-circle-fill" class="float-right" /></b-button>
          </b-card-header>
          <b-collapse id="grupo14" accordion="my-accordion" role="tabpanel">
            <b-container class="mb-3 mt-3">

                          <b-col md="100"  v-for="(data , i) of group14" :key="data.idCampo"  class="pt-2 pb-2" >
                                            <b-row>
                                              <b-col md="10">
                                                <label class="font-weight-bold">
                                                  <b-icon icon="arrow-right-circle-fill" />
                                                    {{data.nombreCampo}}
                                                  </label>
                                                </b-col>
                                                <b-col md="2">
                                                  <b-icon icon="box-arrow-in-up" class="text-success icon-select" v-b-tooltip title="Actualizar valor" @click="actualizarValor(group14[i])"/>
                                                </b-col>
                                              </b-row>
                                    <b-form-input :value="data.valor" v-model="group14[i].valor" v-if="data.valor.length<30"></b-form-input>
                                    <b-form-textarea v-else rows="3" :value="data.valor" v-model="group14[i].valor"></b-form-textarea>

                          </b-col>

            </b-container>
          </b-collapse>
        </b-card><!--End grupo 15-->        
        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" role="tab">
            <b-button class="font-weight-bold" block v-b-toggle.grupo15 variant="info" size="sm">Informacion Adicional<b-icon icon="arrow-down-circle-fill" class="float-right" /></b-button>
          </b-card-header>
          <b-collapse id="grupo15" accordion="my-accordion" role="tabpanel">
            <b-container class="mb-3 mt-3">

                          <b-col md="100"  v-for="(data , i) of group15" :key="data.idCampo"  class="pt-2 pb-2" >
                                            <b-row>
                                              <b-col md="10">
                                                <label class="font-weight-bold">
                                                  <b-icon icon="arrow-right-circle-fill" />
                                                    {{data.nombreCampo}}
                                                  </label>
                                                </b-col>
                                                <b-col md="2">
                                                  <b-icon icon="box-arrow-in-up" class="text-success icon-select" v-b-tooltip title="Actualizar valor" @click="actualizarValor(group15[i])"/>
                                                </b-col>
                                              </b-row>
                                    <b-form-input :value="data.valor" v-model="group15[i].valor" v-if="data.valor.length<30"></b-form-input>
                                    <b-form-textarea v-else rows="3" :value="data.valor" v-model="group15[i].valor"></b-form-textarea>

                          </b-col>

            </b-container>
          </b-collapse>
        </b-card><!--End grupo 15-->        


      </div>
    </b-col>
  </b-row>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from "vue-property-decorator";
import * as vfServicio from "@/services/sistema/valoresfijos";
import * as nfServices from "@/utilities/notificaciones";
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import 'vue2-datepicker/locale/es';
import moment from "moment";
import {formatNumber, formatToDecimal} from "@/utilities/formatters";
import {almacenarConceptos} from "@/services/sistema/valoresfijos";

@Component({
  components: {
    DatePicker
  }
})
export default class ValoresFijos extends Vue {
  private dateFormat = "MMMM DD [de] YYYY";

  @Prop() portafolio: string;
  private group1 : Array<any> = [];
  private group2 : Array<any> = [];
  private group3 : Array<any> = [];
  private group4 : Array<any> = [];
  private group5 : Array<any> = [];
  private group6 : Array<any> = [];
  private group7 : Array<any> = [];
  private group8 : Array<any> = [];
  private group10 : Array<any> = [];
  private group11 : Array<any> = [];
  private group12 : Array<any> = [];
  private group13 : Array<any> = [];
  private group14 : Array<any> = [];
  private group15 : Array<any> = [];


  private momentFormatter: any = {
    stringify: (date: Date) => {
      return moment(date).format(this.dateFormat);
    },
    parse: (value: string) => {
      return moment(value, this.dateFormat).toDate();
    }
  };
  private maxLengthOtrosFactores= 5;
  private empty = "";
  private sign = "$";
  private commareg = /,/gi;
  private comma = ",";
  private dot = ".";
  private percent = "%";
  private conceptos: Array<any> = [
    { value: 1, text: 'Comisión fija para portafolios abiertos', disabled: false },
    { value: 2, text: 'Comisión fija por saldo en alternativas de inversión especiales', disabled: false },
    { value: 3, text: 'Comisión fija por sanción de retiro', disabled: false },
    { value: 4, text: 'Comisión fija sobre aporte inicial', disabled: false },
    { value: 5, text: 'Comisión variable por desempeño o comisión variable por éxito sobre rendimientos adicionales', disabled: false }
  ];
  private basescomision: Array<any> = [
    { value: 1, text: 'Activos administrados' },
    { value: 2, text: 'Rendimientos abonados o valor del retiro' }
  ];

  private factoresInversion: Array<any> = [
  ];
  
  private conceptosSelected: Array<number> = [];
  private basesSelected: Array<number> = [];
  private porcentaje: Array<string> = [];
  
  private factoresInversionSelected: Array<string> =[];
  private porcentajeInversion: Array<string> = []; 

  private qtyConceptos = 0;
  private qtyOtrosFactores = 0;
   @Watch("qtyOtrosFactores")
  onFactoresValueChange(val: number): void {
    if(val >= this.maxLengthOtrosFactores)
      this.qtyOtrosFactores = this.maxLengthOtrosFactores;
  };
  @Watch("qtyConceptos")
  onValueChange(val: number): void {
    const max = this.conceptos.length;
    if(val >= max)
      this.qtyConceptos = max;
  };
  onValueChanged(e: any, data: any): void {
    data.valor = this.validateInputValue(e);
  };
  validatePercentValue(e: any, i: number): void {
    const val = this.removeSigns(e);
    if(isNaN(Number.parseFloat(val))) {
      this.group1[i].valor = "N/A"
    } else {
      this.group1[i].valor = formatToDecimal(Number.parseFloat(val))
    }
  }
  validatePercentValueInversion(e: any, i: number): void {
    const val = this.removeSigns(e);
    if(isNaN(Number.parseFloat(val))) {
      this.porcentajeInversion[i] = "N/A"
    } else {
      this.porcentajeInversion[i] = formatToDecimal(Number.parseFloat(val))
    }
  }
  validatePercentValueComision(e: any, i: number): void {
    const val = this.removeSigns(e);
    if(isNaN(Number.parseFloat(val))) {
      this.porcentaje[i] = "N/A"
    } else {
      this.porcentaje[i] = formatToDecimal(Number.parseFloat(val))
    }
  }
  onValueChangedPorcMoneda(e: any, i: number): void {
    const value = this.group1[i].valor;
    let sign = this.group1[i].radio || this.percent;
    const formatted = this.validateInputValue(value);
    let final: any;
    if("N/A" === formatted) {
      final = formatted;
      sign = "";
    } else {
      final = (this.sign === sign ? this.sign : this.empty) + formatted + (this.percent === sign ? this.percent : this.empty);
    }
    this.group1[i].radio = sign;
    this.group1[i].valor = final;
  };
  validateInputValue(str: string): string {
    if(str.startsWith(this.sign) || str.includes(this.percent) || str.includes(this.comma) || str.includes(this.dot)) {
      str = this.removeSigns(str);
    }
    if(isNaN(Number.parseInt(str))) {
      return "N/A";
    }
    return formatNumber(Number.parseInt(str), "decimal");
  };
  removeSigns(str: string): string {
    return str.replace(this.commareg, this.empty)
      .replace(this.sign, this.empty)
      .replace(this.percent, this.empty);
  };
  isNumber(e: KeyboardEvent): void {
    if("KeyN" != e.code && !e.code.includes("Digit")) {
      e.preventDefault();
    }
  };
  isPercent(e: KeyboardEvent): void {
    if("KeyN" != e.code && "Period" != e.code && !e.code.includes("Digit")) {
      e.preventDefault();
    }
  };
  capitalize(e: string, i: number): void {
      const fc = e.charAt(0).toUpperCase();
      const rest = e.slice(1).toLowerCase();
      this.group3[i].valor = fc + rest;
  }
  capitalizeValoresFijos(e: string, i: number): void {
      const fc = e.charAt(0).toUpperCase();
      const rest = e.slice(1).toLowerCase();
      this.group14[i].valor = fc + rest;
  }
  deleteConcepto(i: number): void {
    if(this.conceptosSelected[i] != null || this.conceptosSelected[i] != undefined) {
      const concepto = this.conceptos.find(el => el.value === this.conceptosSelected[i]);
      concepto.disabled = false;
      this.conceptosSelected.splice(i, 1);
      this.basesSelected.splice(i, 1);
      this.porcentaje.splice(i, 1);
    }
    this.qtyConceptos--;
  };
  onChangeConcepto(): void {
    this.conceptos.forEach(el => el.disabled = false);
    this.conceptosSelected.forEach(el => {
      const concepto = this.conceptos.find(e => e.value === el);
      concepto.disabled = true
    })
  };
  async guardarConceptos() {
    nfServices.enviarNotificacion("Almacenando conceptos por portafolio","info");
    const con = this.conceptosSelected.length;
    const bas = this.basesSelected.length;
    const porc = this.porcentaje.length;

    if(con != bas || con != porc) {
      nfServices.enviarNotificacion("Error... alguno de los conceptos no esta correctamente diligenciado", "danger")
      return;
    }
    const conceptosToSave: Array<any> = [];
    this.conceptosSelected.forEach((v, i) => {
      const c = this.conceptos.find(el => el.value === v);
      const b = this.basescomision.find(el => el.value === this.basesSelected[i]);
      const concepto = {
        "concepto": c.text,
        "base": b.text,
        "porcentaje": this.porcentaje[i]
      };
      conceptosToSave.push(concepto);
    })

    const data = {
      "portafolio": this.portafolio,
      "conceptos": conceptosToSave
    };
    await vfServicio.almacenarConceptos(data);
    nfServices.enviarNotificacion("Conceptos almacenados correctamente","success");
  }
  async guardarFactorInversion() {
    nfServices.enviarNotificacion("Almacenando factor inversion por portafolio","info");
    const factor = this.factoresInversionSelected.length;
    const porc = this.porcentajeInversion.length;
    if(factor >this.maxLengthOtrosFactores){
      nfServices.enviarNotificacion("Error... no se puede tener mas de 4 factores", "danger")
      return;
    }
    if(factor != porc || factor != porc) {
      nfServices.enviarNotificacion("Error... alguno de los factores no esta correctamente diligenciado", "danger")
      return;
    }
    
    const factorInversionToSave: Array<any> = [];
    for(let _i=0; _i<=this.qtyOtrosFactores-1;_i++){
      const factorInversion = {
        "factorInversion": this.factoresInversionSelected[_i],
        "porcentaje": this.porcentajeInversion[_i]
      };
    factorInversionToSave.push(factorInversion);
    }
    
    /*this.factoresInversionSelected.forEach((v, i) => {
      const f = this.factoresInversion.find(el => el.value === v);
      const concepto = {
        "factorInversion": f.text,
        "porcentaje": this.porcentaje[i]
      };
      factorInversionToSave.push(concepto);
    })*/

    const data = {
      "portafolio": this.portafolio,
      "factoresInversion": factorInversionToSave
    };
    await vfServicio.almacenarOtrosFactoresInversion(data);
    nfServices.enviarNotificacion("Otros Factores Inversion almacenados correctamente","success");
  }

  deleteFactorInversion(i: number): void {
    if(this.factoresInversionSelected[i] != null || this.factoresInversionSelected[i] != undefined) {
      //const factorInversion = this.factoresInversionSelected
      //this.factoresInversion.find(el => el.value === this.factoresInversionSelected[i]);
      //factorInversion.disabled = false;
      this.factoresInversionSelected.splice(i, 1);
      this.porcentajeInversion.splice(i, 1);
    }
    this.qtyOtrosFactores--;
  };

 /* onChangeFactorInversion(): void {
    this.factoresInversion.forEach(el => el.disabled = false);
    this.factoresInversionSelected.forEach(el => {
      const factorInversion= this.factoresInversion.find(e => e.value === el);
      factorInversion.disabled = true
    })
  };
*/


  async mounted() {
    moment.locale('es');
    await this.renderData();
  }
  @Watch("portafolio")
  async onChangeValue(){
    await this.renderData();
  }
  async renderData(){
    if(this.portafolio!=""){
      const data = await vfServicio.obtenerListadoDeValoresFijos(this.portafolio);
      const responseConceptos = await vfServicio.obtenerConceptosComision(this.portafolio);
      const responeOtrosFactores = await vfServicio.obtenerOtrosFactoresPortafolio(this.portafolio);
      this.prepararConceptos(responseConceptos);
      this.prepararOtrosFactores(responeOtrosFactores);
      this.agregarGrupo1(data);
      this.agregarGrupo2(data);
      this.agregarGrupo3(data);
      this.agregarGrupo4(data);
      this.agregarGrupo5(data);
      this.agregarGrupo6(data);
      this.agregarGrupo7(data);
      this.agregarGrupo8(data);
      this.agregarGrupo10(data);
      this.agregarGrupo11(data);
      this.agregarGrupo12(data);
      this.agregarGrupo13(data);
      this.agregarGrupo14(data);
      this.agregarGrupo15(data);


    }else{
      nfServices.enviarNotificacionTime("El valor portafolio se encuentra vacio, recuerda seleccionarlo","warning", 10000);
    }
  }
  prepararConceptos(data: Array<any>): void {
    this.qtyConceptos = data.length;
    let i = 0;
    data.forEach(el => {
      const concepto = this.conceptos.find(c => c.text === el.concepto);
      concepto.disabled = true;
      const indexConcepto = concepto.value;
      const indexBase = this.basescomision.find(c => c.text === el.base).value;
      this.conceptosSelected[i] = indexConcepto;
      this.basesSelected[i] = indexBase;
      this.porcentaje[i] = el.porcentaje;
      i++
    })
  }
  prepararOtrosFactores(data: Array<any>): void {
    this.qtyOtrosFactores = data.length;
    let i = 0;
    
    data.forEach(el => {
      /*const factorInversion = this.factoresInversion.find(c => c.text === el.factorInversion);
      factorInversion.disabled = true;
      const indexfactorInversion = factorInversion.value;
      this.factoresInversionSelected[i] = indexfactorInversion;
      this.porcentajeInversion[i] = el.porcentaje;
      i++*/
      this.factoresInversionSelected[i] = el.factorInversion;
      this.porcentajeInversion[i] =el.porcentaje;
      
      i++
    })
  }
  agregarGrupo1(data: Array<any>){
    const listagrupo = [5,10,11,12,13,14,15,16,17,18,19,72,73,74]
    this.group1 = data.filter(item => listagrupo.includes(item.idCampo))
  }
  agregarGrupo2(data: Array<any>){
    const listagrupo = [28,29,75,76,77]
    this.group2 = data.filter(item => listagrupo.includes(item.idCampo))
  }
  agregarGrupo3(data: Array<any>){
    const listagrupo = [31,78,79,80]
    this.group3 = data.filter(item => listagrupo.includes(item.idCampo))
  }
  agregarGrupo4(data: Array<any>){
    const listagrupo = [45,46,47,48]
    this.group4 = data.filter(item => listagrupo.includes(item.idCampo))
  }
  agregarGrupo5(data: Array<any>){
    const listagrupo = [50]
    this.group5 = data.filter(item => listagrupo.includes(item.idCampo))
  }
  agregarGrupo6(data: Array<any>){
    const listagrupo = [52,53,54,55,56,57]
    this.group6 = data.filter(item => listagrupo.includes(item.idCampo))
  }
  agregarGrupo7(data: Array<any>){
    const listagrupo = [59,60,61,62,63,64,65,66,67,68,69,70]
    this.group7 = data.filter(item => listagrupo.includes(item.idCampo))
  }
  agregarGrupo8(data: Array<any>){
    const listagrupo = [71]
    this.group8 = data.filter(item => listagrupo.includes(item.idCampo))
  }
  agregarGrupo10(data: Array<any>){
    const listagrupo = [82]
    this.group10 = data.filter(item => listagrupo.includes(item.idCampo))
  }
  agregarGrupo11(data: Array<any>){
    const listagrupo = [null]
    this.group11 = data.filter(item => listagrupo.includes(item.idCampo))
  }
  agregarGrupo12(data: Array<any>){
    const listagrupo = [84]
    this.group12 = data.filter(item => listagrupo.includes(item.idCampo))
  }
  agregarGrupo13(data: Array<any>){
    const listagrupo = [null]
    this.group13 = data.filter(item => listagrupo.includes(item.idCampo))
  }
  agregarGrupo14(data: Array<any>){
    const listagrupo = [89]
    this.group14 = data.filter(item => listagrupo.includes(item.idCampo))
  }
  agregarGrupo15(data: Array<any>){
    const listagrupo = [30]
    this.group15 = data.filter(item => listagrupo.includes(item.idCampo))
  }


  async actualizarValor(data: any){
    nfServices.enviarNotificacion("Actualizando valor","info");
    data.valor = new String(data.valor).toString().trim();
    const respuesta = await vfServicio.actualizarValorFijo(data);
    if(respuesta!=null){
      nfServices.enviarNotificacion("Valor actualizado correctamente","success");
    }
  }
}
</script>

<style scoped lang="stylus">
.icon-select
  cursor pointer
.full-witdh
  width: 100%
.row-margin
  margin-bottom 10px
</style>
