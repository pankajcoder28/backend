import axios from "axios";

const api = axios.create({
    baseURL: 'https://insta-clone-00t4.onrender.com/api/post',
    withCredentials:true
})

export async function getFeed() {
    const response = await api.get('/feed')
    return response.data
}

export async function  createPost(imageFile , caption) {
    const formData = new FormData()
    formData.append('img_url',imageFile)
    formData.append('caption',caption)
 
    const response = await api.post('/',formData)

    return response.data
}

export async function likePost(postId) {
    const response = await api.post('/likes'+postId)
    return response.data
}

export async function dislikePost(postId) {
    const response = await api.post('/dislikes'+postId)
    return response.data
}