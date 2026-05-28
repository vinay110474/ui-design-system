import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextArea } from './TextArea';

const meta = {
  title: 'Atoms/TextArea',
  component: TextArea,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
The \`TextArea\` component is the multi-line text input for the design system.

- Extends all native \`<textarea>\` HTML attributes
- Supports label, helper text, error, warning, and character count
- Fully accessible: linked label, \`aria-describedby\`, \`aria-invalid\`, \`aria-required\`
- Uses \`forwardRef\` for ref forwarding
- Built on CSS design tokens
        `,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: 400 }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label displayed above the textarea',
    },
    helperText: {
      control: 'text',
      description: 'Helper text shown below the textarea',
    },
    errorText: {
      control: 'text',
      description: 'Error message — replaces helperText and applies error styles',
    },
    warningText: {
      control: 'text',
      description: 'Warning message — applies warning styles',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    required: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    disabled: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    showCount: {
      control: 'boolean',
      description: 'Shows character count (requires maxLength)',
      table: { defaultValue: { summary: 'false' } },
    },
    rows: {
      control: 'number',
      description: 'Number of visible text rows',
    },
  },
  args: {
    label: 'Description',
    placeholder: 'Enter your text here…',
  },
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ── 1. Playground ──────────────────────────────────────────────────── */
export const Playground: Story = {
  args: {
    label: 'Description',
    placeholder: 'Enter your text here…',
    helperText: 'Maximum 300 characters.',
  },
};

/* ── 2. States — all in one view ────────────────────────────────────── */
export const States: Story = {
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Default, disabled, error, and warning states side by side.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, width: 820 }}>
        <Story />
      </div>
    ),
  ],
  render: () => (
    <>
      <TextArea
        label="Default"
        placeholder="Enter description…"
        helperText="This is a helper text."
      />
      <TextArea
        label="Disabled"
        placeholder="Not editable"
        disabled
        helperText="This field is disabled."
      />
      <TextArea
        label="Error"
        placeholder="Enter description…"
        errorText="This field is required."
        defaultValue="Some invalid input"
      />
      <TextArea
        label="Warning"
        placeholder="Enter description…"
        warningText="You are approaching the limit."
        defaultValue="Some cautionary input"
      />
    </>
  ),
};

/* ── 3. With Required + Character Count ─────────────────────────────── */
export const RequiredWithCount: Story = {
  name: 'Required & Character Count',
  args: {
    label: 'Bio',
    placeholder: 'Tell us about yourself…',
    required: true,
    showCount: true,
    maxLength: 150,
    helperText: 'Keep it brief and professional.',
    rows: 4,
  },
};

