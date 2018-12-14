import axios from 'axios'
const baseUrl = 'https://damp-island-16531.herokuapp.com/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = (newObject) => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const deletePerson = (id) => {
    axios.delete(`${baseUrl}/${id}`)
}

const update = (id, modifiedObjet) => {
    const request = axios.put(`${baseUrl}/${id}`, modifiedObjet)
    return request.then(response => response.data)
}

export default { getAll, create, deletePerson, update }