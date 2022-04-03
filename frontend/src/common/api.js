

import axios from 'axios'


const callApi = async (url, method = 'get', data = '' ) => {
     
    let result = ''
    switch (method) {
        case 'get':
           await axios.get(url)
            .then(res=> {
                console.log('Api get response',  res.data.data );
                result = res.data.data
            })
            .catch(err => {
                console.log('Api get error',  err );
            })
            break; 
        case 'delete':
           await axios.delete(url)
            .then(res=> {
                console.log('Api get response',  res.data.data );
                result = res.data.data
            })
            .catch(err => {
                console.log('Api get error',  err );
            })
            break; 
        case 'put':
           await axios.put(url, data)
            .then(res=> {
                console.log('Api get response',  res.data.data );
                result = res.data.data
            })
            .catch(err => {
                console.log('Api get error',  err );
            })
            break; 
        case 'post':
           await axios.post(url, data)
            .then(res=> {
                console.log('Api get response',  res.data.data, res.data );
                result = res.data
            })
            .catch(err => {
                console.log('Api get error',  err );
            })
            break; 
        default:
            break;
    }

    return result
}




export {callApi}

