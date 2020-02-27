import React, { Children, useState, useEffect, ReactNode } from 'react'

import * as serviceWorker from '../../serviceWorker'
import { ServiceWorkerContext } from './ServiceWorkerContext'

type Props = {
  children: ReactNode
}

export const ServiceWorkerProvider = ({ children }: Props) => {
  const [init, setInit] = useState(false)
  const [success, setSuccess] = useState<boolean | null>(null)
  const [update, setUpdate] = useState<boolean | null>(null)
  const [
    registration,
    setRegistration,
  ] = useState<ServiceWorkerRegistration | null>(null)

  useEffect(() => {
    if (!init) {
      serviceWorker.register({
        onSuccess: (registration) => {
          setSuccess(true)
          setRegistration(registration)
        },
        onUpdate: (registration) => {
          setUpdate(true)
          setRegistration(registration)
        },
      })
      setInit(true)
    }
  }, [init])

  return (
    <ServiceWorkerContext.Provider value={{ success, update, registration }}>
      {Children.only(children)}
    </ServiceWorkerContext.Provider>
  )
}
