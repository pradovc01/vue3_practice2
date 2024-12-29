<template>
  <div class="container">
    <Menu>
        <router-link to="/">Home</router-link>         
        <router-link to="/cliente">Clientes</router-link> 
        <router-link to="/prestamo">Prestamos</router-link>         
        <!--router-link to="/prestamo">Prestamos</!--router-link> |-->
        <router-link to="/interes">Tasa Interes</router-link> 
        <!--outer-link to="/usuario">Usuarios</!--router-link-->
    </Menu>
    <div>
      <router-view/>
    </div>
  </div>
</template>
<script>
import Menu from './components/Menu.vue'
export default{
  name: 'App',
  data() {
    return {
    }
  },
  components: {
    Menu
  }
}
</script>
<style lang="scss">
.container{
  padding-top: 90px;
}
</style>
