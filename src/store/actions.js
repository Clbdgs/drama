import * as types from './mutation-types'
import axios from 'axios';
const getUserInfoSync = function (context) {
    axios.get('').then(res=>{
        context.commit(types.SET_USERINFO,res)
    })
}

export default getUserInfoSync
