/**
 * GridSync mark: two offset horizontal lines (floors / load moving in time) held by one
 * vertical alignment line (the grid). Drawn on a 24-unit grid with a 2.5 stroke so it
 * survives favicon sizes. See /brand for clear-space and minimum-size rules.
 */
export function Mark({ className, title }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="square"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
    >
      {title && <title>{title}</title>}
      <path d="M8 3.25v17.5" />
      <path d="M3.25 9h12.5" />
      <path d="M8 15h12.75" />
    </svg>
  );
}
