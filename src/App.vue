<template>
  <div id="app">
    <nav class="navbar polaroid is-dark" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <div class="navbar-item">
          <img src="./assets/logo.png">
        </div>
        <div class="navbar-item">
          <h1 class="is-size-3">Walkie-Talkie</h1>
        </div>
      </div>

      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <button class="button is-light has-text-white" @click="auth.signOut()">
                  <router-link :to="{name:'home'}">Sign Out</router-link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
import {auth} from './firebase'
console.log(auth);

export default {
  name: 'App',
  components: {
  },
  data(){
    return {
      auth
    }
  },
  props:['user']
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.polaroid {
  box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  text-align: center;
}

.navbar-item img{
  border: 1px solid rgb(255, 255, 255);
  border-radius: 50%;
}
</style>
