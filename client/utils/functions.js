// const db = require('./connection')
//^ = at start
// (\w{3,}) = can have values from a-z,A-Z,0-9,_ (\w) , must be 3({3,}) characters min or more, this part is the length test
//@ not in brackets = must include '@'
//([a-zA-Z\d]{2,}) = must contain letters within '[]' from a-z, A-Z, any digits 0-9 (\d), must be min of 2 characters or more
//\.  must contain "." \ is an escape character as '.' has a meaning in regex
//([a-z]{2,}) = must contain letters with '[]', a-z and must be 2 more more {2,} characters
//example of above is Ba4@gmail.com
//(\.[a-z]{2,})? this is optional with the '?' = must contain '.','\' is an escape character as '.' has meaning in regex, it can mean any character except linebreaks 
//example of above full regex expression with optional end part is Ba4@hotmail.co.nz
const emailRegex = /^(\w{3,})@([a-zA-Z\d]{2,})\.([a-z]{2,})(\.[a-z]{2,})?$/
const capitalLetterRegex = /[A-Z]{1}/ //1 character match A-Z
const lowerCaseLetterRegex = /[a-z]{1}/ //1 character match a-z
const numberRegex = /\d{1}/ //1 digit match 0-9
const specialCharRegex = /[!@#$%^&]{1}/ //must have 1 special character '!@#$%^&*
const minEmailReq = /\w{3,}/

function validateEmail(userEmail){

    //test if email matches email regex expression and that it has all the min requirements for an email
    if(emailRegex.test(userEmail)) return true
    else return false

}

function minEmailLength(email){

    if(minEmailReq.test(email)) return true
    else return false

}

function minPasswordCharReqReached(password){

    const passwordArray = password.split("")
    var capitalLetterCounter = 0
    var lowerCaseLetterCounter = 0
    var numberCounter = 0
    var specialCharCounter = 0
    var minPasswordCharReached = false //instantiated as false

    //test for length of password, if 5 or lower return false
    if(passwordArray.length <= 5) return minPasswordCharReached
    // console.log("pw length pass ", passwordArray.length)
    //after above condition passes do below
    for(var i = 0; i < passwordArray.length ; i++){
        
        var character = passwordArray[i]
        if(capitalLetterRegex.test(character)){
            capitalLetterCounter++
        }
        if(numberRegex.test(character)){
            numberCounter++
        }
        if(lowerCaseLetterRegex.test(character)){
            lowerCaseLetterCounter++
        }
        if(specialCharRegex.test(character)){
            specialCharCounter++
        }
        // console.log("numcounter ", numberCounter);
        // console.log("lowerCaseLetterCounter ", lowerCaseLetterCounter);
        // console.log("specialCharCounter ", specialCharCounter);
        // console.log("capitalLetterCounter ", capitalLetterCounter);
        if(capitalLetterCounter >= 1 && numberCounter >= 1 && lowerCaseLetterCounter >= 1 && specialCharCounter >= 1){
            minPasswordCharReached = true
            return minPasswordCharReached 
        }
     
    }

    return minPasswordCharReached
}


function validatePassword(password){

    if(minPasswordCharReqReached(password)) return true
    else return false

}


module.exports = {
    validatePassword,
    validateEmail,
    minPasswordCharReqReached,
    minEmailLength
}