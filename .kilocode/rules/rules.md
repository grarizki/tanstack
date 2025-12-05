# AI System Instructions for This Codebase

These instructions define mandatory architectural and testing rules the AI assistant MUST follow when generating or modifying code in this repository.

## 1. Architectural Separation: Presentation vs Logic

Always enforce a clear boundary between UI (presentation) and logic (state, business rules, side-effects, data access).

- **Presentation Layer (UI)**: Only responsible for rendering props, receiving user interaction callbacks, and minimal view-specific formatting.
  - Allowed: JSX markup, styling classes, mapping over already prepared data arrays, conditional rendering based on simple booleans passed in.
  - Disallowed: Direct API calls, complex data transformation, business validation chains, cross-cutting concerns (logging, analytics), and deep state orchestration.

- **Logic Layer**: Encapsulate all non-trivial stateful and business logic outside of the presentation components.
  - Use one of the following patterns based on context:
    - `hooks/` custom hooks (e.g. `useFeatureX.ts`)
    - `services/` for API client abstractions or domain operations
    - `lib/` for pure utility or stateless helpers
    - `contexts/` (if global React context is required)
  - Provide the component only with pre-processed, ready-to-render props & callback handlers.

### 1.1 Recommended Directory Patterns

For a new feature `FeatureName`:
```
src/components/FeatureName/FeatureName.tsx        (presentation)
src/components/FeatureName/__tests__/FeatureName.test.tsx
src/components/FeatureName/hooks/useFeatureName.ts (logic: state handling)
src/services/featureName/featureNameService.ts    (external calls / side effects)
src/lib/featureName/transform.ts                  (pure transformations)
```

### 1.2 Component Rules

- Keep components as **pure** and as **stateless** as possible; prefer receiving data + handlers via props.
- Heavy asynchronous workflows (multiple awaits, retries, fallbacks) MUST live in hooks or services.
- Data shaping (filtering, grouping, sorting, formatting) MUST be done in utilities BEFORE reaching the component.
- Avoid hidden coupling: no direct import of low-level services inside deeply nested UI elements—pass results through props.

### 1.3 Hooks Guidelines

- A hook file should focus on: state initialization, side-effects, orchestration of service calls, memoized selectors.
- Export only the public hook and (optionally) supporting types. Keep internal helpers private.
- Never leak raw response objects directly to the UI if transformation/normalization is warranted.

## 2. Mandatory Unit Tests for Every Component

Every React component, hook, and service introduced or modified MUST have or update an accompanying unit test.

### 2.1 Test Location & Naming

- Place tests beside the component in `__tests__/`.
- File naming convention:
  - Component: `ComponentName.test.tsx`
  - Hook: `useFeatureName.test.ts`
  - Service / util: `thingName.test.ts`
- Avoid duplicating snapshot tests unless structural output is critical; favor behavioral assertions.

### 2.2 Minimum Test Coverage Expectations

For each unit (component/hook/service), include tests for:
- Rendering with minimal required props / baseline state.
- Critical variations (e.g., loading, error, empty states).
- User interactions (clicks, form input changes, keyboard events).
- Derived outputs (conditional formatting, transformed data display).
- Edge cases (null / undefined / boundary numeric values).

### 2.3 Hook Tests

- Use React Testing Library with `renderHook` (or equivalent) for hooks.
- Assert initial state, state transitions after invoking exposed handlers, and side-effect outcomes (mock services).

### 2.4 Service / Utility Tests

- Mock external dependencies (HTTP clients, timers) using appropriate mocking tools.
- Assert success and failure paths explicitly.
  - Example: API service returns data, network failure, validation error.
- Pure functions should have deterministic input-output test cases.

### 2.5 Test Quality Rules

- DO NOT test implementation details (internal variable names, private helper invocations).
- DO test externally observable behavior (DOM changes, returned values, calls made to mocked dependencies).
- Prefer `data-testid` only when semantic selectors are impractical.
- Ensure no dependence on execution order; each test should be isolated.

## 3. Code Generation Requirements for AI

When the AI creates or modifies code:

- **MUST check existing components first**: Before creating any new component, search the `src/components/` directory for similar or reusable components. Reuse existing components whenever possible to maintain consistency and avoid duplication.
- MUST also generate or update tests that reflect the changes.
- MUST separate new logic into a hook/service if complexity exceeds basic conditional rendering.
- MUST not inline large transformation logic inside JSX; extract to utility functions.
- MUST avoid duplicating existing patterns; align with already established folder & naming conventions.
- MUST ensure imports use correct, consistent casing (case-sensitive path hygiene).
- MUST not introduce hidden side-effects into components.

### 3.1 Image-to-Component Generation

When an engineer attaches an image (screenshot, mockup, or design) requesting component creation:

**AI MUST follow this workflow:**

1. **Check for Existing Components First**
   - Search `src/components/` directory for similar components
   - Use `list_dir`, `file_search`, `grep_search`, or `semantic_search` tools to find reusable components
   - Review existing component APIs and determine if they can be reused or extended
   - Only proceed with new component creation if no suitable existing component found
   - Document why existing components cannot be reused (if applicable)

2. **Analyze the Image**
   - Identify visual structure: layout, spacing, colors, typography, interactive elements
   - Determine component type (card, button, form, modal, etc.)
   - Note responsive behavior hints (mobile vs desktop views if shown)
   - **Cross-reference with existing components found in step 1**
   - Identify reusable existing components from the codebase that can be composed together

3. **Create Separated Architecture**
   - **Presentation Component** (`ComponentName.tsx`):
     - Pure visual rendering matching the design
     - Accept data via props (no hardcoded content unless placeholder)
     - **Compose using existing components found in step 1 whenever possible**
     - Use existing design system components when available
     - Follow project's styling conventions (Tailwind CSS classes observed in codebase)
   
   - **Hook for Logic** (`hooks/useComponentName.ts`) - IF component has:
     - State management needs
     - Data fetching requirements
     - Complex user interactions
     - Form validation
     - Side effects
   
   - **Service** (`services/componentName/`) - IF component requires:
     - API calls
     - External data fetching
     - Business logic operations

3. **Generate Type Definitions**
   - Create `types.ts` with proper TypeScript interfaces for:
     - Component props
     - Data models
     - API responses
     - Event handlers

4. **Create Comprehensive Tests**
   - **Component tests** (`__tests__/ComponentName.test.tsx`):
     - Renders with all prop variations shown in image
     - Tests all interactive states (hover, active, disabled, loading)
     - Tests responsive behavior if multiple viewports shown
     - Tests accessibility (keyboard navigation, ARIA labels)
   
   - **Hook tests** (if applicable):
     - State initialization and updates
     - Side effect execution
     - Error handling scenarios
   
   - **Service tests** (if applicable):
     - Success and failure paths
     - Mock API responses

5. **Match Design Specifications**
   - Colors: Extract from image and use theme tokens or exact values
   - Spacing: Match visual padding, margins, gaps
   - Typography: Font sizes, weights, line heights
   - Borders: Radius, width, colors
   - Shadows: Box shadows if visible
   - Icons: Use existing icon library or specify requirements

6. **Provide Usage Example**
   - Create a demo file or include usage documentation showing:
     - Import statement
     - Example with realistic props
     - All prop variations
     - Integration guidance

**Output Structure Example:**
```
src/components/ComponentName/
├── ComponentName.tsx          (presentation)
├── types.ts                   (TypeScript definitions)
├── index.ts                   (exports)
├── hooks/
│   └── useComponentName.ts   (logic - if needed)
├── __tests__/
│   ├── ComponentName.test.tsx
│   └── useComponentName.test.ts (if hook exists)
└── ComponentName.stories.tsx  (optional: Storybook story)
```

**Example Response Format:**

When creating from image, AI should:
1. **Search existing components**: "Searching for existing components that match this design..."
2. **Report findings**: "Found existing components: Button, Card, Typography - will reuse these" OR "No matching components found, will create new ComponentName"
3. Confirm understanding: "I see a [description] component with [key features]"
4. List what will be created: "I'll create: ComponentName.tsx, types.ts, useComponentName.ts, tests"
5. Create all files following separation rules
6. Provide usage example
7. Note any assumptions made or design decisions

**Quality Checklist for Image-Based Components:**

- ✅ Visual match: Component appearance closely matches the provided image
- ✅ Separation: Presentation and logic properly separated
- ✅ Types: All props and data structures typed
- ✅ Tests: Comprehensive test coverage (>80% target)
- ✅ Reusability: Component is generic and reusable (no hardcoded business logic)
- ✅ Accessibility: Proper semantic HTML, ARIA labels, keyboard support
- ✅ Responsive: Handles different screen sizes appropriately
- ✅ Documentation: Props documented with JSDoc comments

## 4. Error Handling & Logging

- Services should return structured results (`{ data, error, isError }`) rather than throwing unless truly exceptional.
- Components should not directly `console.*` except for unavoidable warnings; prefer centralized logger utilities.

## 5. Performance & Maintainability

- Memoize expensive derived values in hooks (`useMemo`) and event handlers (`useCallback`) only when needed.
- Avoid premature optimization—clarity first—unless a known performance issue exists.
- Ensure deterministic test timing (avoid arbitrary `setTimeout` without mocking timers).

## 6. Accessibility & Semantics

- Prefer semantic HTML elements (`button`, `nav`, `section`, `header`) instead of generic `div` wrappers where meaningful.
- Ensure interactive elements are keyboard-accessible.
- Tests should include basic accessibility assertions when feasible (e.g., role presence, label association).

## 7. Pull Request / Change Expectations (AI-generated)

Each AI-driven change should produce:
1. Updated or new component code (presentation + isolated logic). 
2. Associated test files with meaningful assertions. 
3. Minimal, focused diff; avoid unrelated refactors. 
4. No reduction in existing test coverage or removal of critical assertions. 

## 8. Anti-Patterns to Avoid

- Mixing data fetching code inside React component bodies.
- Large anonymous inline functions passed deeply through props.
- Copy-pasting similar logic across components instead of extracting a hook.
- Silent failure swallowing (returning empty UI without logging / structured error response).
- Creating components without tests or leaving TODO placeholders.

## 9. Example Skeletons

### Component + Hook
```tsx
// src/components/FeatureX/FeatureX.tsx
import type { FeatureXProps } from './types';
import { useFeatureX } from './hooks/useFeatureX';

export function FeatureX({ initialId }: FeatureXProps) {
  const { loading, item, error, refresh } = useFeatureX(initialId);

  if (loading) return <div>Loading...</div>;
  if (error) return <div role="alert">{error}</div>;
  if (!item) return <div>No data.</div>;

  return (
    <div>
      <h2>{item.title}</h2>
      <button onClick={refresh}>Reload</button>
    </div>
  );
}
```
```ts
// src/components/FeatureX/hooks/useFeatureX.ts
import { useState, useCallback, useEffect } from 'react';
import { fetchItem } from '@/services/featureX/featureXService';

export function useFeatureX(id: string) {
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, isError, error } = await fetchItem(id);
    if (isError) setError(error instanceof Error ? error.message : 'Failed');
    setItem(data);
    setLoading(false);
  }, [id]);

  useEffect(() => { load(); }, [load]);

  return { loading, item, error, refresh: load };
}
```
```tsx
// src/components/FeatureX/__tests__/FeatureX.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { FeatureX } from '../FeatureX';
// Mock hook or service as needed

describe('FeatureX', () => {
  it('renders loading state', () => {
    // Mock hook to return loading
  });
  it('renders error state', () => {
    // Mock hook to return error
  });
  it('renders data and handles refresh', () => {
    // Mock hook with item and assert refresh called
  });
});
```

## 10. Enforcement

The AI assistant MUST refuse (or immediately correct) requests that:
- Ask to put complex logic directly in UI components without separation.
- Omit test creation for new components/hooks.
- Introduce side-effects inside presentation without justification.

---
By following these rules, we maintain a scalable, testable, and maintainable codebase. The AI assistant is accountable for adhering strictly to this document when generating or modifying code.
