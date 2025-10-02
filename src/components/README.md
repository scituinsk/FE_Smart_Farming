# Button Component Documentation

Komponen Button yang dapat digunakan kembali dengan berbagai varian menggunakan class-variance-authority (CVA) untuk manajemen styling yang konsisten dan fleksibel.

## Features

- ✅ Multiple variants (default, primary, secondary, destructive, outline, ghost, link)
- ✅ Multiple sizes (xs, sm, default, lg, xl, icon)
- ✅ Border radius options (none, sm, default, lg, xl, full)
- ✅ Disabled state support
- ✅ Custom className override support
- ✅ Forward ref support
- ✅ TypeScript-ready structure
- ✅ Consistent styling with CVA
- ✅ Accessible design patterns

## Installation

Pastikan dependencies berikut sudah terinstall:

```bash
npm install class-variance-authority clsx tailwind-merge
```

## Basic Usage

```jsx
import { Button } from "./components";

function App() {
  return (
    <div>
      <Button>Default Button</Button>
      <Button variant="primary">Primary Button</Button>
      <Button
        variant="outline"
        size="lg"
      >
        Large Outline Button
      </Button>
    </div>
  );
}
```

## Props

| Prop        | Type        | Default     | Description                                                                                                                                                   |
| ----------- | ----------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `variant`   | `string`    | `"default"` | Varian visual button (default, primary, secondary, destructive, outline, outline-primary, outline-destructive, ghost, ghost-primary, ghost-destructive, link) |
| `size`      | `string`    | `"default"` | Ukuran button (xs, sm, default, lg, xl, icon)                                                                                                                 |
| `rounded`   | `string`    | `"default"` | Border radius (none, sm, default, lg, xl, full)                                                                                                               |
| `disabled`  | `boolean`   | `false`     | Status disabled                                                                                                                                               |
| `className` | `string`    | `undefined` | Custom CSS classes                                                                                                                                            |
| `onClick`   | `function`  | `undefined` | Click handler                                                                                                                                                 |
| `type`      | `string`    | `"button"`  | Button type (button, submit, reset)                                                                                                                           |
| `children`  | `ReactNode` | `undefined` | Konten button                                                                                                                                                 |

## Variants

### Primary Variants

- `default` - Blue background dengan hover effect
- `primary` - Green background untuk aksi utama
- `secondary` - Gray background untuk aksi sekunder
- `destructive` - Red background untuk aksi berbahaya

### Outline Variants

- `outline` - Border gray dengan background transparan
- `outline-primary` - Border green dengan background transparan
- `outline-destructive` - Border red dengan background transparan

### Ghost Variants

- `ghost` - Background transparan dengan hover effect
- `ghost-primary` - Background transparan dengan warna primary
- `ghost-destructive` - Background transparan dengan warna destructive

### Link Variant

- `link` - Styling seperti link dengan underline

## Sizes

- `xs` - Extra small (height: 32px)
- `sm` - Small (height: 36px)
- `default` - Default (height: 40px)
- `lg` - Large (height: 44px)
- `xl` - Extra large (height: 48px)
- `icon` - Square icon button (40x40px)

## Border Radius

- `none` - Tanpa border radius
- `sm` - Small radius
- `default` - Default radius
- `lg` - Large radius
- `xl` - Extra large radius
- `full` - Fully rounded

## Examples

### Smart Farming Theme Buttons

```jsx
// Monitor button dengan tema Smart Farming
<Button
  variant="primary"
  size="lg"
  className="bg-[#326765] hover:bg-[#285550] text-white"
>
  Monitor Temperature
</Button>

// Outline button untuk aksi sekunder
<Button
  variant="outline-primary"
  size="lg"
  className="border-[#326765] text-[#326765] hover:bg-[#326765] hover:text-white"
>
  Check Humidity
</Button>

// Ghost button untuk aksi ringan
<Button
  variant="ghost"
  size="lg"
  className="text-[#326765] hover:bg-[#e6f3f2]"
>
  Water Level Status
</Button>
```

### Action Buttons

```jsx
// Start irrigation dengan icon
<Button
  variant="default"
  size="lg"
  rounded="full"
  className="bg-green-600 hover:bg-green-700"
>
  🌱 Start Irrigation
</Button>

// Emergency stop
<Button
  variant="destructive"
  size="lg"
  onClick={handleEmergencyStop}
>
  🛑 Emergency Stop
</Button>

// Analytics button
<Button
  variant="outline"
  size="lg"
  rounded="xl"
  className="border-2 border-blue-500 text-blue-600 hover:bg-blue-50"
>
  📊 View Analytics
</Button>
```

### Form Buttons

```jsx
// Submit button
<Button
  type="submit"
  variant="primary"
  size="lg"
>
  Save Settings
</Button>

// Cancel button
<Button
  type="button"
  variant="outline"
  onClick={handleCancel}
>
  Cancel
</Button>

// Disabled state
<Button disabled>
  Processing...
</Button>
```

## Customization

### Override Default Styles

```jsx
// Menggunakan className untuk override styling
<Button
  variant="primary"
  className="!bg-purple-600 !hover:bg-purple-700 !text-white"
>
  Custom Purple Button
</Button>
```

### Extend Variants

Untuk menambah varian baru, edit file `Button.jsx` pada bagian `buttonVariants`:

```jsx
const buttonVariants = cva(
  // base styles...
  {
    variants: {
      variant: {
        // existing variants...
        warning: "bg-yellow-600 text-white hover:bg-yellow-700",
        info: "bg-blue-600 text-white hover:bg-blue-700",
      },
      // other variant types...
    },
  }
);
```

## Accessibility

- Button menggunakan semantic HTML `<button>` element
- Support untuk `disabled` state
- Proper focus management dengan `focus-visible:outline-none focus-visible:ring-2`
- Compatible dengan screen readers

## Best Practices

1. **Consistent Usage**: Gunakan varian yang konsisten di seluruh aplikasi
2. **Semantic Variants**: Pilih varian yang sesuai dengan konteks (destructive untuk aksi berbahaya, primary untuk aksi utama)
3. **Size Hierarchy**: Gunakan size yang tepat untuk hierarki visual
4. **Accessibility**: Selalu provide meaningful text atau aria-label
5. **Loading States**: Gunakan disabled state saat proses sedang berjalan

## File Structure

```
src/
  components/
    Button.jsx          # Main button component
    index.js           # Export file
  pages/
    ButtonDemo.jsx     # Demo page
  utils/
    cn.js             # Utility function for class merging
```

## Dependencies

- `class-variance-authority` - Untuk manajemen varian styling
- `clsx` - Untuk conditional classes
- `tailwind-merge` - Untuk merging Tailwind classes
- `react` - React hooks (forwardRef)
