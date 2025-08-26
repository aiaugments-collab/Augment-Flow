'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '../../../../lib/auth-context';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { signIn, signInWithGoogle } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      await signIn(email, password);
      router.push('/'); // Redirect to home page after successful login
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'Failed to sign in');
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    try {
      await signInWithGoogle();
      router.push('/'); // Redirect to home page after successful login
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'Failed to sign in with Google');
    }
  };

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background w-full">
      <p className="hidden relative">Awin</p>
      <main className="flex-1">
        <div className="h-[100dvh] bg-background flex items-stretch">
          
          {/* Left Side - Form */}
          <div className="w-full xs:px-4 sm:px-6 md:w-[40%] flex items-center justify-center px-3 py-6 sm:py-8">
            <div className="w-full max-w-md mx-auto h-full flex flex-col bg-background">
              
              {/* Logo */}
              <Link className="flex items-center justify-center" href="/">
                <Image
                  alt="Augment Flow logo"
                  width={138}
                  height={38}
                  className="w-[90px] h-[24px] sm:w-[138px] sm:h-[38px]"
                  src="/augment-flow-logo.svg"
                  priority
                />
              </Link>

              {/* Form Container */}
              <div className="flex-grow w-full h-full flex flex-col items-center justify-center gap-6">
                <h2 className="text-xl font-medium text-foreground">Sign In to Augment Flow</h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
                  {error && (
                    <div className="p-3 text-sm text-red-500 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg">
                      {error}
                    </div>
                  )}
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-6">
                      
                      {/* Email Input */}
                      <input
                        data-slot="input"
                        className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground bg-input border-input flex h-10 w-full min-w-0 rounded-lg border px-3 py-1 text-base text-foreground shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
                        placeholder="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />

                      {/* Password Input */}
                      <div className="relative">
                        <input
                          data-slot="input"
                          className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground bg-input border-input flex h-10 w-full min-w-0 rounded-lg border px-3 py-1 text-base text-foreground shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
                          placeholder="Password"
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-200"
                          tabIndex={-1}
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye-off h-4 w-4">
                              <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                              <path d="m10.73 5.08 1.27.27 1.49.27c3.18.57 5.87 2.69 7.51 5.38a1 1 0 0 1 0 .96c-.64 1.11-1.47 2.08-2.46 2.85" />
                              <path d="M3 3l18 18" />
                              <path d="M6.54 6.54C4.62 8.23 3.2 10.5 2.1 12.88a1 1 0 0 0 0 .24c1.1 2.38 2.52 4.65 4.44 6.34" />
                            </svg>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye h-4 w-4">
                              <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"></path>
                              <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Sign In Button */}
                  <button
                    data-slot="button"
                    className="cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive disabled:cursor-not-allowed bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 h-10 px-6 has-[>svg]:px-4 w-full rounded-xl"
                    type="submit"
                    disabled={isLoading}
                  >
                    <span className="flex items-center">
                      {isLoading ? 'Signing in...' : 'Sign In'}
                      {!isLoading && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right ml-2 h-4 w-4">
                          <path d="M5 12h14"></path>
                          <path d="m12 5 7 7-7 7"></path>
                        </svg>
                      )}
                    </span>
                  </button>
                </form>

                {/* Sign Up Link */}
                <p className="text-sm text-muted-foreground">
                  Don&apos;t have an account?{' '}
                  <Link href="/auth/signup" className="text-primary hover:underline hover:text-primary/80 transition-colors duration-200">
                    Sign up
                  </Link>{' '}
                  or
                </p>

                {/* Google Sign In Button */}
                <button
                  data-slot="button"
                  className="cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive disabled:cursor-not-allowed bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80 h-10 px-6 has-[>svg]:px-4 w-full rounded-xl"
                  type="button"
                  onClick={handleGoogleLogin}
                >
                  <div className="flex items-center justify-center w-full">
                    <svg className="w-5 h-5 mr-2" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                    </svg>
                    <span className="truncate">Continue with Google</span>
                  </div>
                </button>
              </div>

              {/* Terms and Privacy */}
              <div className="flex flex-col w-full items-center justify-center">
                <p className="text-xs text-muted-foreground text-center">
                  By continuing, you agree to our<br />
                  <Link href="/terms" className="text-primary hover:underline hover:text-primary/80 cursor-pointer transition-colors duration-200">
                    Terms
                  </Link>
                  {' & '}
                  <Link href="/privacy-policy" className="text-primary hover:underline hover:text-primary/80 cursor-pointer transition-colors duration-200">
                    Privacy Policy
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Hero Section */}
          <div className="hidden md:flex md:w-[60%]">
            <div className="relative flex flex-col items-center justify-center w-full h-full">
              
              {/* Background Image */}
              <div className="absolute w-full h-full bottom-0 left-0">
                <Image
                  alt="Auth Carousel"
                  fill
                  className="object-cover"
                  src="https://bhindi.io/_next/static/media/auth-carousel-1.38119907.svg"
                  style={{ color: 'transparent' }}
                />
              </div>

              {/* Content Overlay */}
              <div className="w-full h-full relative">
                <div className="h-[100dvh] z-50">
                  <div className="flex z-10 w-full h-full flex-col items-center justify-center px-12 py-16 lg:px-32 lg:py-24 gap-6">
                    <p className="text-3xl md:text-4xl lg:text-5xl font-heading font-medium text-white text-center leading-tight">
                      Welcome Back to{' '}
                      <span className="text-primary">Augment Flow</span>
                    </p>
                    <p className="text-lg text-white text-center leading-normal">
                      Continue commanding your apps with natural language
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
