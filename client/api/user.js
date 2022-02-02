import request from "superagent"
export const baseURL = "/api/user"

export function register(user){
    return request
    .post(baseURL+"/register")
    .send(user)
    .then((response) => {
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
        return  response.header
    })
    .catch(error => {
        console.log("Error password did not match database ",error.message);
    })
}

export function getUserByEmail(email){
    return request
    .get(baseURL+"/"+email)
    .then((response) => {
        if(response.body.error){
            return response.body
        }
        return response.body
    })
    .catch(error => {
        console.log("Error Email does not exists ",error.message);
    })
}

export function getUserByUID(uid){

    return request
    .get(`${baseURL}/getuser/${uid}`)
    .then( response => {
        return response.body
    }).catch(error => {
        console.log("error ",error.message);
    })
}

export function logoutUser(){
    const authToken = localStorage.getItem("auth-token")
    return request
    .post(baseURL+"/logout")
    .send(authToken)
    .then(response => {
        console.log("Response from backend logout ", response);
    }).catch(error => {
        console.log("error ",error.message);
    })
}



