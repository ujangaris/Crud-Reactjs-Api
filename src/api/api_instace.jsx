import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://13.239.136.211/blog-api/v1/',
  headers: {
    //  Authorization: `<Your Auth Token>`,
    'Content-Type': 'application/json',
    timeout: 1000,
  },
  // .. other options
})

export default instance