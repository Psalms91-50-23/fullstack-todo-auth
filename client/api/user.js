import request from "superagent"
import axios from "axios"

export const baseURL = "/api/user"

export function register(user){

    return request
    .post(baseURL+"/register")
    .send(user)
    .then((response) => {
        // console.log("response ", response);
        return response.body
    })
    .catch(error => {
        console.log("error ",error.message);
    })
}

export function login(user){

    return request
    .post(baseURL+"/login")
    .send(user)
    .then((response) => {
        // console.log("response ", response);
        return  response.header
        // response.body
    })
    .catch(error => {
        console.log("error ",error.message);
    })
}


export function getUserByEmail(email){

    return request
    .get(baseURL+"/"+email)
    .then((response) => {
        // console.log("get user by email ", response.body);
        return response.body
        // response.body
    })
    .catch(error => {
        console.log("error ",error.message);
    })
}

export function getUserByUID(uid){

    return request
    .get(`${baseURL}/getuser/${uid}`)
    .then( response => {
        // console.log("user by uid ", response.body);
        return response.body
    }).catch(error => {
        console.log("error ",error.message);
    })

}


// export const getUserByUserEmail = async (email) => {
//     try{

//         const user = await axios.get(`http://localhost:3000${baseURL}/${email}`)
//         console.log("req user data ",user);
//         return user

//     }catch(error){
//         console.log("error ",error.message);
//     }

// }

export async function getUserByUserEmail(email){

    try{

        const user = await axios.get(`${baseURL}/${email}`)
        console.log("req user data ",user);
        return user

    }catch(error){
        console.log("error ",error.message);
    }

}

export function logoutUser(){

    const authToken = localStorage.getItem("auth-token")
    return request
    .post(baseURL+"/logout")
    .send(authToken)
    .then(response => {

        console.log("response from backend logout ", response);

    }).catch(error => {
        console.log("error ",error.message);
    })


}



