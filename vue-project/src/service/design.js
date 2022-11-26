import Api from '@/service/api'

export default {
  index (search) {
    return Api().get('projects', {
      params: {
        search: search
      }
    })
  },
  show (id) {
    return Api().get('project/', {
        params: {
            id: id
        }
    })
  },
  post (order) {
    return Api().post('project', order)
  },
  put (order) {
    return Api().put(`project/${order.id}`, order)
  }
}
