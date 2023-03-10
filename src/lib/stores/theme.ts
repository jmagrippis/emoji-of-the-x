import {writable} from 'svelte/store'
import type {Theme} from '../../hooks.server'

export const theme = writable<Theme>()
