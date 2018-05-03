import axios from 'axios'
import config from '../../../config'


export function postSignUp (value) {

    return {
        type: "DATA_REGISTER",
        payload:axios({
            method:"POST",
            url:`https://api.backendless.com/88269424-FF0F-6299-FFAD-98ED78564100/E87E9DE8-BEB5-B6A8-FF2F-758B1D210D00/data/users`,
            data:value
        })
    };
};