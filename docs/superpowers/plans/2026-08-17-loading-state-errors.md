# Request Failure Loading-State Fix Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ensure every list-related Vuex action leaves its loading UI when the external API rejects while preserving the original error.

**Architecture:** Keep each existing action and success path intact. Add a focused Node regression test that loads the real Vuex modules with only the external request and browser-only dependencies replaced, then add the matching loading-flag reset to each rejection branch.

**Tech Stack:** Vue 2, Vuex 3, Babel 6 (`babel-register`), Node `assert`, npm scripts

## Global Constraints

- Preserve the original rejection value.
- Do not change successful response behavior, API endpoints, pagination rules, visual layout, dependencies, or unrelated store state.
- All GitHub remote operations must use the installed GitHub plugin.

---

### Task 1: Add failing request-state regression coverage

**Files:**
- Create: `vue-toutiao/src/store/modules/loading-state.test.js`
- Modify: `vue-toutiao/package.json`

**Interfaces:**
- Consumes: Existing Vuex action signatures `(context, params) => Promise` from Home, Search, Video, Headline, and Record modules.
- Produces: `npm run test:loading-state`, which rejects a deterministic request and asserts each module's loading flag is false afterward.

- [ ] **Step 1: Write the failing test**

Create `loading-state.test.js` with a rejected request adapter, browser dependency shims, and this action matrix:

```js
const cases = [
  ['home/getHomeList', home.actions.getHomeList, home.state, 'newsLoading', { id: 1 }],
  ['search/getSearchList', search.actions.getSearchList, search.state, 'loading', {}],
  ['video/getVideoList', video.actions.getVideoList, video.state, 'loading', {}],
  ['headline/getHeadlineList', headline.actions.getHeadlineList, headline.state, 'loading', {}],
  ['headline/addHeadline', headline.actions.addHeadline, headline.state, 'loading', {}],
  ['record/getRecordList', record.actions.getRecordList, record.state, 'loading', { title: '我的收藏' }]
]
```

For every case, call the real action with `{ state, commit () {} }`, assert rejection identity with `assert.rejects`, and assert `state[key] === false`.

- [ ] **Step 2: Register the focused test command**

Add to `package.json`:

```json
"test:loading-state": "node src/store/modules/loading-state.test.js"
```

Append `npm run test:loading-state` to the existing `test` script.

- [ ] **Step 3: Run the focused test and verify RED**

Run: `npm run test:loading-state`

Expected: FAIL because at least `home/getHomeList` leaves `newsLoading` equal to `true` after the rejected request.

### Task 2: Reset loading state in every affected failure branch

**Files:**
- Modify: `vue-toutiao/src/store/modules/home.js`
- Modify: `vue-toutiao/src/store/modules/search.js`
- Modify: `vue-toutiao/src/store/modules/video.js`
- Modify: `vue-toutiao/src/store/modules/headline.js`
- Modify: `vue-toutiao/src/store/modules/record.js`
- Test: `vue-toutiao/src/store/modules/loading-state.test.js`

**Interfaces:**
- Consumes: Each module's existing loading state property.
- Produces: Rejected actions that restore the property to `false` and reject with the unchanged error.

- [ ] **Step 1: Add the minimal failure cleanup**

Before `reject(err)` in every affected catch branch, set the same flag that the action enabled:

```js
state.loading = false
reject(err)
```

Use `state.newsLoading = false` for `home/getHomeList`. Apply `state.loading = false` to Search, Video, both Headline actions, and Record.

- [ ] **Step 2: Run the focused test and verify GREEN**

Run: `npm run test:loading-state`

Expected: PASS with `loading state error tests passed`.

- [ ] **Step 3: Run complete verification**

Run:

```bash
npm test
NODE_OPTIONS=--openssl-legacy-provider npm run build
git -c core.whitespace=cr-at-eol diff --check
```

Expected: all tests pass, production build completes, and the diff check reports no errors.

- [ ] **Step 4: Review and commit the implementation**

Review only the design, plan, test, package script, and five store modules. Commit with:

```bash
git add docs/superpowers vue-toutiao/package.json vue-toutiao/src/store/modules
git commit -m "fix: clear loading state after request errors"
```
