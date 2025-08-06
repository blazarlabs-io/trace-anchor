import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

/**
 * Centers content and caps max‑width for desktop.
 */
export default function Container({ children }: ContainerProps) {
  return (
    <div className="mx-auto px-4 w-full max-w-[1024px]">
      {children}
    </div>
  );
}
