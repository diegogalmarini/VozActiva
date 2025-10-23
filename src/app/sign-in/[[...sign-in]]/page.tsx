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
              headerTitle: 'va-h2 mb-4 text-white',
              headerSubtitle: 'text-white/70 mb-6',
              socialButtonsBlockButton: 'w-full flex items-center justify-center gap-2 text-base mb-3 bg-white/10 border border-white/30 hover:bg-white/20 text-white',
              socialButtonsBlockButton__google: 'bg-white/10',
              socialButtonsBlockButton__apple: 'bg-white/10',
              socialButtonsBlockButton__facebook: 'bg-white/10',
            }
          }} 
        />
      </div>
    </div>
  );
}