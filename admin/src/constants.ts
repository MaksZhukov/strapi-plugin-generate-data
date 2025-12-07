import { en, de, ru, fr, ja, ko, ar, pl, nl, tr, LocaleDefinition } from '@faker-js/faker';
import { Locale } from './types';

export const LOCALES: Record<Locale, LocaleDefinition> = {
	en,
	de,
	ru,
	fr,
	ja,
	ko,
	ar,
	pl,
	nl,
	tr
} as const;

export const LOCALE_NAMES: Record<Locale, string> = {
	en: 'English',
	de: 'German',
	ru: 'Russian',
	fr: 'French',
	ja: 'Japanese',
	ko: 'Korean',
	ar: 'Arabic',
	pl: 'Polish',
	nl: 'Dutch',
	tr: 'Turkish'
} as const;
