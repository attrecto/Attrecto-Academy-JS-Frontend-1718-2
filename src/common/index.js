export const request = async (url, method, payload = {}) => {
    const response = await fetch(url, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: method,
        body: JSON.stringify(payload)
    });

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
