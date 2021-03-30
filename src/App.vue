<template>
    <div class="header-container">
        <p class="app-title">
            <b>工設系攝影教室租借線上申請表單</b>
        </p>

        <p>TTUID Online ClassRoom Renting Form</p>

        <div class="info-btn-wrapper">
            <div class="btn info-btn info" @click="showRules = !showRules"><b>🔰 規定及事項</b></div>
            <div class="btn info-btn info"><strong><a href="http://www.id.ttu.edu.tw/ezfiles/74/1074/img/722/105638026.pdf" target="_blank">📄 紙本表單</a></strong></div>
            <div class="btn info-btn rules" @click="showInfo = !showInfo"><b>❔ 關於</b></div>
            <div class="btn func-btn show" @click="horizontal = !horizontal "><b>🔁 切換排版</b></div>
        </div>

        <vue-final-modal v-model="showRules">
            <div  class="modal-container modal-wrapper">
                <p><strong>🔰 規定及事項</strong></p>
                
                <hr style="background-color: rgb(45, 56, 72); border:none; height: 1px;">
                
                <div class="rules-data">
                        <div class="rules-block" v-for="rules in rulesData.rules" :key="rules">
                            <p><strong>{{rules.title}}</strong></p>
                            <p>{{rules.description}}</p>
                        </div>
                        
                        <br>
                        
                        <p><strong>{{rulesData.notice.title}}</strong></p>
                        <p>{{rulesData.notice.description}}</p>
                        
                        <br>

                        <p><strong>使用規範</strong></p>
                        <ol>
                            <li v-for="terms in rulesData.terms" :key="terms">
                                {{terms}}
                            </li>
                        </ol>
                </div>

                <p class="footer"><strong>※ 使用日當天申請不予借用，請提早辦妥借用程序 ※</strong></p>
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

        <vue-final-modal v-model="devTest">
            <div class="modal-container modal-wrapper">
                <input type="text" placeholder="Client">
                <input type="text" placeholder="ServiceID">
                <input type="text" placeholder="TemplateID">
            </div>
        </vue-final-modal>
    </div>


  <Home :horizontal="horizontal" />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import Home from './components/Home.vue';
import rulesJson from "./assets/rules.json";

export default defineComponent({
  name: 'App',
  components: {
    Home,
  },

  setup(){
    //   const Client = 'user_WjYj4YxrXX5vvj4wlw4nv'
    //   const ServiceID = 'cyfan'
    //   const TemplateID= 'template_t8exz6j'

      const rulesData = rulesJson
      const devTest = ref<boolean>(false)
      const showInfo = ref<boolean>(false)
      const showRules = ref<boolean>(true)
      const horizontal = ref<boolean>(false)

      onMounted(()=>{
          const clientScreen = document.body.clientWidth
          if ( clientScreen > 1025) horizontal.value = true
      })


      return{
        //   Client,
        //   ServiceID,
        //   TemplateID,

          devTest,
          showInfo,
          showRules,
          rulesData,
          horizontal,
      }
  }
});
</script>

<style lang="scss">



html,body,#app{
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    background: rgb(76, 85, 97);
    overflow-x: hidden;
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

    a{
        color: #555555;
        text-decoration: none;
    }
}

.app-title{
    font-size: 20px;
}

.vfm__content{
    height: 0;
    display: inline-block;
}

.modal-container {
    width: 250px;
    padding: 30px;
    margin-top: 15%;
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

// 規定事項內文
.rules-data{
    height: 400px;
    overflow-y: scroll;
    text-align: justify;

    .rules-block{
        margin-bottom: 15px;
    }

    li{
        margin-bottom: 7px;
    }
}

.footer{
    margin-top: 5px;
}


@media screen and (min-width: 640px) {
    .modal-container {
        width: 350px;
        padding: 30px;
        margin-top: 15%;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: auto;
        border-radius: 10px;
        box-shadow: 5px 5px 20px 5px rgb(38, 38, 38);
    }

    .rules-data{
        height: 400px;
        padding: 10px;
        overflow-y: scroll;
        text-align: justify;

        .rules-block{
            margin-bottom: 15px;
        }

        li{
            margin-bottom: 7px;
        }
    }
}



@media screen and(max-width: 640px) {
    .show{
        display: none;
    }    
}

</style>
