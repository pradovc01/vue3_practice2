<template>
    <div>
      <h1>Editar Interes</h1>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="monto_min">Monto Minimo:</label>
          <input type="number" id="min" v-model="form.monto_minimo" :class="{ 'is-invalid': errors.monto_minimo }"
            placeholder="monot minimo" />
          <div v-if="errors.monto_minimo" class="invalid-feedback">{{ errors.monto_minimo }}</div>
        </div>
        <div class="form-group">
          <label for="monto_max">Monto Maximo</label>
          <input type="number" id="monto_maximo" v-model="form.monto_maximo" :class="{ 'is-invalid': errors.monto_maximo }"
            placeholder="monto maximo" />
          <div v-if="errors.monto_maximo" class="invalid-feedback">{{ errors.monto_maximo }}</div>
        </div>
  
        <div class="form-group">
          <label for="interes">Interes:</label>
          <input type="number" id="interes" v-model="form.interes" step=".01" :class="{ 'is-invalid': errors.interes }"
            placeholder="Ingrese el interes" />
          <div v-if="errors.interes" class="invalid-feedback">{{ errors.interes }}</div>
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
  
        if (!this.form.monto_minimo) {
          this.errors.monto_minimo = 'El monto minimo es obligatorio.';
        }
        if(!this.form.monto_maximo){
                this.errors.monto_maximo = 'El monto maximo es obligatorio'
            }else if  (!/^(\+?\d{1,4}[-.\s]?)?(\(?\d{1,4}\)?[-.\s]?)?\d{1,4}([-.\s]?\d{1,9})+$/.test(this.form.monto_maximo)) {
                this.errors.ci = 'El monto maximo no es valido.';
        }
  
        if (!this.form.interes) {
          this.errors.interes = 'El interes es obligatorio.';
        } else if (!/^(\+?\d{1,4}[..\s]?)?(\(?\d{1,4}\)?[-.\s]?)?\d{1,4}([-.\s]?\d{1,9})+$/.test(this.form.interes)) {
          this.errors.interes = 'El interes no es válido.';
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
            this.axios.patch(this.baseUrl + "/intereses/" + this.item.id, this.form)
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
      ...mapState(['count']),
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
    