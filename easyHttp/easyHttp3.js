/*jshint esversion: 6 */

class EasyHTTP {

    // make http get 
    async get(url) {
        const response = await fetch(url);
        const resData = await response.json();
        return resData;
    }

    // make http post 
    async post(url, data) {

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const resData = await response.json();
        return resData;
    }

    // make http put 
    async put(url, data) {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const resData = await response.json();
        return resData;
    }

    // make http delete 
    async delete(url, data) {
        const response = await fetch(url, {
            method: 'DELETE'
        });
        const resData = await 'Resource deleted'
        return resData;
    }
}