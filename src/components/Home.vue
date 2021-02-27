<template>
            <!-- {{today.getFullYear()}}-{{today.getMonth()}}-{{today.getDate()}} -->
            <br>
        <div id="home">
            <div class="rent-calssroom-form">
                
                <div class="input-wrapper">
                    <p class="input-title">班級</p>
                    <input type="text"
                        v-model="formInputData.classes"
                    >
                </div>
                
                <div class="input-wrapper">
                    <p class="input-title">申請人</p>
                    <input type="text" 
                        v-model="formInputData.userName" 
                        placeholder="申請人"
                    >
                </div>

                <div class="input-wrapper">
                    <p class="input-title">Email</p>
                    <input type="email" 
                        v-model="formInputData.userMail" 
                        id="input_email"
                        placeholder="user@gmail.com" 
                    >
                </div>

                <div class="input-wrapper">
                    <p class="input-title">用途</p>
                    <input type="text" 
                        v-model="formInputData.description"
                    >
                </div>

                <div class="input-wrapper">
                    <p class="input-title">欲租借日期 <span>⚠</span> </p> 
                    <input type="date"
                        id="input_rentDate"
                        v-model="formInputData.rentDate"
                        @change="checkDate($event)"
                    >
                </div>

                <div class="input-wrapper">
                    <p class="input-title">租借時段</p>
                    <div class="time-period-select" @click="selectPeriod($event)">
                        <div class="time-period" v-for="(period, index) in timePeriod" :key="period" :id="`time-${index}`">{{period}}</div>
                    </div>
                </div>
                
                <div class="submit-btn" @click="submit"><b>提交申請</b></div>
            </div>

        </div>


        <iframe src="https://calendar.google.com/calendar/embed?src=proladon%40gmail.com&ctz=Asia%2FTaipei"
            style="border: 0" width="800" height="600" frameborder="0" scrolling="no"></iframe>
</template>

<script lang="ts">
   import {watch, defineComponent, reactive} from 'vue'
   import Joi from 'joi'
   import { useToast } from "vue-toastification"
   import emailjs from 'emailjs-com'
   import{ init } from 'emailjs-com';
   import date from 'date-and-time';
   import {formValidation} from '../validation/form_validation'


   export default defineComponent({
       name: 'Home',
       setup(){

           init("user_x0clkplkmDu3SDcl9sqEC");
           const toast = useToast()
           const timePeriod = reactive<Array<string>>([
               '08:00 ~ 12:00', 
               '12:00 ~ 14:00', 
               '14:00 ~ 16:00'
           ])

           const formInputData = reactive({
               classes: '',
               userName: '',
               userMail: '',
               applyDate: date.format(new Date(), 'YYYY-MM-DD'),
               rentDate: '',
               description: '',
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
                const sub = date.subtract(today, rentDate).toDays()
                const target = (document.getElementById('input_rentDate') as HTMLInputElement)
                
                if (sub < 21){
                    target.classList.add('input-invalid')
                }
                else{
                    target.classList.remove('input-invalid')
                }
            }
           


           const submit = async ()=>{
               console.table(formInputData)
               
               try {
                   const validation = await formValidation.validate(formInputData)
                   if(validation.error){
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
                
                emailjs.send('service_7u32gvo','template_sr5lks2', formInputData)
                    .then(
                        (response): void=>{
                            console.log('SUCCESS!', response.status);
                            toast.success('submit')
                        }, 
                        (err): void=>{
                            toast.error(err)
                        }
                    );
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

          
           return{
               date,
               timePeriod,
               submit,
               selectPeriod,
               formInputData,
               checkDate
               
           }
       }
   })
</script>

<style scoped lang="scss">

@mixin btn($color){
    cursor: pointer;
    color: rgb(85, 85, 85);
    margin-top: 10px;
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
        margin: 1px;
    }

    .input-note{
        text-align: left;
        margin: 1px;
        color: grey;
        font-size: 12px;
    }

    input{
        display: block;
        border-radius: 5px;
        border: none;
        outline-color: rgb(121, 198, 226);
        padding: 5px;
    }

    .input-wrapper{
        margin-bottom: 10px;
    }
}

.time-period{
    width: 100%;
    @include btn(rgb(170, 170, 170));
}

.time-period-select{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 2px;
}

.submit-btn{
    width: 100%;
    @include btn(rgb(168, 226, 121));
}

.selected{
    background-color: rgb(161, 238, 255);
}

.input-invalid{
    // outline: none !important;
    background-color:  rgb(250, 85, 129) !important;
}
</style>