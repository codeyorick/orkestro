import type { Preview, SvelteRenderer } from '@storybook/svelte';
import { withThemeByDataAttribute } from '@storybook/addon-themes';

import './storybook.css';

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i
			}
		},

		a11y: {
			test: 'todo'
		}
	},
	decorators: [
		withThemeByDataAttribute<SvelteRenderer>({
			themes: {
				light: 'light',
				dark: 'dark'
			},
			defaultTheme: 'light',
			attributeName: 'data-theme'
		})
	]
};

export default preview;
