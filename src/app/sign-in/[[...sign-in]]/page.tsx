import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="glass-modal-backdrop">
      <div className="glass-modal p-8">
        <SignIn 
          appearance={{
            elements: {
              formButtonPrimary: 'va-btn va-btn-primary w-full',
              formButtonReset: 'va-btn va-btn-outline w-full',
              formFieldInput: 'va-input',
              card: 'shadow-none border-0 bg-transparent',
              headerTitle: 'va-h2 mb-4',
              headerSubtitle: 'text-gray-600 mb-6',
              socialButtonsBlockButton: 'w-full flex items-center justify-center gap-2 text-base mb-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700',
              socialButtonsBlockButton__google: 'bg-white',
              socialButtonsBlockButton__apple: 'bg-white',
              socialButtonsBlockButton__facebook: 'bg-white',
            }
          }} 
        />
      </div>
    </div>
  );
}