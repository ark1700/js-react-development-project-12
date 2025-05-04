import { SignupForm } from '@/features/auth/SignupForm';
import { MessageSquare } from 'lucide-react';
import React from 'react';
const SignupPage = () => {

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-block p-4 rounded-full bg-purple-100 dark:bg-purple-900/20 mb-4">
              <MessageSquare className="h-10 w-10 text-purple-600" />
            </div>
            <h1 className="text-3xl font-bold">Создать аккаунт</h1>
            <p className="text-muted-foreground mt-2">Зарегистрируйтесь, чтобы начать общение в ChatApp</p>
          </div>

          <SignupForm />
        </div>
      </main>

      <footer className="py-6 text-center text-sm text-muted-foreground">
        <p>© 2025 ChatApp. Все права защищены.</p>
      </footer>
    </div>
  );
};
export default SignupPage;
