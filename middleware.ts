// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';
// import { jwtDecode } from 'jwt-decode';

// export const decodedToken = (token: string) => {
//   return jwtDecode(token);
// };

// export const tempToken =
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZkODU1YTRhLTY2MDAtNDg5NC1iZDM3LTI0ZWQ4MGE3Mjk0YSIsImVtYWlsIjoiYWRtaW5AZXhhbXBsZS5jb20iLCJQaG9uZU51bWJlciI6IjExMTExMTExMCIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcyODY2MzMwMywiZXhwIjoxNzYwMTk5MzAzfQ.D9JAey0n24yamU8SMRrMYvoai8rs9DngXm2Hv4ZGl-E';
// export function middleware(request: NextRequest) {
//   // request.headers.set(
//   //   'Authorization',
//   //   `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZkODU1YTRhLTY2MDAtNDg5NC1iZDM3LTI0ZWQ4MGE3Mjk0YSIsImVtYWlsIjoiYWRtaW5AZXhhbXBsZS5jb20iLCJQaG9uZU51bWJlciI6IjExMTExMTExMCIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcyODY2MzMwMywiZXhwIjoxNzYwMTk5MzAzfQ.D9JAey0n24yamU8SMRrMYvoai8rs9DngXm2Hv4ZGl-E`,
//   // );

//   // const token = request.cookies.get('accessToken')?.value;

//   // if (!token) {
//   //   return NextResponse.redirect(new URL('/?showLoginModal=true', request.url));
//   // }

//   // const decodedData = decodedToken(token);

//   // if (decodedData) {
//   //   const exp = (decodedData as { exp: number })?.exp * 1000;
//   //   const currentTime = new Date().getTime();
//   //   if (currentTime > exp) {
//   //     return NextResponse.redirect(
//   //       new URL('/?showLoginModal=true', request.url),
//   //     );
//   //   }
//   // }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ['/:path*'],
// };

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtDecode } from 'jwt-decode';

// Helper function to decode the JWT token
const decodeToken = (token: string) => {
  try {
    return jwtDecode<{ exp: number }>(token);
  } catch (error) {
    console.error('Failed to decode token:', error);
    return null;
  }
};

export function middleware(request: NextRequest) {
  // Retrieve the token from cookies
  const token = request.cookies.get('accessToken')?.value;

  // Redirect to login if token is missing
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Decode the token
  const decodedData = decodeToken(token);

  // Check if token is valid and not expired
  if (decodedData) {
    const exp = decodedData.exp * 1000; // Convert to milliseconds
    const currentTime = Date.now();

    // Redirect to login if the token is expired
    if (currentTime > exp) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  } else {
    // Redirect to login if decoding failed
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Allow request to proceed if the token is valid
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!login|signup|public).*)', // Exclude /login, /signup, and other public pages
  ],
};
