# React UI Blocks

`react-ui-blocks` is a lightweight and customizable React component library for building reusable, scalable user interfaces.

## Why `react-ui-blocks`?

- Reusable UI primitives for faster development
- TypeScript-friendly component APIs
- Storybook-ready local development workflow
- Supports responsive table column sizing (for example, `DataTable` `maxWidth`)

## Installation

```bash
npm install react-ui-blocks
```

or

```bash
yarn add react-ui-blocks
```

## Exports

### Components

- Badge
- Button
- Card
- CheckBox
- DataTable
- Drawer
- EllipsisLoader
- Image
- Input
- Layout
- Modal
- Popover
- Scrollbar
- Select
- SortBy
- Tabs

### Hooks

- useGetDevice
- useGetPosition

## Quick Start

```tsx
import { Button, DataTable } from "react-ui-blocks";

const columns = [
  { key: "id", label: "ID" },
  {
    key: "name",
    label: "Name",
    maxWidth: { mobile: 120, tablet: 160, desktop: 220 },
  },
  { key: "age", label: "Age" },
];

const data = [
  { id: 1, name: "Alice", age: 28 },
  { id: 2, name: "Bob", age: 34 },
];

export default function App() {
  return (
    <>
      <Button value="Click me" />
      <DataTable data={data} columns={columns} isPagination isSorting />
    </>
  );
}
```

## Development

Install dependencies:

```bash
npm install
```

Run Storybook:

```bash
npm run storybook
```

Build package:

```bash
npm run build
```

Build static Storybook:

```bash
npm run build-storybook
```

## License

MIT License © 2026 Mohanraj K

## Support

If this project helps you, consider giving it a ⭐ on GitHub.
