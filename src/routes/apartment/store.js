import { writable } from 'svelte/store';

// This will hold the shared variable
export const currentPageIndex = writable(0);