import axios from "axios";

const instance = axios.create({
  baseURL:
    "https://firestore.googleapis.com/v1/projects/rits-chiebukuro/databases/(default)",
});

export default instance;
