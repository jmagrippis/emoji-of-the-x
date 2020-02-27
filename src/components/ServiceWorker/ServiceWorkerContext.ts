import { createContext } from 'react'

type Context = {
  success: boolean | null
  update: boolean | null
  registration: ServiceWorkerRegistration | null
}

export const ServiceWorkerContext = createContext<Context>({
  success: null,
  update: null,
  registration: null,
})
