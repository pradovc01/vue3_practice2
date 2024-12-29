<template>
    <div>
      <Modal v-model:modelValue="showModalNuevo"> 
        <RegisterPrestamoView @on-register="onRegister($event)" />
      </Modal>
      <Modal v-model:modelValue="showModalEdit">
        <EditPrestamoView @on-update="onUpdate($event)" :item="itemEdit" />
      </Modal>
  
      <h1>Lista Prestamos</h1>
      <button @click="showModalNuevo=true" class="btn btn-primary">Nuevo</button>
      <button @click="buscar()" class="btn btn-lithn" style="float:right"><i class="bi bi-search">Buscar</i></button>
      <input type="search" style="float:right" v-model="textToSearch" @search="buscar" placeholder="Buscar por nombre">
      <div class="table-responsive">
      <table >
          <thead>
              <tr>
                  <th> Codigo Factura</th>
                  <th> Nombre</th>
                  <th> Fecha de Prestamo</th>
                  <th> Capital</th>
                  <th> Interes (%)</th>
                  <th> Activo</th>
                  <th> Almacen</th>
                  <th> </th>
                  <th> </th>
                  <th> </th>
              </tr>
          </thead>
          <tbody class="table-group-divider" id="contenido">            
              <tr v-for="(item,index) in itemList" :key="item.id">
                  <td>{{ item.codigo_factura }}</td>
                  <td>{{ item.cliente.nombre }} </td>
                  <td>{{ item.fecha_prestamo }}</td>
                  <td>{{ item.capital }}</td>
                  <td>{{ item.ganancia.interes }} %</td>
                  <td>{{ item.activo }}</td>
                  <td>{{ item.en_almacen }}</td>
                  <td>
                     <router-link :to="{path:'pago_prestamo/'+item.id}" activeClass="border-indigo-500">
                      <i> Ver Pagos</i>
                     </router-link> &nbsp;
                     
                  </td>
                  <td>
                      <button @click="itemToEdit(item)" class="btn btn-dark" style="margin-right: 15 px">
                        <i class="bi bi-pen">Editar</i></button>
                  </td>
                  
                  <td>
                      <button @click="itemToDelete(item.id)" class="btn btn-danger"><i class="bi bi-trash">Borrar</i></button>
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
  import RegisterPrestamoView from './RegisterPrestamoView.vue'
  import EditPrestamoView from './EditPrestamosView.vue';
  export default {
      name: 'Cliente',
      data() {
          return {
              showModalNuevo: false,
              showModalEdit: false,
              itemEdit: null,
              textToSearch:'',
              itemList:[]
          }
      },
      components: {
          Modal,
          RegisterPrestamoView,
          EditPrestamoView
      },
      computed: {
          ...mapGetters(['getBaseUrl']),
          baseUrl() {          
              return this.getBaseUrl
          }
      },    
      methods: {
          // Define your methods here
            getList(){
              const vm = this;            
              this.axios.get(this.baseUrl+"/prestamos?_expand=cliente&_expand=prenda&_expand=ganancia")
              .then((response)=>{
                  if(this.textToSearch){
                    vm.itemList = vm.itemList.filter(function(item){
                      return item.cliente.nombre.toLowerCase().includes(vm.textToSearch.toLowerCase());
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
                  this.axios.delete(this.baseUrl + "/prestamos/" + id)
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
          this.getList();
      }
      
  }
  </script>
  
  <style> </style>