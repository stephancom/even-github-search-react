import axios from 'axios';

export default axios.create({
  baseURL: "https://api.github.com/",
  timeout: 4000,
  headers: {
    "User-Agent": "stephancom-even-github-search-react",
    Accept: "application/vnd.github.v3+json"
  }
});