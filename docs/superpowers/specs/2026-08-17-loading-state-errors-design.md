# Request Failure Loading-State Fix

## Problem

The Home, Search, Video, Headline, and Record Vuex actions enable a loading flag before calling the external Mock API. Their success branches clear that flag, but their rejection branches only propagate the error. A network or API failure therefore leaves the affected page in a permanent loading state.

## Design

Keep the existing request and success flows unchanged. In every affected action, clear the same loading flag in the rejection branch before rejecting with the original error. This is intentionally explicit in each module so the change does not introduce a new request abstraction or alter response handling.

Affected actions:

- `home/getHomeList` (`newsLoading`)
- `search/getSearchList` (`loading`)
- `video/getVideoList` (`loading`)
- `headline/getHeadlineList` and `headline/addHeadline` (`loading`)
- `record/getRecordList` (`loading`)

## Error Handling

The original rejection value must be preserved. The fix only guarantees that the page can leave its loading UI after a failed request; it does not replace the external API, add retries, or introduce new user-facing error messages.

## Tests

Add a focused Node test that loads the real Vuex module actions while replacing only the external request layer with a deterministic rejected promise. For every affected action, assert both that the original error is propagated and that its loading flag is false afterward. Add the test to the existing `npm test` chain, then run the full test suite and production build.

## Scope

No successful response behavior, API endpoint, pagination rule, visual layout, dependency, or unrelated store state changes.
