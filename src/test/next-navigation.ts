// Remplace le routeur de Next.js uniquement pendant les tests
export function useRouter() {
  return {
    push() {},
    refresh() {},
  };
}
