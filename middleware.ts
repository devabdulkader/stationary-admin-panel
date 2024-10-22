import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtDecode } from 'jwt-decode';

export const decodedToken = (token: string) => {
  return jwtDecode(token);
};

export const tempToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZkODU1YTRhLTY2MDAtNDg5NC1iZDM3LTI0ZWQ4MGE3Mjk0YSIsImVtYWlsIjoiYWRtaW5AZXhhbXBsZS5jb20iLCJQaG9uZU51bWJlciI6IjExMTExMTExMCIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcyODY2MzMwMywiZXhwIjoxNzYwMTk5MzAzfQ.D9JAey0n24yamU8SMRrMYvoai8rs9DngXm2Hv4ZGl-E';
export function middleware(request: NextRequest) {
  // request.headers.set(
  //   'Authorization',
  //   `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZkODU1YTRhLTY2MDAtNDg5NC1iZDM3LTI0ZWQ4MGE3Mjk0YSIsImVtYWlsIjoiYWRtaW5AZXhhbXBsZS5jb20iLCJQaG9uZU51bWJlciI6IjExMTExMTExMCIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcyODY2MzMwMywiZXhwIjoxNzYwMTk5MzAzfQ.D9JAey0n24yamU8SMRrMYvoai8rs9DngXm2Hv4ZGl-E`,
  // );

  // const token = request.cookies.get('accessToken')?.value;

  // if (!token) {
  //   return NextResponse.redirect(new URL('/?showLoginModal=true', request.url));
  // }

  // const decodedData = decodedToken(token);

  // if (decodedData) {
  //   const exp = (decodedData as { exp: number })?.exp * 1000;
  //   const currentTime = new Date().getTime();
  //   if (currentTime > exp) {
  //     return NextResponse.redirect(
  //       new URL('/?showLoginModal=true', request.url),
  //     );
  //   }
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ['/:path*'],
};
