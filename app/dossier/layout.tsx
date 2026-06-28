import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dossier — Vedant Patil',
  description: 'Confidential achievements and interests',
};

export default function DossierLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
