import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

type EventPayload = {
  event_category?: string
  event_label?: string
  value?: number
}

declare global {
  function gtag(
    key: 'config',
    trackingId: string,
    config: { page_path: string }
  ): void
  function gtag(key: 'event', action: string, payload: EventPayload): void

  interface Window {
    gtag?: typeof gtag
  }
}

export const useTracking = (
  trackingId: string | undefined = process.env.GA_MEASUREMENT_ID
) => {
  const { listen } = useHistory()

  useEffect(() => {
    const unlisten = listen((location) => {
      if (!window.gtag) return
      if (!trackingId) {
        console.log(
          'Tracking not enabled, as `trackingId` was not given and there is no `GA_MEASUREMENT_ID`.'
        )
        return
      }

      window.gtag('config', trackingId, { page_path: location.pathname })
    })

    return unlisten
  }, [trackingId, listen])
}

export enum Action {
  Swipe = 'swipe',
  SwipeToNowhere = 'swipe_to_nowhere',
}

export const trackEvent = (
  action: string,
  { event_category, event_label, value }: EventPayload
) => {
  if (!window.gtag) return

  window.gtag('event', action, {
    event_category: event_category,
    event_label: event_label,
    value: value,
  })
}
