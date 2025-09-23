import { cookies } from "next/headers";

// Function to get initial theme from cookies
export async function getInitialTheme() {
  const cookieStore = await cookies();
  const theme = cookieStore.get('theme')?.value;
  return theme === 'dark' ? 'dark' : 'light';
}
