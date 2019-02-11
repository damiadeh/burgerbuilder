import axios from 'axios';

const instance = axios.create({
    baseURL: "https://react-burgerbuilder-21b9b.firebaseio.com/"
});

export default instance;