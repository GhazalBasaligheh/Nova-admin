# NOVA Admin

The admin panel of the NOVA online store, built for the NOVA Frontend (UI) Developer Technical Challenge.
It's a bilingual (Persian RTL / English LTR) React single-page app with light and dark themes, where an
administrator signs in and manages products and users through [FakeStoreAPI](https://fakestoreapi.com).

The public storefront lives in a separate repository: [NOVA Store](https://github.com/GhazalBasaligheh/Nova-store).

## Contents

- [Features](#features)
- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
- [Environment variables](#environment-variables)
- [Scripts](#scripts)
- [Folder structure](#folder-structure)
- [Architecture](#architecture)
  - [Routing and route protection](#routing-and-route-protection)
  - [State management](#state-management)
  - [API communication](#api-communication)
  - [Authentication and token storage](#authentication-and-token-storage)
  - [Internationalization and theme](#internationalization-and-theme)
  - [Forms and validation](#forms-and-validation)
  - [Search](#search)
- [FakeStoreAPI limitations and workarounds](#fakestoreapi-limitations-and-workarounds)
- [Accessibility](#accessibility)
- [Assumptions](#assumptions)
- [Out of scope](#out-of-scope)
- [Known limitations](#known-limitations)
- [Time spent](#time-spent)

## Features

- **Login** with username and password through `POST /auth/login`, with error messages for wrong credentials and
  network failures. Logout is in the top bar.
- **Protected routes:** all admin pages require a session. Logged-out visitors are sent to the login page and
  returned to the page they asked for after signing in.
- **Products:** a table with image, title, price and category, search, and an **Add product** form (title,
  description, price, category, image URL) with validation. A new product appears in the list right away.
- **Users:** a table with first name, username, email and phone, search, and an **Add user** form (first name,
  last name, username, email, password, phone) with validation. A new user appears in the list right away.
- **Explicit states** everywhere: loading skeletons, errors with retry, empty lists, no search matches, and
  success messages.
- **Persian (default, RTL) and English (LTR)**, switchable from the top bar or the login page.
- **Light and dark themes**, remembered across visits and applied before the first paint.
- **Layout:** fixed sidebar, top bar and content area, designed for desktop (≥ 1280 px) as the brief allows.

## Tech stack

| Concern      | Choice                                                               |
| ------------ | -------------------------------------------------------------------- |
| Build        | Vite 8, React 19, TypeScript 5.9 (strict)                            |
| Routing      | react-router 7                                                       |
| Global state | Redux Toolkit 2 (`createAsyncThunk`, listener middleware)            |
| Local state  | `useState`, Formik                                                   |
| HTTP         | Axios with a single shared instance                                  |
| Styling      | styled-components 6                                                  |
| i18n         | react-i18next + i18next                                              |
| Forms        | Formik + Yup                                                         |
| Font         | Vazirmatn (self-hosted variable font, SIL OFL)                       |
| Quality      | ESLint (typescript-eslint, react-hooks, `no-explicit-any`), Prettier |

Dependencies are pinned to exact versions. Two choices differ from the current Vite template on purpose:

- **TypeScript 5.9 instead of 7.0:** 7.0 is a new major release. Version 5.9 also matches the Store project.
- **`erasableSyntaxOnly` is off,** because the brief requires TypeScript enums in `types/Enums`.

react-router stays on 7.x (8.x was released recently) for maturity.

## Getting started

### Prerequisites

- Node.js **20.19+ or 22.12+** (developed on Node 22.13)
- npm 10+

### Install and run

```bash
git clone https://github.com/GhazalBasaligheh/Nova-admin.git
cd Nova-admin
npm install
cp .env.example .env.local
npm run dev
```

Open the URL Vite prints (by default http://localhost:5173).

### Signing in

FakeStoreAPI only accepts its own seeded demo users. Their usernames and passwords are listed in the
[FakeStoreAPI documentation](https://fakestoreapi.com/docs) and returned by `GET /users`. Credentials are
deliberately not included in this repository.

### Production build

```bash
npm run build
npm run preview
```

## Environment variables

Copy `.env.example` to `.env.local`. Vite inlines `VITE_*` variables into the client bundle, so they must never
contain secrets.

| Variable            | Purpose                                    | Example                    |
| ------------------- | ------------------------------------------ | -------------------------- |
| `VITE_API_BASE_URL` | Base URL used by the shared Axios instance | `https://fakestoreapi.com` |

The app fails at startup with a clear message if it's missing.

## Scripts

| Script                 | Description                                |
| ---------------------- | ------------------------------------------ |
| `npm run dev`          | Development server                         |
| `npm run build`        | Type-check (`tsc -b`) and production build |
| `npm run preview`      | Serve the production build                 |
| `npm run type-check`   | `tsc -b`                                   |
| `npm run lint`         | ESLint                                     |
| `npm run format`       | Prettier (write)                           |
| `npm run format:check` | Prettier (check only)                      |

## Folder structure

The structure follows section 3-3 of the challenge brief, including its capitalized folder names.

```
src/
├── assets/
│   ├── Fonts/            # Vazirmatn variable font + license
│   ├── Icons/            # Inline SVG icon components
│   └── Images/           # (empty)
├── Components/           # Page-specific components
│   ├── Layout/           # AdminLayout, Sidebar, Topbar
│   ├── Products/         # ProductsTable
│   └── Users/            # UsersTable
├── Dictionary/           # fa.json, en.json, i18n.ts (react-i18next setup)
├── Modals/               # CreateProductModal, CreateUserModal
├── Pages/                # LoginPage, ProductsPage, UsersPage, NotFoundPage
├── Redux/                # store, typed hooks, listener middleware, slices/ (auth, products, users, ui)
├── Routes/               # paths (centralized), router, route guards
├── Shared/               # Reusable UI (Button, TextField, Modal, DataTable, ...), hooks, theme/
├── Storage/              # tokenStorage (auth token), preferences (theme, language)
├── types/
│   └── Enums/            # Theme, Language/Direction, RequestStatus, ApiErrorKind
├── Utils/
│   ├── api/              # axiosInstance, ApiError
│   ├── services/         # auth, products, users request functions
│   └── *.ts              # UI-independent helpers: search, categories, uniqueId
└── Validations/          # Yup schemas: login, product, user
```

**Notes on placement:**

- **Theme tokens** live in `Shared/theme/`, since the brief's Admin tree has no context folder. They are
  copied deliberately from NOVA Store: the two repositories share no runtime code, so the visual identity is
  kept in sync by hand.
- **Reusable hooks** (`useDebouncedValue`, `useFormatters`) live in `Shared/`, because the brief has no hooks
  folder.
- **Pure helpers** live directly in `Utils/` next to the `api/` and `services/` subfolders the brief lists.

## Architecture

### Routing and route protection

- All paths are defined in `Routes/paths.ts`, and `Routes/router.tsx` builds the router from them.
- `ProtectedRoute` sends logged-out visitors to `/login`, remembering the page they asked for. `PublicOnlyRoute`
  keeps logged-in users off the login page.
- Admin pages are **code-split** (loaded on first visit), which keeps the main bundle under Vite's 500 kB warning.
- **Route protection is a user-experience gate, not security.** Anyone can change client-side state, and
  FakeStoreAPI doesn't require a token for any endpoint. Real protection has to come from the server.

### State management

| State                                    | Where                  |
| ---------------------------------------- | ---------------------- |
| Auth token, login status and errors      | Redux `auth` slice     |
| Products, categories, list/create status | Redux `products` slice |
| Users, list/create status                | Redux `users` slice    |
| Theme, language                          | Redux `ui` slice       |
| Search text, modal open, notices         | `useState` in the page |
| Form values and errors                   | Formik                 |

- **Data loading:** async work uses `createAsyncThunk` over the shared Axios instance. RTK Query wasn't used
  because the brief requires a standalone AxiosInstance.
- **Errors in state:** each thunk stores a small, serializable error (`{ kind, status }`) rather than an error
  object.
- **Load once:** the products and users thunks use a `condition` so each list is fetched **only once**.
  Revisiting a page, or creating an item, never refetches, which would wipe out locally added items (see the
  limitations below).
- **Reducers stay pure:** side effects run in a Redux listener middleware (`Redux/listeners.ts`). That covers
  saving the token and preferences, updating `<html lang dir data-theme>`, and switching i18next's language.

### API communication

- `Utils/api/axiosInstance.ts` is the single Axios instance: base URL from env, 10-second timeout, JSON `Accept`
  header.
- **Every request sends `Authorization: Bearer <token>`** when a token exists, which is the standard pattern.
  This header makes browsers send a CORS preflight check first. That check was **verified to be allowed** by
  FakeStoreAPI (a cross-origin request with the header returned 200).
- A response interceptor turns every failure into a typed `ApiError` with a `kind`: `network`, `unauthorized`
  (401/403), `client`, `server`, `blocked` (non-JSON), `parse` or `canceled`.
- **401/403 handling:** a 401 or 403 on any request except the login itself logs the user out. The interceptor
  calls a handler registered at startup, so the API layer never imports the Redux store.
- **Services** (`Utils/services/*`) return typed data and check response shapes:
  - Lists must be arrays.
  - Create calls must return a numeric `id`.
  - Login must return a token.
- **Passwords are never kept in state.** `GET /users` returns them, and the service drops them.

### Authentication and token storage

`POST /auth/login` takes `{ username, password }` and returns `{ token }`. The token sits behind a single
adapter, `Storage/tokenStorage.ts`, so the storage strategy can change in one file.

**Current choice: `sessionStorage`.** Here's how the options compare, given that FakeStoreAPI returns the token
in the JSON body and this app has no server of its own:

| Option                                              | Survives refresh    | Readable by injected script (XSS) | Notes                                          |
| --------------------------------------------------- | ------------------- | --------------------------------- | ---------------------------------------------- |
| In memory (Redux only)                              | No                  | Only while the attack is running  | Smallest exposure; every refresh logs out      |
| **`sessionStorage`** (chosen)                       | Yes, within the tab | Yes                               | Cleared when the tab closes                    |
| `localStorage`                                      | Yes                 | Yes                               | Persists indefinitely; largest exposure        |
| Cookie set by JavaScript                            | Yes                 | Yes                               | Can't be `HttpOnly`, so no gain over the above |
| `HttpOnly; Secure; SameSite` cookie set by a server | Yes                 | No                                | Needs a backend (out of scope)                 |

`sessionStorage` was chosen as a balance between usability (refresh keeps the session) and exposure (cleared with
the tab). It doesn't protect the token from XSS, and encrypting it in the browser wouldn't either, because
any key would also be in the client code. Other safeguards in this app:

- No `dangerouslySetInnerHTML`.
- No secrets or credentials in source or env files.
- No user-entered markup is ever rendered as HTML.

**Recommended production design** (what a real NOVA admin should use):

- A backend or BFF (backend-for-frontend) that performs the login and sets the session as an **`HttpOnly; Secure;
SameSite=Strict` cookie**, ideally with the `__Host-` prefix. Scripts then can't read it.
- **Short-lived access tokens with rotating refresh tokens,** plus server-side revocation on logout.
- **CSRF protection** (SameSite plus a CSRF token for state-changing requests).
- **A strict Content Security Policy** to reduce the impact of any XSS.
- **Authorization checked on every API request on the server,** not only in the router.

### Internationalization and theme

- **Dictionaries:** react-i18next loads `Dictionary/fa.json` and `en.json`. Keys are typed through
  `types/i18next.d.ts`, so an unknown key fails at compile time. There's no Persian or English text written
  directly in JSX.
- **Direction:** the language sets `<html lang>` and `dir` (`rtl` / `ltr`). Layouts use CSS logical properties,
  so the sidebar, padding and icons mirror automatically.
- **Numbers:** counts use i18next's number formatting, and prices use `Intl.NumberFormat`, so Persian shows
  Persian digits.
- **Prices are shown in USD** (the API's currency, and what admins enter); only the digits follow the language.
- **Theme:** light or dark, with design tokens copied from NOVA Store.
- **Saved preferences:** theme and language are non-sensitive, so they're kept in `localStorage`.
- **No flash on load:** a small inline script in `index.html` applies the saved theme, language and background
  before the JavaScript bundle loads, so a reload never shows the wrong theme or direction.

### Forms and validation

Forms use Formik with Yup schemas in `Validations/`. The brief requires Yup validation but doesn't set specific
rules, so validation is deliberately **minimal**:

| Form    | Rules                                                                                 |
| ------- | ------------------------------------------------------------------------------------- |
| Login   | Username and password required                                                        |
| Product | All fields required; price must be a number greater than 0; image must be a valid URL |
| User    | All fields required; email must be a valid email                                      |

No length limits, password-strength rules or phone formats were invented. Schema messages are dictionary keys,
so errors appear in the current language. Errors are linked to their fields (`aria-invalid`,
`aria-describedby`).

The create forms open in modals built on the native `<dialog>` element, so focus trapping, closing with Esc
and returning focus are handled by the browser. The product form shows an image preview.

### Search

Search runs in the browser over the loaded list, using local `useState`:

- The input updates on every keystroke. Filtering uses a **300 ms debounced** value (`useDebouncedValue`) and is
  memoized with `useMemo`, so it only reruns when the list or the debounced text changes.
- **Products** match on title and category, including the translated category name. For example, «جواهرات»
  finds jewelry.
- **Users** match on first name, last name, username and email.

## FakeStoreAPI limitations and workarounds

| Limitation                                                                                               | Workaround                                                                                                                                                |
| -------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Creates aren't saved: `POST /products` returns `201` with an id, and `POST /users` returns only `{ id }` | The new item is added to the local Redux list, newest first, and lists are never refetched after a create. **New items disappear on a full page reload.** |
| Every create returns the same id (e.g. `21` for products, `11` for users)                                | `Utils/uniqueId.ts` assigns `max + 1` when the id already exists, so table rows keep unique keys                                                          |
| `POST /users` returns no user fields                                                                     | The row is built from the submitted form plus the returned id                                                                                             |
| Users must be sent as `name: { firstname, lastname }`                                                    | The service maps the form's flat fields to that shape                                                                                                     |
| Login only works for the API's seeded demo users                                                         | Documented above; no credentials in the repo                                                                                                              |
| The token isn't checked by any endpoint                                                                  | Bearer header is still sent; route protection is documented as UX only                                                                                    |
| No pagination parameters                                                                                 | Full lists are loaded once (20 products, 10 users) and searched in the browser                                                                            |
| Product text and user data are English only                                                              | Shown as-is, with `lang`/`dir="auto"` so they read correctly in the RTL layout. Category names are translated                                             |
| Category slug `jewelery` is misspelled                                                                   | Kept as the API value; the label is translated correctly                                                                                                  |

Lists, the create responses and the Bearer-header CORS preflight were checked against the live API on
2026-11-10.

## Accessibility

- Every form field has a visible label, and errors are announced (`role="alert"`) and linked to their field.
- Every icon-only button has a translated `aria-label`. Focus outlines are visible.
- Loading states use `aria-busy`. Result counts and success messages are announced through live regions.
- Tables use proper `th scope="col"` headers.

## Assumptions

- Persian is the default language.
- The sidebar contains only the sections the brief requires (Products, Users). The mockup's Dashboard and
  Settings items were left out rather than shipped as empty pages.
- Primary buttons use the brand's orange accent from the written design guide. The Admin mockup shows blue.
- Admin prices are entered and shown in USD.
- Image URLs only need to be valid URLs. The browser loads them directly with `<img>`, which can't run scripts.

## Out of scope

Per the brief: editing and deleting products or users, a responsive layout below 1280 px, roles and
permissions, and a dedicated backend. There's no Dashboard or Settings page.

## Known limitations

- Created products and users exist only until the page is reloaded (FakeStoreAPI doesn't save them).
- The token in `sessionStorage` is readable by any script running on the page (see the comparison above).
- No automated tests; quality was checked with strict TypeScript, ESLint, Prettier, production builds and manual
  testing in the browser.

## Time spent

**TODO (author):** fill in the actual time spent.
