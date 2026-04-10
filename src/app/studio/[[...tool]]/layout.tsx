export const metadata = {
  title: 'Women in Focus — CMS Studio',
  description: 'Content management for womeninfocus.ng',
};

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#101112',
      }}
    >
      {children}
    </div>
  );
}
