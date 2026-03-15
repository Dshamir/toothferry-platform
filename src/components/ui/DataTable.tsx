interface Column<T> {
  key: string;
  header: string;
  render?: (item: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (item: T) => void;
  className?: string;
}

export function DataTable<T extends Record<string, unknown>>({ columns, data, onRowClick, className = '' }: DataTableProps<T>) {
  return (
    <div className={`w-full overflow-x-auto rounded-[var(--radius-card)] border border-[var(--color-border-subtle)] shadow-[var(--card-shadow)] ${className}`}>
      <table className="w-full border-collapse text-[13px]">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className={`px-4 py-3 text-left text-[11px] font-semibold tracking-[0.04em] uppercase text-[var(--color-text-secondary)] bg-[var(--color-bg-sunken)] border-b border-[var(--color-border-subtle)] ${col.className || ''}`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
            <tr
              key={i}
              onClick={() => onRowClick?.(item)}
              className={`border-b border-[var(--color-border-subtle)] last:border-b-0 ${onRowClick ? 'cursor-pointer hover:bg-[var(--brand-25,var(--p-cobalt-25))]' : ''}`}
            >
              {columns.map((col) => (
                <td key={col.key} className={`px-4 py-3 text-[var(--color-text-primary)] ${col.className || ''}`}>
                  {col.render ? col.render(item) : String(item[col.key] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
