export const request = async (url, method, payload = null) => {
    const options = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: method,
    };

    if (payload) options.body = JSON.stringify(payload);

    const token = localStorage.getItem('token');
    if (token) options.headers.Authorization = 'Bearer ' + token;

    const response = await fetch(url, options);

    if (response.status >= 500) {
        return Promise.reject({
            status: response.status,
            error: response.statusText,
        });
    }

    const json = await response.json();

    if (!response.ok) {
        return Promise.reject({
            status: response.status,
            error: json.message,
        });
    }

    return {
        status: response.status,
        data: json,
    };
};
