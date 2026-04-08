export const metadata = {
  title: 'Amala Okafor — CMS Studio',
  description: 'Content management for amala.vercel.app',
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
