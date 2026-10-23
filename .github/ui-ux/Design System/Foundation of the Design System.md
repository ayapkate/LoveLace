<img width="1281" height="1854" alt="Design ERP System Components" src="https://github.com/user-attachments/assets/4d96eabe-f296-4505-b20c-7aed03c82ae0" />

## Description
This introduces the core documentation for the **Lovelace Design System (v1.0)**. It establishes the baseline layout specifications, foundation styles, atomic components, and dark-mode operational patterns based on the official UI kit overview.

## 🎨 File
* **Figma File:** [Lovelace Design System v1.0 — UI Kit Assets](https://www.figma.com/design/FM6WYCFMiLBVagWohTv76D/Design-System?node-id=1-2&t=bO7qQt7s0lT1plQ5-1) 
* **Main Frame:** Overview / Cover Dashboard Panel

## Key Parts
* **Foundations**: Documented global **Inter** typography scales (20 styles) and functional color ramps (60 styles total, including the `#6F00FF` primary hex brand highlight).
* **Components**: Added implementation specifications for standard **Buttons** (5 sizes, 3 styles, 15 auto-layout states) and **Badges/Chips** templates.
* **Patterns**: Detailed the real-world operational user flows, specifically detailing the light-to-dark theme variants for the **Inventory Form** and **Recent Orders Data Table**.

### Typography Scale Definition
To ensure visual hierarchy and clean responsive rendering, font sizes are bundled into explicit design tokens rather than hardcoded point values:

| Token Name | Font Size (px) | Font Size (rem) | Line Height | Usage Example |
| :--- | :--- | :--- | :--- | :--- |
| `display-lg` | 40px | 2.500rem | 48px | Main Banner Header (*"One system..."*) |
| `heading-md` | 24px | 1.500rem | 32px | Section Titles (*"Typography", "Components"*) |
| `body-md` | 14px | 0.875rem | 20px | Standard Form Inputs & UI Labels |
| `caption-sm` | 11px | 0.688rem | 16px | Data Table Headers & Metadata |


## Documentation Preview

| Section | Component / Property | Key Specifications & Attributes | Visual Elements & Details |
| :--- | :--- | :--- | :--- |
| **Foundations** | **Typography & Colors** | Inter Family (20 styles) <br> 60 color styles | Functional ramps: Purple, Grayscale, Green, Red, Orange, Cyan. |
| **Components** | **Buttons & Badges** | Auto-layout enabled <br> Multi-size / Multi-state | Contains primary solid, ghost outline, icon-only variants, and status pill badges. |
| **Patterns** | **Operational Dashboards** | Dark mode forms & tables | Form inputs (Product/SKU/Qty) and compact order history tracking grid. |


## Related Issues
Closes #20



