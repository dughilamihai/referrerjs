// UTMs keys to look
const utmKeys = ['traffic_source', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_adgroup', 'utm_content'];

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

    const referrerSource = getReferrerSourceFromCookie();
    if (referrerSource) {
        for (let i = 0; i < utmKeys.length; i++) {
            const key = utmKeys[i];
            const value = referrerSource[key]; 

            if (value) {
                try {
                    const inputField = document.getElementById(key);
                    if (inputField) {
                        inputField.value = value;
                    }
                } catch (error) {
                    console.error(`Eroare la setarea valorii pentru ${key}:`, error);
                }
            }
        }
    }
}

document.addEventListener("DOMContentLoaded", populateUTMFields);