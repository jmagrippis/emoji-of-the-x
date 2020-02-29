import React, {
  Children,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from 'react'

import { ServiceWorkerContext } from './ServiceWorkerContext'
import { ServiceWorkerEvent } from '../../serviceWorker'

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

  const handleSuccess = useCallback(({ detail }) => {
    setSuccess(true)
    setRegistration(detail)
  }, [])

  const handleUpdate = useCallback(({ detail }) => {
    setUpdate(true)
    setRegistration(detail)
  }, [])

  useEffect(() => {
    if (!init) {
      window.addEventListener(ServiceWorkerEvent.success, handleSuccess)
      window.addEventListener(ServiceWorkerEvent.update, handleUpdate)
      setInit(true)
    }

    return () => {
      window.removeEventListener(ServiceWorkerEvent.success, handleSuccess)
      window.removeEventListener(ServiceWorkerEvent.update, handleUpdate)
    }
  }, [init, handleSuccess, handleUpdate])

  return (
    <ServiceWorkerContext.Provider value={{ success, update, registration }}>
      {Children.only(children)}
    </ServiceWorkerContext.Provider>
  )
}
