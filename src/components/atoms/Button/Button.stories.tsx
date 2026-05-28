import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useState } from 'react';
import { Button } from './Button';

/* ── Icons ──────────────────────────────────────────────────────────── */
const ArrowRightIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const DownloadIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
  </svg>
);

const TrashIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6M10 11v6M14 11v6M9 6V4h6v2" />
  </svg>
);

/* ── Meta ───────────────────────────────────────────────────────────── */
const meta = {
  title: 'Atoms/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
The \`Button\` component is the core interactive element of the design system.

- Extends all native \`<button>\` HTML attributes
- Supports 5 variants, 3 sizes, loading state, icons, error and warning states
- Fully accessible: \`aria-disabled\`, \`aria-busy\`, \`aria-invalid\`, \`focus-visible\` ring
- Built on CSS design tokens for consistent theming
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'danger'],
      description: 'Visual style of the button',
      table: { defaultValue: { summary: 'primary' } },
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Size of the button',
      table: { defaultValue: { summary: 'medium' } },
    },
    label: { control: 'text', description: 'Visible label text' },
    disabled: {
      control: 'boolean',
      description: 'Disables all interaction',
      table: { defaultValue: { summary: 'false' } },
    },
    loading: {
      control: 'boolean',
      description: 'Shows a spinner and disables interaction',
      table: { defaultValue: { summary: 'false' } },
    },
    error: {
      control: 'boolean',
      description: 'Marks the button as being in an error state — applies a red ring',
      table: { defaultValue: { summary: 'false' } },
    },
    warning: {
      control: 'text',
      description: 'Warning message shown below the button',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Stretches the button to fill its container',
      table: { defaultValue: { summary: 'false' } },
    },
    iconPosition: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Side the icon appears on',
      table: { defaultValue: { summary: 'left' } },
    },
    icon: {
      control: false,
      description: 'Icon node — any ReactNode (SVG, img, icon library component)',
    },
  },
  args: { onClick: fn(), label: 'Button' },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ── 1. Playground — fully interactive via controls panel ───────────── */
export const Playground: Story = {
  args: { variant: 'primary', size: 'medium', label: 'Click me' },
};

/* ── 2. Variants & Sizes — all in one grid ──────────────────────────── */
export const VariantsAndSizes: Story = {
  name: 'Variants & Sizes',
  parameters: {
    layout: 'padded',
    docs: {
      description: { story: 'All 5 variants across all 3 sizes.' },
    },
  },
  render: () => {
    const variants = ['primary', 'secondary', 'outline', 'ghost', 'danger'] as const;
    const sizes    = ['small', 'medium', 'large'] as const;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {sizes.map((size) => (
          <div key={size} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            {variants.map((variant) => (
              <Button
                key={variant}
                label={variant.charAt(0).toUpperCase() + variant.slice(1)}
                variant={variant}
                size={size}
                onClick={fn()}
              />
            ))}
          </div>
        ))}
      </div>
    );
  },
};

/* ── 3. Icons — left, right, combined with variants ─────────────────── */
export const WithIcons: Story = {
  name: 'With Icons',
  parameters: {
    layout: 'padded',
    docs: {
      description: { story: 'Icons can be placed on the left or right and work across all variants.' },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
      <Button label="Continue"        icon={<ArrowRightIcon />} iconPosition="left"  onClick={fn()} />
      <Button label="Continue"        icon={<ArrowRightIcon />} iconPosition="right" onClick={fn()} />
      <Button label="Download Report" icon={<DownloadIcon />}   variant="outline"    onClick={fn()} />
      <Button label="Delete"          icon={<TrashIcon />}      variant="danger"     onClick={fn()} />
    </div>
  ),
};

/* ── 4. States — disabled, loading, error, warning, full width ───────── */
export const States: Story = {
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: '`disabled` removes interaction. `loading` shows a spinner. `error` applies a red ring. `warning` shows a red message below. `fullWidth` stretches to its container.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 400 }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'flex-start' }}>
        <Button label="Disabled"   disabled                                            onClick={fn()} />
        <Button label="Loading"    loading                                             onClick={fn()} />
        <Button label="Error"      error                                               onClick={fn()} />
        <Button label="Save Draft" variant="outline" warning="You have unsaved changes." onClick={fn()} />
        <Button label="Deleting…"  variant="danger"  loading                          onClick={fn()} />
      </div>
      <Button
        label="Full Width"
        fullWidth
        icon={<ArrowRightIcon />}
        iconPosition="right"
        onClick={fn()}
      />
    </div>
  ),
};

/* ── 5. Interactive — async action with loading → error flow ─────────── */
export const Interactive: Story = {
  name: 'Interactive — Async Submit',
  parameters: {
    docs: {
      description: {
        story: 'Click to simulate an async action — loading activates for 1.5s then resolves into an error state.',
      },
    },
  },
  render: (args) => {
    const [loading, setLoading]   = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | undefined>(undefined);

    const handleClick = async () => {
      setErrorMsg(undefined);
      setLoading(true);
      await new Promise((res) => setTimeout(res, 1500));
      setLoading(false);
      setErrorMsg('Something went wrong. Please try again.');
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 8 }}>
        <Button
          {...args}
          label={loading ? 'Submitting…' : 'Submit Form'}
          loading={loading}
          error={!!errorMsg}
          onClick={handleClick}
        />
        {errorMsg && (
          <span style={{ fontSize: 12, color: '#dc2626' }}>{errorMsg}</span>
        )}
      </div>
    );
  },
};
