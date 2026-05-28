import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { TextField } from './TextField';

/* ── Inline SVG icons ───────────────────────────────────────────────── */
const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <path d="M21 21l-4.35-4.35" />
  </svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const UserIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
  </svg>
);

/* ── Meta ───────────────────────────────────────────────────────────── */
const meta = {
  title: 'Atoms/TextField',
  component: TextField,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
The \`TextField\` component is the single-line text input for the design system.

- Extends all native \`<input>\` HTML attributes
- Supports leading and trailing icons, password visibility toggle
- Label, helper text, error, warning, character count
- Fully accessible: linked label, \`aria-describedby\`, \`aria-invalid\`, \`aria-required\`
- Built-in password show/hide toggle when \`type="password"\`
- Built on CSS design tokens
        `,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: 360 }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    label:       { control: 'text' },
    placeholder: { control: 'text' },
    helperText:  { control: 'text' },
    errorText:   { control: 'text' },
    warningText: { control: 'text' },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
      table: { defaultValue: { summary: 'text' } },
    },
    required:  { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    disabled:  { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    showCount: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    leadingIcon:  { control: false },
    trailingIcon: { control: false },
  },
  args: {
    label: 'Label',
    placeholder: 'Placeholder…',
  },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ── 1. Playground ──────────────────────────────────────────────────── */
export const Playground: Story = {
  args: {
    label: 'Full Name',
    placeholder: 'Enter your name…',
    helperText: 'As it appears on your ID.',
  },
};

/* ── 2. States ──────────────────────────────────────────────────────── */
export const States: Story = {
  parameters: {
    layout: 'padded',
    docs: {
      description: { story: 'Default, disabled, error, and warning states.' },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, width: 760 }}>
        <Story />
      </div>
    ),
  ],
  render: () => (
    <>
      <TextField label="Default"  placeholder="Enter value…" helperText="This is helper text." />
      <TextField label="Disabled" placeholder="Not editable" disabled helperText="This field is disabled." />
      <TextField label="Error"    placeholder="Enter value…" errorText="This field is required." defaultValue="bad@input" />
      <TextField label="Warning"  placeholder="Enter value…" warningText="Double-check this value." defaultValue="maybe@ok.com" />
    </>
  ),
};

/* ── 3. Input Types ─────────────────────────────────────────────────── */
export const InputTypes: Story = {
  name: 'Input Types',
  parameters: {
    layout: 'padded',
    docs: {
      description: { story: 'Common input types — email, password (with toggle), number, tel.' },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, width: 760 }}>
        <Story />
      </div>
    ),
  ],
  render: () => (
    <>
      <TextField label="Email"    type="email"    placeholder="you@example.com"  leadingIcon={<MailIcon />} />
      <TextField label="Password" type="password" placeholder="Enter password…" />
      <TextField label="Phone"    type="tel"      placeholder="+91 00000 00000"  leadingIcon={<PhoneIcon />} />
      <TextField label="Search"   type="search"   placeholder="Search…"          leadingIcon={<SearchIcon />} />
    </>
  ),
};

/* ── 4. With Icons ──────────────────────────────────────────────────── */
export const WithIcons: Story = {
  name: 'With Icons',
  parameters: {
    layout: 'padded',
    docs: {
      description: { story: 'Leading and trailing icons can be any ReactNode — SVG, img, or icon library component.' },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 360 }}>
        <Story />
      </div>
    ),
  ],
  render: () => (
    <>
      <TextField label="Username"    placeholder="Enter username…"  leadingIcon={<UserIcon />} />
      <TextField label="Search"      placeholder="Search…"          leadingIcon={<SearchIcon />} />
      <TextField label="Email"       placeholder="you@example.com"  leadingIcon={<MailIcon />} trailingIcon={<SearchIcon />} />
    </>
  ),
};

/* ── 5. Required + Character Count ─────────────────────────────────── */
export const RequiredWithCount: Story = {
  name: 'Required & Character Count',
  args: {
    label: 'Username',
    placeholder: 'Choose a username…',
    required: true,
    showCount: true,
    maxLength: 30,
    helperText: 'Only letters, numbers, and underscores.',
    leadingIcon: <UserIcon />,
  },
};
