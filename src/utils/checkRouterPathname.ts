export const checkRouterPathname = (pathname: string) => {
	if (pathname === '/login') return false;
	if (pathname === '/dashboard') return false;

	return true;
};
