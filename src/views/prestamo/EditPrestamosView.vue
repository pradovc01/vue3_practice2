<template>
    <div>
      <h1>Editar Prestamo</h1>
      <form @submit.prevent="submitForm">
        <div class="form-group">
            <label for="codigo_factura">Numero Factura:</label>
            <input type="text" id="codigo_factura" v-model="form.codigo_factura" :class="{ 'is-invalid': errors.codigo_factura }"
            placeholder="Ingrese codigo de factura" />
          <div v-if="errors.codigo_factura" class="invalid-feedback">{{ errors.codigo_factura }}</div>
        </div>

        <div class="form-group">
            <label for="name">Cliente:</label>
            <select id="cliente" v-model="form.cliente.id" :class="{ 'is-invalid': errors.clienteId }">
              <option :value="cliente.id" v-for="(cliente, index) in clienteList" :key="cliente.id">{{ cliente.nombre }}</option>
  
            </select>
            <div v-if="errors.clienteId" class="invalid-feedback">{{ errors.clienteId }}</div>
        </div>
        

        <div class="form-group">
        <label for="categoria">Tipo Prenda:</label>
        <select id="categoria" v-model="form.prenda.categoria" :class="{ 'is-invalid': errors.categoria }">
              <option key="JOYA" value="JOYA"> Joya</option>
              <option key="VEHICULO" value="VEHICULO"> Vehiculo</option>
              <option key="MOTOCICLETA" value="MOTOCICLETA"> Motocicleta</option>
  
        </select>        
        <div v-if="errors.categoria" class="invalid-feedback">{{ errors.categoria }}</div>
      </div>

      <div class="form-group">
        <label for="descripcion">Descripcion de la Prenda:</label>
        <input type="text" id="descripcion" v-model="form.prenda.descripcion" :class="{ 'is-invalid': errors.descripcion }"
          placeholder="Ingrese descripcion de la prenda"></input>
        <div v-if="errors.descripcion" class="invalid-feedback">{{ errors.descripcion }}</div>
      </div>
      <div class="form-group">
        <label for="cuotas">Numero de Cuotas a Pagar:</label>
        <input type="number" id="numero_cuotas" v-model="form.numero_cuotas" :class="{ 'is-invalid': errors.descripcion }"
          placeholder="Ingrese numero de cuotas"></input>
        <div v-if="errors.numero_cuotas" class="invalid-feedback">{{ errors.numero_cuotas }}</div>
      </div>

      <div class="form-group">
        <label for="fecha_prestamo">Fecha de Prestamo:</label>
        <input type="date" id="fecha_prestamo" v-model="form.fecha_prestamo" :class="{ 'is-invalid': errors.fecha_prestamo }"
          />
        <div v-if="errors.fecha_prestamo" class="invalid-feedback">{{ errors.fecha_prestamo }}</div>
      </div>
      <div class="form-group">
        <label for="fecha_recojo">Fecha Final a Pagar Prestamo:</label>
        <input type="date" id="fecha_recojo" v-model="form.fecha_recojo" :class="{ 'is-invalid': errors.fecha_prestamo }"
          />
        <div v-if="errors.fecha_recojo" class="invalid-feedback">{{ errors.fecha_recojo }}</div>
      </div>
      <div class="form-group">
        <label for="phone">Capital a prestar:</label>
        <input type="number" step=".01"  id="capital" v-model="form.capital" :class="{ 'is-invalid': errors.capital }"
          placeholder="Ingrese Capital a prestar" />
        <div v-if="errors.capital" class="invalid-feedback">{{ errors.capital }}</div>
      </div>
      <div class="form-group">
        <label for="ganancia">Tasa Interes:</label>
        <select id="ganancia" v-model="form.ganancia.id" :class="{ 'is-invalid': errors.gananciaId }">
              <option v-for="(tasa, index) in tasaInteresList" :key="tasa.id" :value="tasa.id">[{{ tasa.monto_minimo }} $us-{{ tasa.monto_maximo }} $us]: {{ tasa.interes }} % </option>
  
        </select>
        <div v-if="errors.gananciaId" class="invalid-feedback">{{ errors.gananciaId }}</div>
      </div>

      <div class="form-group">
        <label for="activo">Activo:</label>
        <select id="activo" v-model="form.activo" :class="{ 'is-invalid': errors.activo }">
              <option key="true" value="true"> True</option>
              <option key="false" value="false"> False</option>              
  
        </select>        
        <div v-if="errors.activo" class="invalid-feedback">{{ errors.activo }}</div>
      </div>
      <div class="form-group">
        <label for="almacen">En Almacen:</label>
        <select id="almacen" v-model="form.en_almacen" :class="{ 'is-invalid': errors.en_almacen }">
              <option key="true" value="true"> True</option>
              <option key="false" value="false"> False</option>              
  
        </select>        
        <div v-if="errors.en_almacen" class="invalid-feedback">{{ errors.en_almacen }}</div>
      </div>


  
        <button type="submit" class="btn btn-primary">Registrar</button>
      </form>
    </div>
  </template>
    
  <script>
  import { mapState, mapGetters, mapActions } from 'vuex'
  export default {
    name: 'EditPrestamo',
    data() {
      return {
        clienteList: [],
        tasaInteresList:[],
        errors: {}
      };
    },
    props: ['item'],
    methods: {      
      validateForm() {
        this.errors = {};
  
        if(!this.form.clienteId){
                this.errors.clienteId = 'Cliente es obligatorio'
            }
            if(!this.form.prenda.categoria){
                this.errors.categoria = 'Categoria prenda es obligatorio'
            }

            if(!this.form.codigo_factura){
                this.errors.codigo_factura = 'Codigo Factura es obligatorio'
            }
            if(!this.form.fecha_prestamo){
                this.errors.fecha_prestamo = 'Fecha de Prestamo es obligatorio'
            } 
            if(!this.form.fecha_recojo){
                this.errors.fecha_recojo = 'Fecha limite de Prestamo es obligatorio'
            }
            if(!this.form.capital){
                this.errors.capital = 'Capital del prestamo es obligatorio'
            } 
            if(!this.form.prenda.descripcion){
                this.errors.descripcion = 'Descripcion de la prenda empeñada es obligatorio'
            }
            if(!this.form.gananciaId){
                this.errors.gananciaId = 'Tasa Interes es obligatorio'
            } 

            return Object.keys(this.errors).length ===0;
      },
  
      submitForm() {
        if (this.validateForm()) {
          // Enviar los datos al servidor
          this.save();
          // Reiniciar el formulario
        }
      },
      save() {
        if(this.validateForm()){
            const prenda_payload={
                id: this.form.prenda.id,
                categoria: this.form.prenda.categoria,
                descripcion: this.form.prenda.descripcion                
            };
            const prestamo_payload={
                id: this.form.id,
                codigo_factura: this.form.codigo_factura,
                fecha_prestamo: this.form.fecha_prestamo,
                fecha_recojo: this.form.fecha_recojo,
                capital: this.form.capital,                
                activo: this.form.activo,
                en_almacen: this.form.en_almacen,
                clienteId: this.form.clienteId,
                gananciaId: this.form.gananciaId,
                en_almacen: this.form.en_almacen,
                prendaId: this.form.prendaId,                

            }
            this.axios.patch(this.baseUrl + "/prendas/" + prenda_payload.id, prenda_payload)
            .then((response) => {
                if (response.status == 200) {
                    console.log("Prenda actualizada correctamente.");
                    return this.axios.patch(this.baseUrl +"/prestamos/" + prestamo_payload.id, prestamo_payload);
                } else{
                    throw new Error("Failed to update PRenda")
                }               
            })
            .then((prestamoResponse) => {
                if (prestamoResponse.status == 200) {
                    console.log("Prestamo actualizado correctamente."+prestamoResponse.data);
                    this.$emit('on-update', prestamoResponse.data); 
                }
                else{
                    throw new Error("Failed to update Prestamo")
                }

            })
            .catch(function (error) {
                console.error(error);
            });
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
    },
    computed: {
      // propiedades computadas que dependen de otras propiedades reactivas      
      ...mapGetters(['getBaseUrl']),
      baseUrl() {
        return this.getBaseUrl
      },
      form() {
        return Object.assign({}, this.item);
      }
    },
    mounted() {
        this.getClienteList();
        this.getTasaInteresList();
  },
  }
  </script>
    
  <style scoped></style>
    