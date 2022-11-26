import {notify} from '@kyvg/vue3-notification'

export default {
    success() {
        notify({
            type: 'success',
            title: 'Ttile',
            text: 'Success',
        })
    },
    error() {
        notify({
            type: 'error',
            title: 'Ttile',
            text: 'Erorr',
        })
    }
  }