// Set UTM and traffic sources
function setReferrerSourceCookie() { 
    if (document.cookie.indexOf('referrer_source') === -1) {
        
        const utmParameters = getUTMParameters();
        const trafficSource = getTrafficSource(document.referrer);

        const data = {
            traffic_source: trafficSource,
            utm_source: utmParameters.utm_source || '',
            utm_medium: utmParameters.utm_medium || '',
            utm_campaign: utmParameters.utm_campaign || '',
            utm_adgroup: utmParameters.utm_adgroup || '',
            utm_content: utmParameters.utm_content || ''
        };

        let serializedData;
        try {
            serializedData = JSON.stringify(data);
        } catch (e) {
            console.error('Eroare la serializarea obiectului referrer_source:', e);
            return;
        }

        const now = new Date();
        now.setTime(now.getTime() + (30 * 24 * 60 * 60 * 1000));
        const expires = "expires=" + now.toUTCString();

        document.cookie = `referrer_source=${serializedData}; path=/; ${expires}`;
    }
}

const trafficSources = {
    'google.com': (url) => url.searchParams.get('utm_medium') === 'cpc' ? 'Google Ads' : 'Google Organic',
    'facebook.com': () => 'Facebook',
    'bing.com': () => 'Bing',
    'linkedin.com': () => 'LinkedIn'
};

function getTrafficSource(referrer) {
    if (!referrer) return 'Direct';

    try {
        const url = new URL(referrer);
        const hostname = url.hostname;

        for (const domain in trafficSources) {
            if (hostname.includes(domain)) {
                return trafficSources[domain](url);
            }
        }
        return 'Other';
    } catch (e) {
        console.error('Invalid Referrer:', e);
        return 'Invalid Referrer';
    }
}

function getUTMParameters() {
    const utmParameters = {};
    const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_adgroup', 'utm_content'];

    try {
        const urlParams = new URLSearchParams(window.location.search);

        for (let i = 0; i < utmKeys.length; i++) {
            const key = utmKeys[i];
            const value = urlParams.get(key);
            if (value) {
                utmParameters[key] = value;
            }
        }
    } catch (e) {
        console.error('Eroare la obținerea parametrilor UTM:', e);
        return {};
    }

    return utmParameters;
}

setReferrerSourceCookie();