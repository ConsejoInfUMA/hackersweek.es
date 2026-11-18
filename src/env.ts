import { defineEnvVars } from '@sveltejs/kit/env';

export const variables = defineEnvVars({
	CALL_FOR_PAPERS_OPEN: { public: true, static: true },
	EVENT_ONGOING: { public: true, static: true },
	SPONSORS_FORM_OPEN: { public: true, static: true },
	EVENT_START_DATE: { public: true, static: true },
	EVENT_END_DATE: { public: true, static: true }
});
