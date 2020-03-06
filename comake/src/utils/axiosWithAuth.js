import axios from "axios";

export default function axiosWithAuth() {
    const token = localStorage.getItem("token")
    return axios.create({
        headers:
            { authorization: token },
        baseURL: "https://comake-3.herokuapp.com"        
    })
}