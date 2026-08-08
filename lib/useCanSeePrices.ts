'use client';

import { useSession } from 'next-auth/react';

export function useCanSeePrices(): boolean {
  const { status } = useSession();
  // Mientras la sesión carga devolvemos false para evitar el "flash" del precio.
  return status === 'authenticated';
}
