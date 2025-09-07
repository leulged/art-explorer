// Drop page transition script to reduce JS; keep a lightweight container only.
export default function PageTransition({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
