<template>
    <div class="input-wrapper">
        
        <div class="form-input-container" 
            v-for="(input, index) in formInputData.classMate" 
            :key="`input-${index}`"
        >
            <p class="btn delete-btn" @click="deleteInput($event, index)">×</p>
            <input class="user-name" type="text" v-model="input.name" placeholder="共同使用人">
            <input class="class-number" type="text" v-model="input.classNum" placeholder="班級座號">
            <input class="student-id" type="text" v-model="input.studentID" placeholder="學號">
            <input class="phone" type="text" v-model="input.phone" placeholder="電話">
        </div>

        <div class="btn add-new-btn" @click="addNew">+ 新增共同使用人</div>
    </div>
</template>

<script lang="ts">
    import {defineComponent, reactive} from 'vue'
   export default defineComponent({
       name: 'ArrayInput',
       props:['formInputData'],
       emits: ['update:formInputData'],

       setup(props, { emit }){

           const addNew = ()=>{
               const newUser = {
                   name: '',
                   phone: '',
                   classNum: '',
                   studentID: '',
               }
               const formInputData = props.formInputData.classMate
               formInputData.push(newUser)
           }

           const deleteInput =(e: Event, index: number)=>{
               const formInputData = props.formInputData.classMate
               formInputData.splice(index, 1)
           }

           return{
               addNew,
               deleteInput,
           }
       }
   })
</script>

<style scoped lang="scss">


.input-item-container{
    display: flex;
}


</style>