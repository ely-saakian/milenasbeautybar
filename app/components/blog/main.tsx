interface MainProps {
  children: React.ReactNode;
}

export function Main({ children }: MainProps) {
  return (
    <main className="flex flex-col px-5 space-y-10 mx-auto max-w-4xl py-10">
      {children}
    </main>
  );
}
