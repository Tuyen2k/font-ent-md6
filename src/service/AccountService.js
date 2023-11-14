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