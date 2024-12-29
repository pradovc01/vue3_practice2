<template>
    <div>
    <h1>Registrar Pago</h1>
    <form @submit.prevent="submitForm()">
      <div class="form-group">
        <label for="numero_factura">Numero de Factura </label>
        <input type="text" id="codigo_factura" v-model="form.codigo_factura" :class="{ 'is-invalid': errors.codigo_factura }"
          placeholder="Ingrese Numero de Facturae" />
        <div v-if="errors.codigo_factura" class="invalid-feedback">{{ errors.codigo_factura }}</div>
      </div>
      <div class="form-group">
        <label for="fecha_pago">Fecha Pago:</label>
        <input type="date" id="fecha" v-model="form.fecha" :class="{ 'is-invalid': errors.fecha }"
          placeholder="Ingrese fecha de pago" />
        <div v-if="errors.fecha" class="invalid-feedback">{{ errors.fecha }}</div>
      </div>
      <div class="form-group">
        <label for="monto">Cuota:</label>
        <input type="number" step=".01" id="monto" v-model="form.monto" :class="{ 'is-invalid': errors.monto }"
          placeholder="Ingrese monto a pagar"></input>
        <div v-if="errors.monto" class="invalid-feedback">{{ errors.monto }}</div>
      </div>

      <div class="form-group">
        <label for="descripcion">Descripcion:</label>
        <input type="tel" id="phone" v-model="form.descripcion" :class="{ 'is-invalid': errors.descripcion }"
          placeholder="Ingrese descripcion" />
        <div v-if="errors.descripcion" class="invalid-feedback">{{ errors.descripcion }}</div>
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
            form: {
                codigo_factura: '',
                fecha: '',
                monto: '',
                descripcion: '',
                prestamoId: this.$route.params.prestamoId
            },
            errors: {}
        };
    },
    props: ['prestamoId'],
    methods:{
        validateForm(){
            this.errors = {};
            if(!this.form.codigo_factura){
                this.errors.codigo_factura = 'Codigo Factura es obligatorio'
            }
            if(!this.form.fecha){
                this.errors.fecha = 'Fecha de pago es obligatorio'
            }

            if(!this.form.descripcion){
                this.errors.descripcion = 'Descripcion es obligatorio'
            }
            if(!this.form.monto){
                this.errors.monto = 'Cuota es obligatorio'
            } else if (!/^(\+?\d{1,4}[-.\s]?)?(\(?\d{1,4}\)?[-.\s]?)?\d{1,4}([-.\s]?\d{1,9})+$/.test(this.form.monto)) {
                 this.errors.monto = 'El Cuota no es válido.';
            }
            return Object.keys(this.errors).length ===0;
        },
        submitForm(){
            if(this.validateForm()){
                //enviar datos al servidor
                this.save();                
                this.form = {
                    codigo_factura: '',
                    fecha: '',
                    descripcion: '',
                    monto: ''
                }
            }
        },
        save(){
            const vm = this;
            this.form.prestamoId = this.prestamoId;
            console.log("prestamo id: " + this.form.prestamoId);
            this.axios.post(this.baseUrl+'/pagos', this.form)
            .then(function(response){
                if(response.status === 201) {
                    vm.$emit('on-register', response.data);
                }
                console.log (response)
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
        },       
    }
}
</script>
