<template>
    <div>
    <h1>Registrar Cliente</h1>
    <form @submit.prevent="submitForm()">
      <div class="form-group">
        <label for="name">Nombre:</label>
        <input type="text" id="name" v-model="form.nombre" :class="{ 'is-invalid': errors.nombre }"
          placeholder="Ingrese el nombre" />
        <div v-if="errors.nombre" class="invalid-feedback">{{ errors.nombre }}</div>
      </div>
      <div class="form-group">
        <label for="ci">CI:</label>
        <input type="text" id="ci" v-model="form.ci" :class="{ 'is-invalid': errors.ci }"
          placeholder="Ingrese ci del cliente" />
        <div v-if="errors.ci" class="invalid-feedback">{{ errors.ci }}</div>
      </div>
      <div class="form-group">
        <label for="address">Dirección:</label>
        <textarea id="address" v-model="form.direccion" :class="{ 'is-invalid': errors.direccion }"
          placeholder="Ingrese la dirección"></textarea>
        <div v-if="errors.direccion" class="invalid-feedback">{{ errors.direccion }}</div>
      </div>

      <div class="form-group">
        <label for="phone">Teléfono:</label>
        <input type="tel" id="phone" v-model="form.telefono" :class="{ 'is-invalid': errors.telefono }"
          placeholder="Ingrese el teléfono" />
        <div v-if="errors.telefono" class="invalid-feedback">{{ errors.telefono }}</div>
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
                nombre: '',
                ci: '',
                direccion: '',
                telefono: ''
            },
            errors: {}
        };
    },
    methods:{
        validateForm(){
            this.errors = {};
            if(!this.form.nombre){
                this.errors.nombre = 'Nombre es obligatorio'
            }
            if(!this.form.ci){
                this.errors.ci = 'CI es obligatorio'
            }else if  (!/^(\+?\d{1,4}[-.\s]?)?(\(?\d{1,4}\)?[-.\s]?)?\d{1,4}([-.\s]?\d{1,9})+$/.test(this.form.telefono)) {
                this.errors.ci = 'El CI no es válido.';
            }

            if(!this.form.direccion){
                this.errors.direccion = 'Direccion es obligatorio'
            }
            if(!this.form.telefono){
                this.errors.telefono = 'Telefono es obligatorio'
            } else if (!/^(\+?\d{1,4}[-.\s]?)?(\(?\d{1,4}\)?[-.\s]?)?\d{1,4}([-.\s]?\d{1,9})+$/.test(this.form.telefono)) {
                 this.errors.telefono = 'El teléfono no es válido.';
            }
            return Object.keys(this.errors).length ===0;
        },
        submitForm(){
            if(this.validateForm()){
                //enviar datos al servidor
                this.save();                
                this.form = {
                    nombre: '',
                    ci: '',
                    direccion: '',
                    telefono: ''
                }
            }
        },
        save(){
            const vm = this;
            this.axios.post(this.baseUrl+'/clientes', this.form)
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
        }
    }
}
</script>