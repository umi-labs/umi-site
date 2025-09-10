# New Navigation System

## Overview

The new navigation system provides a modern, accessible dropdown menu with support for 3-level navigation hierarchy.

## Components

### NavDropdown

Main dropdown container that handles:

- Click outside to close
- Escape key to close
- Mouse enter/leave events
- Positioning and animations

### NavDropdownSection

Organizes content within dropdowns with optional titles and proper spacing.

### NavDropdownLink

Individual navigation links with support for:

- Images/thumbnails
- Descriptions
- Hover effects
- Click handlers

### NavDropdownSubmenu

3rd level navigation with:

- Expandable/collapsible behavior
- Chevron indicators
- Smooth animations

### NavDropdownSubmenuLink

Links within 3rd level submenus with:

- Compact styling
- Descriptions
- Click handlers

## Features

### 3-Level Navigation Support

1. **Level 1**: Main navigation items (Services, About, etc.)
2. **Level 2**: Sub-categories (Web Design, SEO, etc.)
3. **Level 3**: Specific pages (Landing Pages, E-commerce, etc.)

### Responsive Design

- Desktop: 2-column grid layout
- Mobile: Single column layout
- Adaptive dropdown widths

### Accessibility

- Keyboard navigation support
- ARIA labels and roles
- Focus management
- Screen reader friendly

### Animations

- Smooth fade + slide animations (200ms)
- Staggered content appearance
- Hover state transitions

## Usage

```tsx
<NavItem
  item={menuItem}
  setCurrentItem={setCurrentItem}
  currentItem={currentItem}
/>
```

The system automatically detects navigation depth and renders appropriate components for each level.

## Styling

- Modern white dropdowns with subtle shadows
- Rounded corners and proper spacing
- Hover effects and transitions
- Consistent typography hierarchy
