import {getIsoDate} from './getIsoDate'

export const getRelativeAnchor = (date: Date) => `/the/day/${getIsoDate(date)}`.replaceAll('-', '/')
