<template>
        <div id="home">
            <div class="rent-calssroom-form">
                <div class="form-input-container">
                    <div class="input-wrapper">
                        <p class="input-title">課程名稱</p>
                        <input type="text" 
                            v-model="formInputData.classes"
                        >
                    </div>

                    <div class="input-wrapper">
                        <p class="input-title">授課教師</p>
                        <input type="text" 
                            v-model="formInputData.teacher"
                        >
                    </div>

                    <div class="input-wrapper">
                        <p class="input-title">用途</p>
                        <input type="text" 
                            v-model="formInputData.description"
                        >
                    </div>

                    <div class="input-wrapper">
                        <p class="input-title">借用器材</p>
                        <input type="text" 
                            v-model="formInputData.toolsRent"
                            placeholder="觸發器、打光燈、..."
                        >
                    </div>

                    <div class="input-wrapper">
                        <p class="input-title">借用人 Email</p>
                        <input type="email" 
                            v-model="formInputData.userMail" 
                            id="input_email"
                            placeholder="user@gmail.com" 
                        >
                    </div>
                </div>

                <div class="input-wrapper">
                    <div class="form-input-container">
                            <input class="user-name" type="text"  v-model="formInputData.applyUser.name" placeholder="借用人">
                            <input class="class-number" type="text" v-model="formInputData.applyUser.classNum" placeholder="班級座號">
                            <input class="student-id" type="text" v-model="formInputData.applyUser.studentID" placeholder="學號">
                            <input class="phone" type="text" v-model="formInputData.applyUser.phone" placeholder="電話">
                    </div>
                    <div class="form-input-container">
                            <input class="user-name" type="text" v-model="formInputData.agentUser.name" placeholder="代理人">
                            <input class="class-number" type="text" v-model="formInputData.agentUser.classNum" placeholder="班級座號">
                            <input class="student-id" type="text" v-model="formInputData.agentUser.studentID" placeholder="學號">
                            <input class="phone" type="text" v-model="formInputData.agentUser.phone" placeholder="電話">
                    </div>
                    
                    <hr>
                    <ArrayInput v-model:formInputData="formInputData" />
                </div>
                
                <div class="input-wrapper">
                    <p class="input-title">欲借用日期</p> 
                    <input type="date"
                        id="input_rentDate"
                        v-model="formInputData.rentDate"
                        @change="checkDate($event)"
                    >
                    <p id="warn-p">註: 只能借用未來3周內的時間</p>

                    <p class="input-title">借用時段</p>
                    <div class="time-period-select" @click="selectPeriod($event)">
                        <div class="time-period" v-for="(period, index) in timePeriod" :key="period" :id="`time-${index}`">{{period}}</div>
                    </div>
                </div>
                
                <div class="btn submit-btn" @click="submit"><b>提交申請</b></div>
            </div>

        </div>

        <div class="info-btn-wrapper">
            <div class="btn info-btn info" @click="reload"><b>🔄 重整日曆</b></div>
        </div>

        <iframe src="https://calendar.google.com/calendar/embed?src=proladon%40gmail.com&ctz=Asia%2FTaipei"
            id="Calendar"
            style="border: none" width="800" height="600" frameborder="0" scrolling="yes"></iframe>


</template>

<script lang="ts">
   import {watch, defineComponent, reactive} from 'vue'
   import Joi from 'joi'
   import { useToast } from "vue-toastification"
   import emailjs from 'emailjs-com'
   import{ init } from 'emailjs-com';
   import date from 'date-and-time';
   import {formValidation} from '../validation/form_validation'
   import ArrayInput from '../components/ArrayInput.vue'


   export default defineComponent({
       name: 'Home',
       components:{ArrayInput},
       setup(){

           init("user_x0clkplkmDu3SDcl9sqEC");
           const toast = useToast()
           const timePeriod = reactive<Array<string>>([
               '08:10 ~ 11:30', 
               '13:00 ~ 16:30', 
               '17:00 ~ 22:00',
               '全天'
           ])

           const formInputData = reactive({
               classes: '',
               teacher: '',
               description: '',
               toolsRent: '',

               userMail: '',
               applyUser: {
                   name: '',
                   classNum: '',
                   studentID: '',
                   phone: ''
               },

               agentUser:{
                   name: '',
                   classNum: '',
                   studentID: '',
                   phone: ''
               },
               classMate:[],
               applyDate: date.format(new Date(), 'YYYY-MM-DD'),
               rentDate: '',
               TimePeriod: '',
           })

            const selectPeriod = (e: Event): void =>{
                const target: HTMLDivElement = (e.target as HTMLDivElement)
                if(target.className === 'time-period-select') return

                Array.from(document.getElementsByClassName('time-period'))
                    .forEach(element => {
                        element.classList.remove('selected')
                    });
                
                target.classList.add('selected')

                formInputData.TimePeriod = target.innerHTML
            }

            const checkDate = (e: Event): void =>{
                const rentDate = new Date((e.target as HTMLInputElement).value)
                const today = new Date(formInputData.applyDate)
                const sub = date.subtract(rentDate, today).toDays()
                const target = (document.getElementById('input_rentDate') as HTMLInputElement)
                console.log(sub)
                if (sub<= 0 || sub > 21){
                    target.classList.add('input-invalid')
                }
                else{
                    target.classList.remove('input-invalid')
                }
            }
           


           const submit = async ()=>{
            //    console.table(formInputData)
               console.log(formInputData)
               
               try {
                   const validation = await formValidation.validate(formInputData)
                   if(validation.error){
                       console.log(validation)
                       toast.error(validation.error.toString())
                       return
                   }
               } 
               catch (error) {
                   toast.error(error)
               }

                let inputInvalid = false
               Array.from(document.getElementsByTagName('input'))
                .forEach(element =>{
                    if(element.classList.contains('input-invalid')){
                        inputInvalid = true
                    }
                })

                if (inputInvalid) return
            
                //send email
                // todo: cooldown
                // emailjs.send('service_7u32gvo','template_sr5lks2', formInputData)
                //     .then(
                //         (response): void=>{
                //             console.log('SUCCESS!', response.status);
                //             toast.success('submit')
                //         }, 
                //         (err): void=>{
                //             toast.error(err)
                //         }
                //     );

                
           }

           watch(
               ()=>formInputData.userMail, 
               async (mail)=>{
                   const validation = Joi.object({
                        eMail: Joi.string()
                            .email({ tlds: {allow: false} })
                            .min(6)
                            .required()
                    })

                   try {
                       const va = await validation.validate({eMail: mail})
                           const target = (document.getElementById('input_email') as HTMLInputElement)
                       if (va.error) {
                            target.classList.add('input-invalid')
                       }
                       else{
                           target.classList.remove('input-invalid')
                       }
                   } catch (error) {
                       toast.success(error)
                   }
               }
            )


            const reload = (): void=>{
                const target: any = (document.getElementById('Calendar') as HTMLIFrameElement)
                const nsrc = target.src
                target.src = nsrc
            }

          
           return{
               date,
               timePeriod,
               submit,
               selectPeriod,
               formInputData,
               checkDate,
               reload
               
           }
       }
   })
</script>

<style scoped lang="scss">

@mixin btn($color){
    cursor: pointer;
    color: rgb(85, 85, 85);
    padding: 5px;
    border-radius: 5px;
    background-color: $color;
}

#home{
    display: flex;
    justify-content: center;
}

iframe{
    width: 80%;
    margin-bottom: 50px;
    border-radius: 5px;
    margin-top: 10px;
}

.rent-calssroom-form{
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    width: 70vh;
    margin: 50px;
    padding: 20px;
    box-shadow: 5px 5px 20px 5px rgb(38, 38, 38);
    border-radius: 10px;

    .input-title{
        text-align: left;
        margin-bottom: 5px;
    }

    .input-note{
        text-align: left;
        margin: 1px;
        color: grey;
        font-size: 12px;
    }
}

.form-input-container{
    flex-wrap: wrap;
}

.time-period{
    @include btn(rgb(170, 170, 170));
}

.time-period-select{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 5px;
}

.selected{
    background-color: rgb(161, 238, 255);
}

#warn-p{
    text-align: left;
    font-size: 12px;
    color:  rgb(250, 85, 129) !important;
}


</style>