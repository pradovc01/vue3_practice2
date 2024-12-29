<template>
    <div>      
      <Modal v-model:modelValue="showModalEdit">
        <EditInteresView @on-update="onUpdate($event)" :item="itemEdit" />
      </Modal>
  
      <h1>Lista Tasa de Interes</h1>                  
      <div class="table-responsive">
      <table clas ="table table-bordered table-hover">
          <thead>
              <tr>
                  <th> ID</th>
                  <th> Monto minimo</th>
                  <th> Monto Maximo</th>
                  <th> Interes (%)</th>
                  <th></th>                  
              </tr>
          </thead>
          <tbody class="table-group-divider" id="contenido">            
              <tr v-for="(item,index) in itemList" :key="item.id">
                  <td>{{ 1 + index }}</td>
                  <td>{{ item.monto_minimo }} </td>
                  <td>{{ item.monto_maximo }}</td>
                  <td>{{ item.interes }}</td>                  
                  <td>
                      <button @click="itemToEdit(item)" class="btn btn-dark" style="margin-right: 15 px"><i class="bi bi-pen">Editar</i></button>
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
  import EditInteresView from './EditInteresView.vue';
  export default {
      name: 'InteresView',
      data() {
          return {              
              showModalEdit: false,
              itemEdit: null,              
              itemList:[]
          }
      },
      components: {
          Modal,          
          EditInteresView
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
              this.axios.get(this.baseUrl+"/ganancias")
              .then((response)=>{                  
                    vm.itemList = response.data;
              })
              .catch(function(error){
                  console.log("Error:"+error);
              });
            },            
            showToast(message,type) {
              console.log("showToast");
              this.$toast.show(message, type);
            },
            itemToEdit(item) {
              this.itemEdit = Object.assign({}, item);
              this.showModalEdit = true;
            },            
            onUpdate(event) {
              console.log("update intereses");
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