import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100">
        <div className="text-center space-y-8 p-8">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900">
            Task Manager Pro
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto">
            Manage your tasks efficiently with AI-powered suggestions and intuitive organization
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="text-lg px-8">
                Get Started
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="text-lg px-8">
                Sign In
              </Button>
            </Link>
          </div>
          <div className="pt-8">
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto text-left">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-bold text-lg mb-2">🚀 Fast & Efficient</h3>
                <p className="text-gray-600">Built with Next.js 16 for lightning-fast performance</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-bold text-lg mb-2">🤖 AI-Powered</h3>
                <p className="text-gray-600">Get intelligent suggestions for your tasks</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-bold text-lg mb-2">🔒 Secure</h3>
                <p className="text-gray-600">Your data is protected with modern authentication</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
