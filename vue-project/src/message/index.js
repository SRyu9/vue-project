import {notify} from '@kyvg/vue3-notification'

export default {
    success(text) {
        notify({
            type: 'success',
            title: 'SUCCESS',
            text: text,
        })
    },
    error(text) {
        notify({
            type: 'error',
            title: 'ERROR',
            text: text,
        })
    }
  }