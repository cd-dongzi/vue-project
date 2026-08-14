# Article Route Watch Fix

## Problem

The article view watches the entire `$route` object. Leaving an article for an unrelated page changes `$route`, so the component starts another article request with no article ID and shows the global loading layer during navigation. This matches issue #6.

## Design

Watch `$route.params.id` instead of the entire route and pass ID changes through a small route-change helper. The helper calls the supplied loader only when the next ID is present and differs from the previous ID.

This preserves direct navigation from one article ID to another while making navigation away from the article a no-op. The component's initial `created` load remains unchanged. Loading cleanup moves to `finally` so a failed request cannot leave the loading layer visible.

## Error Handling

- Missing next ID: resolve without calling the loader.
- Unchanged ID: resolve without calling the loader.
- Loader rejection: propagate the error after the component hides the loading layer.

## Tests

1. A missing next ID does not call the loader.
2. An unchanged ID does not call the loader.
3. A changed, valid ID calls the loader exactly once with that ID.
4. Run the complete unit suite and production build.

## Implementation Steps

1. Add failing tests for the route-change helper.
2. Add the minimal helper implementation.
3. Update the article watcher to use the helper and `finally` cleanup.
4. Run the focused tests, full test suite, diff checks, and production build.

## Scope

No router configuration, API shape, UI layout, or unrelated route behavior changes.
