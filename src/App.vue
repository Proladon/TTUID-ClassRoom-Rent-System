<template>
    <p class="app-title">
        <b>工設系攝影教室租借線上申請表單</b>
    </p>
   
    <p>TTUID Online ClassRoom Renting Form</p>

    <div class="info-btn-wrapper">
        <div class="info-btn info" @click="showRules = !showRules"><b>🔰 規定及事項</b></div>
        <div class="info-btn rules" @click="showInfo = !showInfo"><b>❔ 關於</b></div>
    </div>

    <vue-final-modal v-model="showRules">
        <div 
        class="modal-container modal-wrapper"
        >
            <p><strong>🔰 規定及事項</strong></p>
            
            <hr style="background-color: rgb(45, 56, 72); border:none; height: 1px;">
            <p><strong>▪ 申請日期</strong></p>
            <span>請於三個禮拜前申請借用</span>
            <br>
            <span>例如: 欲於10/31借用攝影棚，請於10/10前申請</span>
        </div>
    </vue-final-modal>

    <vue-final-modal v-model="showInfo">
        <div 
        class="modal-container modal-wrapper"
        >
            <p><strong>❔ 關於</strong></p>
            
            <hr style="background-color: rgb(45, 56, 72); border:none; height: 1px;">
            <p><strong>💻 開發者</strong></p>
            <span>工設所某位已畢業學長</span>
            <br>
            <span>啾咪 (oﾟvﾟ)ノ</span>
            <br><br>
            <p><strong>📧 Bug回報 & 聯絡窗口</strong></p>
            <span>請聯繫系辦 范家瑜 謝謝</span>
            
        </div>
    </vue-final-modal>

  <Home />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Home from './components/Home.vue';

export default defineComponent({
  name: 'App',
  components: {
    Home,
  },

  setup(){
      const showInfo = ref<boolean>(false)
      const showRules = ref<boolean>(false)
      return{
          showInfo,
          showRules,
      }
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


.modal-container {
    width: 250px;
    padding: 30px;
    margin-top: 150px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: auto;
    border-radius: 10px;
    box-shadow: 5px 5px 20px 5px rgb(38, 38, 38);
}

.modal-wrapper{
    color: rgb(45, 56, 72);
    background-color: rgb(182, 182, 182);
}



</style>
