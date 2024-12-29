<template>
    <div>
    <h1>Registrar Prestamo</h1>
    <form @submit.prevent="submitForm()">
        <div class="form-group">
        <label for="codigo_factura">Numero Factura:</label>
        <input type="text" id="codigo_factura" v-model="form_prestamo.codigo_factura" :class="{ 'is-invalid': errors.codigo_factura }"
          placeholder="Ingrese codigo de factura"></input>
        <div v-if="errors.codigo_factura" class="invalid-feedback">{{ errors.codigo_factura }}</div>
      </div>

      <div class="form-group">
        <label for="name">Cliente:</label>
        <select id="cliente" v-model="form_prestamo.clienteId" :class="{ 'is-invalid': errors.clienteId }">
              <option v-for="(cliente, index) in clienteList" :key="cliente.id" :value="cliente.id">{{ cliente.nombre }}</option>
  
        </select>
        <div v-if="errors.clienteId" class="invalid-feedback">{{ errors.clienteId }}</div>
      </div>
      <div class="form-group">
        <label for="categoria">Tipo Prenda:</label>
        <select id="categoria" v-model="form_prenda.categoria" :class="{ 'is-invalid': errors.categoria }">
              <option key="JOYA" value="JOYA"> Joya</option>
              <option key="VEHICULO" value="VEHICULO"> Vehiculo</option>
              <option key="MOTOCICLETA" value="MOTOCICLETA"> Motocicleta</option>
  
        </select>        
        <div v-if="errors.categoria" class="invalid-feedback">{{ errors.categoria }}</div>
      </div>
      <div class="form-group">
        <label for="descripcion">Descripcion de la Prenda:</label>
        <input type="text" id="descripcion" v-model="form_prenda.descripcion" :class="{ 'is-invalid': errors.descripcion }"
          placeholder="Ingrese descripcion de la prenda"></input>
        <div v-if="errors.descripcion" class="invalid-feedback">{{ errors.descripcion }}</div>
      </div>
      <div class="form-group">
        <label for="cuotas">Numero de Cuotas a Pagar:</label>
        <input type="number" id="numero_cuotas" v-model="form_prestamo.numero_cuotas" :class="{ 'is-invalid': errors.descripcion }"
          placeholder="Ingrese numero de cuotas"></input>
        <div v-if="errors.numero_cuotas" class="invalid-feedback">{{ errors.numero_cuotas }}</div>
      </div>
      

      <div class="form-group">
        <label for="fecha_prestamo">Fecha de Prestamo:</label>
        <input type="date" id="fecha_prestamo" v-model="form_prestamo.fecha_prestamo" :class="{ 'is-invalid': errors.fecha_prestamo }"
          />
        <div v-if="errors.fecha_prestamo" class="invalid-feedback">{{ errors.fecha_prestamo }}</div>
      </div>

      <div class="form-group">
        <label for="fecha_recojo">Fecha Final a Pagar Prestamo:</label>
        <input type="date" id="fecha_recojo" v-model="form_prestamo.fecha_recojo" :class="{ 'is-invalid': errors.fecha_prestamo }"
          />
        <div v-if="errors.fecha_recojo" class="invalid-feedback">{{ errors.fecha_recojo }}</div>
      </div>

      <div class="form-group">
        <label for="phone">Capital a prestar:</label>
        <input type="number" step=".01"  id="capital" v-model="form_prestamo.capital" :class="{ 'is-invalid': errors.capital }"
          placeholder="Ingrese Capital a prestar" />
        <div v-if="errors.capital" class="invalid-feedback">{{ errors.capital }}</div>
      </div>

      <div class="form-group">
        <label for="ganancia">Tasa Interes:</label>
        <select id="ganancia" v-model="form_prestamo.gananciaId" :class="{ 'is-invalid': errors.gananciaId }">
              <option v-for="(tasa, index) in tasaInteresList" :key="tasa.id" :value="tasa.id">[{{ tasa.monto_minimo }} $us-{{ tasa.monto_maximo }} $us]: {{ tasa.interes }} % </option>
  
        </select>
        <div v-if="errors.gananciaId" class="invalid-feedback">{{ errors.gananciaId }}</div>
      </div>
      <button type="submit" class="btn btn-primary">Registrar</button>
    </form>
  </div>
</template>

<script>
import { apState, mapGetters, mapActions } from 'vuex'
export default {
    name:'RegisterCliente',
    data() {
        return {
            form_prenda: {                
                categoria: '',                
                descripcion: ''                
            },
            form_prestamo: {
                clienteId: '',                
                codigo_factura: '',
                fecha_prestamo: '',
                fecha_recojo: '',
                numero_cuotas: '',
                gananciaId: '',
                capital: '',                                
                categoria: '',
                activo: true,
                en_almacen: true
            },
            clienteList: [],
            tasaInteresList:[],
            errors: {}
        };
    },
    methods:{
        validateForm(){
            this.errors = {};
            if(!this.form_prestamo.clienteId){
                this.errors.clienteId = 'Cliente es obligatorio'
            }
            if(!this.form_prenda.categoria){
                this.errors.categoria = 'Categoria prenda es obligatorio'
            }

            if(!this.form_prestamo.codigo_factura){
                this.errors.codigo_factura = 'Codigo Factura es obligatorio'
            }
            if(!this.form_prestamo.fecha_prestamo){
                this.errors.fecha_prestamo = 'Fecha de Prestamo es obligatorio'
            } 
            if(!this.form_prestamo.fecha_recojo){
                this.errors.fecha_recojo = 'Fecha limite de Prestamo es obligatorio'
            }
            if(!this.form_prestamo.capital){
                this.errors.capital = 'Capital del prestamo es obligatorio'
            } 
            if(!this.form_prenda.descripcion){
                this.errors.descripcion = 'Descripcion de la prenda empeñada es obligatorio'
            }
            if(!this.form_prestamo.gananciaId){
                this.errors.gananciaId = 'Tasa Interes es obligatorio'
            } 

            return Object.keys(this.errors).length ===0;
        },
        submitForm(){
            if(this.validateForm()){
                //enviar datos al servidor
                this.save();                                

            }
        },
        getClienteList() {
            const vm = this;
            this.axios.get(this.baseUrl + "/clientes")
                .then(function (response) {
            vm.clienteList = response.data;
            })
            .catch(function (error) {
            console.error(error);
            });
        },
        getTasaInteresList() {
            const vm = this;
            this.axios.get(this.baseUrl + "/ganancias")
                .then(function (response) {
            vm.tasaInteresList = response.data;
            })
            .catch(function (error) {
            console.error(error);
            });
        },
        save(){
            
            this.axios.post(this.baseUrl+'/prendas', this.form_prenda)
            .then((response)=>{
                if(response.status === 201) {
                    console.log("prenda created:"+response.data);                    
                    this.form_prestamo.prendaId=response.data.id;
                    return this.axios.post(this.baseUrl+'/prestamos', this.form_prestamo);
                }else{
                    throw new Error("Failed to create prenda");
                }                    
            })
            .then((response_prestamo)=>{
                if(response_prestamo.status == 201){
                    console.log("prestamo created:"+response_prestamo.data);
                    this.$emit('on-register', response_prestamo.data);   
                    this.form_prenda = {
                        categoria: '',                
                        descripcion: ''
                    };
                    this.form_prestamo = {
                        clienteId: '',                
                        codigo_factura: '',
                        fecha_prestamo: '',
                        fecha_recojo: '',
                        numero_cuotas: '',
                        gananciaId: '', 
                        capital: '',                    
                        prendaId:'',
                        activo: true,
                        en_almacen: true,
                        prendaId:''
                    }                 
                }
            })            
            .catch(function(error){
                console.error(error);
             });
             
        }
    },
    computed: {
        ...mapGetters(['getBaseUrl']),
        baseUrl() {
            return this.getBaseUrl;
        }
    },
    mounted() {
        this.getClienteList();
        this.getTasaInteresList();
  }

}
</script>