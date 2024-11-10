'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { instance } from '@/axios/axiosInstance';
import { useState } from 'react';

const LoginPage = () => {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const loginData = {
      query: `
        mutation Login($input: LoginInput!) {
          login(input: $input) {
            accessToken
            user {
              id
              email
              role
            }
          }
        }
      `,
      variables: {
        input: {
          loginIdentifier: formData.get('loginIdentifier'),
          password: formData.get('password'),
        },
      },
    };

    try {
      const response = await instance.post('', loginData);

      if (response.data.errors) {
        throw new Error(response.data.errors[0].message);
      }

      const { accessToken, user } = response.data.data.login;

      document.cookie = `accessToken=${accessToken}; path=/`;
      document.cookie = `user=${JSON.stringify(user)}; path=/`;
      instance.defaults.headers.Authorization = `Bearer ${accessToken}`;

      // Redirect based on role
      if (user.role === 'ADMIN') {
        router.push('/');
      }
      // Force a router refresh to update server components
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <div className="w-full max-w-2xl p-5">
        <form
          onSubmit={submitHandler}
          className="space-y-4 rounded-lg bg-white p-5 shadow-sm sm:p-10"
        >
          <h2 className="text-center text-2xl font-medium">Log in</h2>

          {/* Email */}
          <div>
            <label
              htmlFor="loginIdentifier"
              className="block text-sm font-medium"
            >
              Email/Mobile Number
            </label>
            <input
              id="loginIdentifier"
              name="loginIdentifier"
              type="text"
              placeholder="Enter your email or mobile number"
              required
              className="mt-1 w-full rounded-md border border-gray-400 p-2.5 transition-colors duration-300 focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              required
              className="mt-1 w-full rounded-md border border-gray-400 p-2.5 transition-colors duration-300 focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
            />
          </div>

          {/* Forgot Password Link */}
          <p className="text-right">
            <Link href="/" className="text-md">
              Forgot your password?
            </Link>
          </p>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full rounded-full bg-[#00359E] p-3 text-lg text-white transition-colors duration-300 focus:outline-none"
            >
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
