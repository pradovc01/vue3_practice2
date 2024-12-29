<template>
    <div>
      <h1>Editar Pago</h1>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="name">Numero de Factura:</label>
          <input type="text" id="codigo_factura" v-model="form.codigo_factura" :class="{ 'is-invalid': errors.codigo_factura }"
            placeholder="Ingrese numero de factura" />
          <div v-if="errors.codigo_factura" class="invalid-feedback">{{ errors.codigo_factura }}</div>
        </div>
        <div class="form-group">
          <label for="name">Fecha Pago:</label>
          <input type="date" id="fecha" v-model="form.fecha" :class="{ 'is-invalid': errors.ci }"
            placeholder="Ingrese Fecha de Pago" />
          <div v-if="errors.fecha" class="invalid-feedback">{{ errors.fecha }}</div>
        </div>
  
        <div class="form-group">
          <label for="fecha">Cuota:</label>
          <input type="number" step=".01" id="monto" v-model="form.monto" :class="{ 'is-invalid': errors.monto }"
            placeholder="Ingrese cuota a pagar" />
          <div v-if="errors.monto" class="invalid-feedback">{{ errors.monto }}</div>
        </div>
  
        <div class="form-group">
          <label for="descripcion">Descripcion:</label>
          <input type="text" id="descripcion" v-model="form.descripcion" :class="{ 'is-invalid': errors.descripcion }"
            placeholder="Ingrese descripcion"></input>
          <div v-if="errors.descripcion" class="invalid-feedback">{{ errors.descripcion }}</div>
        </div>       
        <button type="submit" class="btn btn-primary">Registrar</button>
      </form>
    </div>
  </template>
    
  <script>
  import { mapState, mapGetters, mapActions } from 'vuex'
  export default {
    name: 'EditClient',
    data() {
      return {
  
        errors: {}
      };
    },
    props: ['item'],
    methods: {      
      validateForm() {
        this.errors = {};
  
        if (!this.form.codigo_factura) {
          this.errors.nomcodigo_facturabre = 'El numero de factura es obligatorio.';
        }
        if(!this.form.fecha){
                this.errors.fecha = 'Fecha de pago es obligatorio'
        }
  
        if (!this.form.monto) {
          this.errors.monto = 'El Monto es obligatorio.';
        } 
  
        if (!this.form.descripcion) {
          this.errors.descripcion = 'Descripcion es obligatoria.';
        }
  
        return Object.keys(this.errors).length === 0;
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
            const vm = this;
            this.axios.patch(this.baseUrl + "/pagos/" + this.item.id, this.form)
            .then(function (response) {
                if (response.status == 200) {
                vm.$emit('on-update', response.data);
                }
                console.log(response); 
            })
            .catch(function (error) {
                console.error(error);
            });
        }
      }
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
  }
  </script>
    
  <style scoped></style>
    