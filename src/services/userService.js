import axios from "../axios"
 const handleLoginAPI= (email,password)=>{
    return axios.post('/api/login',{
        email:email, password:password
    })
}
const getAllUsers=(inputID)=>{
    return axios.get(`/api/get-all-user?id=${inputID}`)
}
export{handleLoginAPI,getAllUsers}