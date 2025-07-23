'use client';

import Navbar from './Navbar';
import Footer from './Footer';
import Container from './Container';
import ProtectedRoute from './ProtectedRoute';

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <Navbar />
      <div className="page-container">
        <Container>{children}</Container>
      </div>
      <Footer />
    </ProtectedRoute>
  );
}
