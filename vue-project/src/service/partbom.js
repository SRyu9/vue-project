import Api from '@/service/api'

export default {
  index (search) {
    return Api().get('partboms', {
      params: {
        search: search
      }
    })
  },
  show (id) {
    return Api().get('partbom/', {
        params: {
            id: id
        }
    })
  },
  post (order) {
    return Api().post('partbom', order)
  },
  put (order) {
    return Api().put(`partbom/${order.id}`, order)
  }
}
