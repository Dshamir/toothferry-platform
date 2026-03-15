import type { Config } from '@puckeditor/core';
import { Card } from '@/components/ui/Card';
import { KpiCard } from '@/components/ui/KpiCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';

type PuckProps = {
  Heading: { text: string; level: 'h1' | 'h2' | 'h3' | 'h4' };
  Paragraph: { text: string };
  Card: { padding: boolean };
  KpiCard: { label: string; value: number; delta: string; deltaDirection: 'up' | 'down' | 'neutral'; prefix: string; suffix: string };
  Badge: { variant: 'progress' | 'ready' | 'review' | 'reviewed' | 'pending' | 'error' | 'info' | 'success'; text: string };
  Button: { label: string; variant: 'primary' | 'secondary' | 'ghost' | 'danger'; size: 'sm' | 'md' | 'lg' };
  ProgressBar: { value: number; color: string; height: number };
  Section: { backgroundColor: string };
  Columns: { columns: '2' | '3' | '4' };
  Spacer: { height: number };
};

export const puckConfig: Config<PuckProps> = {
  categories: {
    typography: { components: ['Heading', 'Paragraph'] },
    layout: { components: ['Section', 'Columns', 'Spacer'] },
    ui: { components: ['Card', 'KpiCard', 'Badge', 'Button', 'ProgressBar'] },
  },
  components: {
    Heading: {
      fields: {
        text: { type: 'text' },
        level: {
          type: 'select',
          options: [
            { label: 'H1', value: 'h1' },
            { label: 'H2', value: 'h2' },
            { label: 'H3', value: 'h3' },
            { label: 'H4', value: 'h4' },
          ],
        },
      },
      defaultProps: { text: 'Heading', level: 'h2' },
      render: ({ text, level }) => {
        const Tag = level;
        const sizes = { h1: '36px', h2: '28px', h3: '22px', h4: '18px' };
        return (
          <Tag style={{ fontSize: sizes[level], fontWeight: 700, color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}>
            {text}
          </Tag>
        );
      },
    },

    Paragraph: {
      fields: {
        text: { type: 'textarea' },
      },
      defaultProps: { text: 'Enter your text here.' },
      render: ({ text }) => (
        <p style={{ fontSize: '15px', lineHeight: 1.7, color: 'var(--color-text-secondary)' }}>
          {text}
        </p>
      ),
    },

    Card: {
      fields: {
        padding: { type: 'radio', options: [{ label: 'Yes', value: true }, { label: 'No', value: false }] },
      },
      defaultProps: { padding: true },
      render: ({ padding, puck }) => (
        <Card padding={padding}>{puck.renderDropZone({ zone: 'card-content' })}</Card>
      ),
    },

    KpiCard: {
      fields: {
        label: { type: 'text' },
        value: { type: 'number' },
        delta: { type: 'text' },
        deltaDirection: {
          type: 'select',
          options: [
            { label: 'Up', value: 'up' },
            { label: 'Down', value: 'down' },
            { label: 'Neutral', value: 'neutral' },
          ],
        },
        prefix: { type: 'text' },
        suffix: { type: 'text' },
      },
      defaultProps: { label: 'Metric', value: 42, delta: '+5%', deltaDirection: 'up', prefix: '', suffix: '' },
      render: ({ label, value, delta, deltaDirection, prefix, suffix }) => (
        <KpiCard label={label} value={value} delta={delta} deltaDirection={deltaDirection} prefix={prefix} suffix={suffix} />
      ),
    },

    Badge: {
      fields: {
        variant: {
          type: 'select',
          options: [
            { label: 'Progress', value: 'progress' },
            { label: 'Ready', value: 'ready' },
            { label: 'Review', value: 'review' },
            { label: 'Reviewed', value: 'reviewed' },
            { label: 'Pending', value: 'pending' },
            { label: 'Error', value: 'error' },
            { label: 'Info', value: 'info' },
            { label: 'Success', value: 'success' },
          ],
        },
        text: { type: 'text' },
      },
      defaultProps: { variant: 'info', text: 'Badge' },
      render: ({ variant, text }) => <Badge variant={variant}>{text}</Badge>,
    },

    Button: {
      fields: {
        label: { type: 'text' },
        variant: {
          type: 'select',
          options: [
            { label: 'Primary', value: 'primary' },
            { label: 'Secondary', value: 'secondary' },
            { label: 'Ghost', value: 'ghost' },
            { label: 'Danger', value: 'danger' },
          ],
        },
        size: {
          type: 'select',
          options: [
            { label: 'Small', value: 'sm' },
            { label: 'Medium', value: 'md' },
            { label: 'Large', value: 'lg' },
          ],
        },
      },
      defaultProps: { label: 'Click me', variant: 'primary', size: 'md' },
      render: ({ label, variant, size }) => <Button variant={variant} size={size}>{label}</Button>,
    },

    ProgressBar: {
      fields: {
        value: { type: 'number', min: 0, max: 100 },
        color: { type: 'text' },
        height: { type: 'number', min: 2, max: 24 },
      },
      defaultProps: { value: 65, color: '', height: 6 },
      render: ({ value, color, height }) => (
        <ProgressBar value={value} color={color || undefined} height={height} />
      ),
    },

    Section: {
      fields: {
        backgroundColor: { type: 'text' },
      },
      defaultProps: { backgroundColor: '' },
      render: ({ backgroundColor, puck }) => (
        <div style={{ backgroundColor: backgroundColor || undefined, padding: '24px', borderRadius: '12px' }}>
          {puck.renderDropZone({ zone: 'section-content' })}
        </div>
      ),
    },

    Columns: {
      fields: {
        columns: {
          type: 'select',
          options: [
            { label: '2 Columns', value: '2' },
            { label: '3 Columns', value: '3' },
            { label: '4 Columns', value: '4' },
          ],
        },
      },
      defaultProps: { columns: '2' },
      render: ({ columns, puck }) => {
        const count = parseInt(columns, 10);
        return (
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${count}, 1fr)`, gap: '16px' }}>
            {Array.from({ length: count }, (_, i) => (
              <div key={i}>{puck.renderDropZone({ zone: `column-${i}` })}</div>
            ))}
          </div>
        );
      },
    },

    Spacer: {
      fields: {
        height: { type: 'number', min: 4, max: 200 },
      },
      defaultProps: { height: 24 },
      render: ({ height }) => <div style={{ height }} />,
    },
  },
};
