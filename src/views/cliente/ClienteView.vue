<template>
  <div>
    <Modal v-model:modelValue="showModalNuevo"> 
      <RegisterClientView @on-register="onRegister($event)" />
    </Modal>
    <Modal v-model:modelValue="showModalEdit">
      <EditClientView @on-update="onUpdate($event)" :item="itemEdit" />
    </Modal>

    <h1>Lista Clientes</h1>
    <button @click="showModalNuevo=true" class="btn btn-primary">Nuevo</button>
    <button @click="buscar()" class="btn btn-lithn" style="float:right"><i class="bi bi-search">Buscar</i></button>
    <input type="search" style="float:right" v-model="textToSearch" @search="buscar" placeholder="Buscar por nombre">
    <div class="table-responsive">
    <table>
        <thead>
            <tr>
                <th> ID</th>
                <th> Nombre</th>
                <th> CI</th>
                <th> Direccion</th>
                <th> telefono</th>
                <th> Nota</th>
                <th></th>
                <th></th>
            </tr>
        </thead>
        <tbody class="table-group-divider" id="contenido">            
            <tr v-for="(item,index) in itemList" :key="item.id">
                <td>{{ 1 + index }}</td>
                <td>{{ item.nombre }} </td>
                <td>{{ item.ci }}</td>
                <td>{{ item.direccion }}</td>
                <td>{{ item.telefono }}</td>
                <td>{{ item.nota }}</td>
                <td>
                    <button @click="itemToEdit(item)" class="btn btn-dark" style="margin-right: 15 px"><i class="bi bi-pen">Editar</i></button>
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
import RegisterClientView from './RegisterClientView.vue'
import EditClientView from './EditClientView.vue';
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
        RegisterClientView,
        EditClientView
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
            this.axios.get(this.baseUrl+"/clientes")
            .then((response)=>{
                if(this.textToSearch){
                  vm.itemList = vm.itemList.filter(function(item){
                    return item.nombre.toLowerCase().includes(vm.textToSearch.toLowerCase());
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
                this.axios.delete(this.baseUrl + "/clientes/" + id)
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