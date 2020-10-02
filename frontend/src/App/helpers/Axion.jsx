export const server = "http://localhost:8080"

export const GET = (url) => {
    return new Promise((resolve, reject) => {
        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        let status = null
        fetch("" + server + url, requestOptions)
            .then(response => { status = response.status; return response.text() })
            .then(result => {
                try {
                    result = JSON.parse(result);
                } catch (error) {
                    if (status === 200) {
                        resolve(result)
                    } else {
                        reject(result)
                    }
                }
                if (status === 200) {
                    resolve(result)
                } else {
                    reject(result)
                }
            })
            .catch(error => reject(error));
    })
}
export const DELETE = (url,data) => {
    return new Promise((resolve, reject) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify(data);

        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        let status = null
        fetch("" + server + url, requestOptions)
            .then(response => { status = response.status; return response.text() })
            .then(result => {
                try {
                    result = JSON.parse(result);
                } catch (error) {
                    if (status === 200) {
                        resolve(result)
                    } else {
                        reject(result)
                    }
                }
                if (status === 200) {
                    resolve(result)
                } else {
                    reject(result)
                }
            })
            .catch(error => reject(error));
    })
}
export const PUT = (url,data) => {
    return new Promise((resolve, reject) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify(data);

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        let status = null
        fetch("" + server + url, requestOptions)
            .then(response => { status = response.status; return response.text() })
            .then(result => {
                try {
                    result = JSON.parse(result);
                } catch (error) {
                    if (status === 200) {
                        resolve(result)
                    } else {
                        reject(result)
                    }
                }
                if (status === 200) {
                    resolve(result)
                } else {
                    reject(result)
                }
            })
            .catch(error => reject(error));
    })
}