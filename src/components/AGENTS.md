# src/components — Agent Knowledge Base

## ThemeToggle

Manages the dark/light colour scheme toggle.

- `localStorage` key: `"theme"`, values: `"dark"` or `"light"`.
- An inline `<script>` in `BaseLayout.astro` reads this key before first paint to prevent flash of wrong theme.
- The component's own `<script>` re-applies the saved theme on mount and wires the click handler.
- Focus ring is handled by the global `:focus-visible` rule in `global.css` — do not add `focus-visible:*` classes directly to the button.

## LogicToggle

Tab switcher using the ARIA tab pattern (tablist / tab / tabpanel). No props; content via named slots.

### Slots

| Slot name | Purpose |
|---|---|
| `prose` | Prose explanation view |
| `diagram` | Diagram or structured view |

### Embedding in Systems posts

Systems posts must use the `.mdx` extension to import the component:

```mdx
import LogicToggle from '@components/LogicToggle.astro';

<LogicToggle>
  <div slot="prose">
    Your prose explanation.
  </div>
  <div slot="diagram">
    Your diagram or structured view.
  </div>
</LogicToggle>
```

`.md` files cannot import Astro components — only `.mdx` works.

### JS tab switching

The component script toggles the `.tab-btn-active` class on buttons to activate/deactivate tabs. The base `.tab-btn` class provides the inactive state; `.tab-btn-active` overrides text colour and border. When modifying the component, ensure `classList.add('tab-btn-active')` and `classList.remove('tab-btn-active')` remain in sync with the CSS in `global.css`.
