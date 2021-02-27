<template>
    <p class="app-title">
        <b>工設系攝影教室租借線上申請表單</b>
    </p>
   
    <p>TTUID Online ClassRoom Renting Form</p>

    <div class="info-btn-wrapper">
        <div class="info-btn rules"><b>規定及事項</b></div>
        <div class="info-btn info"><b>關於</b></div>
    </div>

  <Home />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Home from './components/Home.vue';

export default defineComponent({
  name: 'App',
  components: {
    Home
  }
});
</script>

<style lang="scss">

@mixin btn($color){
    cursor: pointer;
    color: rgb(85, 85, 85);
    margin-top: 10px;
    padding: 5px;
    border-radius: 5px;
    background-color: $color;
}

html,body,#app{
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    background: rgb(76, 85, 97);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #b1b1b1;
}

.info-btn-wrapper{
    
    display: flex;
    justify-content: center;
    gap: 10px;

    .info-btn{
        @include btn(rgb(240, 200, 126));
        box-shadow: 5px 5px 10px 1px rgb(38, 38, 38);
    }
}

.app-title{
    font-size: 20px;
}
</style>
