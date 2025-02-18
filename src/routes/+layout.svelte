<script>
	import '../app.css';
	import '@fontsource/merriweather/300.css';
	import '@fontsource/merriweather/400.css';
	import '@fontsource/merriweather/700.css';
	import '@fontsource/merriweather/900.css';

	import { ModeWatcher, setMode } from 'mode-watcher';
	setMode('dark');

	export const prerender = true;
	export const ssr = false;
</script>

<ModeWatcher />
<!-- <div class="relative mx-auto min-h-screen max-w-2xl bg-background px-6 py-12 font-sans antialiased sm:py-24"> -->
<div class="">
	<slot></slot>
</div>
