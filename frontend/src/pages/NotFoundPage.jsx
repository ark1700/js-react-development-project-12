import { Button } from '@/components/ui/button';
import { Home, MessageSquareOff } from 'lucide-react';
import React from 'react';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <div className="absolute top-4 right-4">
      </div>

      <div className="max-w-md w-full mx-auto text-center">
        <div className="mb-6 flex justify-center">
          <div className="relative">
            <MessageSquareOff className="h-24 w-24 text-muted-foreground" />
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-8">Страница не найдена</h1>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="gap-2" asChild>
            <a href="/">
              <Home className="h-4 w-4" />
              Вернуться на главную
            </a>
          </Button>
        </div>

        <div className="mt-8 border-t pt-6 dark:border-gray-700">
          <p className="text-sm text-muted-foreground">
            Страница, которую вы ищите, не найдена. Пожалуйста, проверьте URL и попробуйте еще раз.
          </p>
        </div>
      </div>
    </div>
  );
};
export default NotFoundPage;
