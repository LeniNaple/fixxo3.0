const submitForm = event => {
    event.preventDefault()
    validate(event)
}

const validate = (event) => {
    switch(event.type){
        case 'keyup':
                validateElement(event.target)
            break;

        case 'submit':
            for(let element of event.target)
                validateElement(element)
            break;
    }
}

const validateElement = (element) => {

    if (element.required) {
        
        let error = ""

        switch(element.type) {
            case 'text':
                if (!isNullOrEmpty(element.value)) {
                    if (!isMinimumLength(element.value, element.dataset.requiredMin)) {
                        error = `Your ${element.id} must contain at least ${element.dataset.requiredMin} letters.`
                    } 
                } else {
                    error = `You must enter a ${element.id}.`
                }
                break;

            case 'email':
                if (!isNullOrEmpty(element.value)) {
                    if (!isEmailValid(element.value)) {
                        error = `Not a valid ${element.id}.`
                    } 
                } else {
                    error = `You must enter an ${element.id}.`
                }
                break;

            case 'textarea':
                if (!isNullOrEmpty(element.value)) {
                    if (!isMinimumLength(element.value, element.dataset.requiredMin)) {
                        error = `Your ${element.id} must contain at least ${element.dataset.requiredMin} letters.`
                    } 
                } else {
                    error = `You must enter a ${element.id}.`
                }
                break;
        }

        document.getElementById(`${element.id}ErrorMessage`).innerText = error
    } 
}

const isNullOrEmpty = value => {
    
    if (value.length === 0 ) {
        return true
    } else {
        return false
    }
}

const isMinimumLength = (value, minLength = 2) => {

    if (value.length >= minLength){
        return true
    } else {
        return false
    }
}

const isEmailValid = (email) => {

    // från https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
    const regEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ 

    if (regEx.test(email))
        return true

    return false
}