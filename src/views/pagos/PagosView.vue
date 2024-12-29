<template>
    <div>
      <Modal v-model:modelValue="showModalNuevo"> 
        <RegisterPagosView @on-register="onRegister($event)" :prestamoId="prestamoId" />
      </Modal>
      <Modal v-model:modelValue="showModalEdit">
        <EditPagoView @on-update="onUpdate($event)" :item="itemEdit" />    
      </Modal>
  
        <h1>Lista Pagos</h1>
        <dl class="row">
            <dt class="col-sm-3">Cliente</dt>
            <dd class="col-sm-9">{{prestamo_info.nombre}}</dd>

            <dt class="col-sm-3">CI</dt>
            <dd class="col-sm-9">{{prestamo_info.ci}}</dd>

            <dt class="col-sm-3">Prenda</dt>
            <dd class="col-sm-9">{{prestamo_info.prenda_categoria}}</dd>
            <dt class="col-sm-3">Descripcion de Prenda</dt>
            <dd class="col-sm-9">{{prestamo_info.prenda_descripcion}}</dd>
            <dt class="col-sm-3">Fecha de Prestamo</dt>
            <dd class="col-sm-9">{{prestamo_info.fecha_prestamo}}</dd>
            <dt class="col-sm-3">Numero de pagos</dt>
            <dd class="col-sm-9">{{prestamo_info.numero_cuotas}}</dd>
            <dt class="col-sm-3">Fecha Fin de Prestamo</dt>
            <dd class="col-sm-9">{{prestamo_info.fecha_recojo}}</dd>
            <dt class="col-sm-3">Capital</dt>
            <dd class="col-sm-9">{{prestamo_info.capital}}</dd>
            <dt class="col-sm-3">Interes</dt>
            <dd class="col-sm-9">{{prestamo_info.interes}} %</dd>
            <dt class="col-sm-3">Activo</dt>
            <dd class="col-sm-9">{{prestamo_info.activo}}</dd>
            <dt class="col-sm-3">Vendido</dt>
            <dd class="col-sm-9">{{prestamo_info.vendido}}</dd>
        </dl>
      <button @click="showModalNuevo=true" class="btn btn-primary" v-if="!prestamo_info.vendido">Nuevo</button>
      <button @click="buscar()" class="btn btn-lithn" style="float:right"><i class="bi bi-search">Filtrar</i></button>
      <input type="date" style="float:right" v-model="textToSearch" @search="buscar" placeholder="Filtrar por fecha">


      <div class="table-responsive">        
      <table >
          <thead>
              <tr>
                  <th> Numero Factura</th>
                  <th> Fecha de Pago</th>
                  <th> Monto</th>
                  <th> Descripcion</th>                  
                  <th> </th>
                  <th> </th>                  
              </tr>
          </thead>
          <tbody class="table-group-divider" id="contenido">            
              <tr v-for="(item,index) in itemList" :key="item.id">
                  <td>{{ item.codigo_factura }}</td>
                  <td>{{ item.fecha }} </td>
                  <td>{{ item.monto }}</td>
                  <td>{{ item.descripcion }}</td>
                  
                  <td>
                      <button @click="itemToEdit(item)" class="btn btn-dark" style="margin-right: 15 px">Editar</button>
                  </td>
                  
                  <td>
                      <button @click="itemToDelete(item.id)" class="btn btn-danger">Borrar</button>
                  </td>                    
              </tr>
  
          </tbody>
      </table>
      </div>
  </div>
  </template>
  
  <script>
  import { mapState, mapGetters, mapActions } from 'vuex'
  import Modal from '../../components/Modal.vue'
  import RegisterPagosView from './RegisterPagoView.vue'  
  import EditPagoView from './EditPagoView.vue'  
  export default {
      name: 'Cliente',
      data() {
          return {
              showModalNuevo: false,
              showModalEdit: false,
              itemEdit: null,
              textToSearch:'',
              itemList:[],
              prestamo_info: {
                nombre: '',
                ci: '',
                prenda_categoria: '',
                prenda_descripcion:'',
                fecha_prestamo:'',
                capital:'',
                interes:'',
                numero_cuotas: '',
                fecha_recojo: '',
                activo: true,
                vendido: true
              }
              
          }
      },
      components: {
          Modal,
          RegisterPagosView,
          EditPagoView
          
      },
      computed: {
        ...mapGetters(['getBaseUrl']),
        baseUrl() {          
              return this.getBaseUrl
        },
        prestamoId() {
            console.log("i es:"+this.$route.params.id);
            return this.$route.params.id;
        }
        
      },    
      methods: {
          // Define your methods here
            getPrestamoInfo(){
                const vm = this;    
                this.axios.get(this.baseUrl+"/prestamos/"+this.prestamoId+"?_expand=cliente&_expand=prenda&_expand=ganancia")
                .then((response)=>{                  
                    this.prestamo_info.fecha_prestamo = response.data.fecha_prestamo; 
                    this.prestamo_info.capital = response.data.capital; 
                    this.prestamo_info.nombre = response.data.cliente.nombre;
                    this.prestamo_info.ci = response.data.cliente.ci;
                    this.prestamo_info.prenda_categoria = response.data.prenda.categoria; 
                    this.prestamo_info.interes = response.data.ganancia.interes; 
                    this.prestamo_info.prenda_descripcion = response.data.prenda.descripcion; 
                    this.prestamo_info.numero_cuotas = response.data.numero_cuotas; 
                    this.prestamo_info.fecha_recojo = response.data.fecha_recojo; 
                    this.prestamo_info.activo = response.data.activo;
                    this.prestamo_info.vendido = !response.data.en_almacen;
                    
              })
              .catch(function(error){
                  console.log("Error:"+error);
              });
            },
            getList(){
              const vm = this;    
              //user infor
              //prestamo
              //pagos        
              this.axios.get(this.baseUrl+"/pagos?prestamoId="+ this.prestamoId)
              .then((response)=>{
                  if(this.textToSearch){
                    vm.itemList = vm.itemList.filter(function(item){
                      return item.fecha.includes(vm.textToSearch);
                      
                    });
                  }
                  else
                    vm.itemList = response.data;
              })
              .catch(function(error){
                  console.log("Error:"+error);
              });
            },
            onRegister(event) {
              console.log("on register");
              this.getList();
              this.showModalNuevo = false;
              this.$toast.show('Registro exitoso', 'success')
            },
            showToast(message,type) {
              console.log("showToast");
              this.$toast.show(message, type);
            },

            itemToEdit(item) {
              this.itemEdit = Object.assign({}, item);
              this.showModalEdit = true;
            },
            itemToDelete(id) {
              if (confirm("¿Esta Seguro de eliminar el registro?")) {
                  const vm = this;
                  this.axios.delete(this.baseUrl + "/pagos/" + id)
                      .then(function (response) {
                          console.log(response);
                          vm.getList();
                          vm.$toast.show("Registro eliminado.", "danger");
                      })
                      .catch(function (error) {
                          console.error(error);
                      });
              }            
            },
            buscar() {
              this.getList();
            },
            onUpdate(event) {
              console.log("on update");
              this.getList();
              this.showModalEdit = false;
              this.itemEdit = null;
              this.$toast.show('Edicion exitosa', 'info');
          }
      },
      
      mounted() {          
          this.prestamoId
          this.getPrestamoInfo();
          this.getList();
          
      }
      
  }
  </script>
  
  <style> </style>