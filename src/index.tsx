import React from 'react'
import ReactDOM from 'react-dom'
import 'reset-css'

import { App } from './components/App'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(<App />, document.getElementById('root'))

serviceWorker.register({
  onSuccess: (detail) => {
    window.dispatchEvent(
      new CustomEvent<ServiceWorkerRegistration>(
        serviceWorker.ServiceWorkerEvent.success,
        { detail }
      )
    )
  },
  onUpdate: (detail) => {
    window.dispatchEvent(
      new CustomEvent<ServiceWorkerRegistration>(
        serviceWorker.ServiceWorkerEvent.update,
        { detail }
      )
    )
  },
})
