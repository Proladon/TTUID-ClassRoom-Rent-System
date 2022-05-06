const deparments: any = {
  IndustrialDesign:{
    name: '設計學院 - 攝影棚借用表單',
    code: 'IndustrialDesign',
  },
  MechanicalEngineering: {
    name: '機械系 - 設備/教室借用表單',
    code: 'MechanicalEngineering'
  },
}

const env = process.env.NODE_ENV
if(env === 'development') deparments.Dev = {
  name: 'DEV',
  code: 'Dev'
}

export default deparments