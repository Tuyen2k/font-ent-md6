import axios from "axios";

export const loginUser = (username, password) => {
    return new Promise((resolve, reject) => {
        axios.post("http://localhost:8080/api/accounts/login", {
            name: username,
            password: password
        })
            .then(response => {
                // Handle success
                resolve(response);
            })
            .catch(error => {
                // Handle error
                reject(error);
            });
    });
}
export const saveAccount = (account) => {
    return new Promise((resolve) => {
        resolve(
            axios.post("http://localhost:8080/api/accounts/register", account)
                .then(response => {
                        return true
                    }
                ).catch(() => {
                return false
            })
        )
    })
}