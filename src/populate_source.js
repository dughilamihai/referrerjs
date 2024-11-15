// UTMs keys to look
const utmKeys = ['traffic_source', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_adgroup', 'utm_content'];

// Get cookie value by name
function getCookie(name) {
    const nameEQ = name + "=";
    const cookieArray = document.cookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i].trim();
        if (cookie.indexOf(nameEQ) === 0) {
            return cookie.substring(nameEQ.length, cookie.length);
        }
    }
    return null;
}

// Parse the cookie to extract the referrer_source object
function getReferrerSourceFromCookie() {
    const cookieValue = getCookie('referrer_source');
    if (cookieValue) {
        try {
            return JSON.parse(cookieValue);
        } catch (e) {
            console.error('Error parsing cookie value:', e);
        }
    }
    return null;
}

// Populate hidden fields
function populateUTMFields() {
    console.log('Populating hidden fields');
    const referrerSource = getReferrerSourceFromCookie();
    if (referrerSource) {
        for (let i = 0; i < utmKeys.length; i++) {
            const key = utmKeys[i];
            const value = referrerSource[key]; 

            if (value) {
                try {
                    const inputFields = document.querySelectorAll(`[id*=${key}]`); 
                
                    // Loop through each matched element and set its value
                    inputFields.forEach(inputField => {
                        if (inputField.value !== undefined) {
                            inputField.value = value;
                        }
                    });
                } catch (error) {
                    console.error("A apărut o eroare la actualizarea câmpurilor UTM:", error);
                }
            }
        }
    }
}

document.addEventListener("DOMContentLoaded", populateUTMFields);