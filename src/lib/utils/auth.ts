import type { Provider } from '@supabase/supabase-js';

const providers: Provider[] = [
	'apple',
	'azure',
	'bitbucket',
	'discord',
	'facebook',
	'github',
	'gitlab',
	'google',
	'keycloak',
	'linkedin',
	'notion',
	'slack',
	'spotify',
	'twitch',
	'twitter',
	'workos',
	'zoom'
];

export function isValidProvider(input: string): input is Provider {
	return providers.includes(input as Provider)
}