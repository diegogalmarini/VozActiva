import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="glass-modal-backdrop">
      <div className="glass-modal p-8">
        <SignIn appearance={{
          elements: {
            formButtonPrimary: 'va-btn va-btn-primary w-full',
            formButtonReset: 'va-btn va-btn-outline w-full',
            formFieldInput: 'va-input',
            card: 'shadow-none border-0 bg-transparent',
            headerTitle: 'va-h2 mb-4',
            headerSubtitle: 'text-gray-600 mb-6',
            socialButtonsBlockButton: 'va-btn va-btn-primary w-full flex items-center justify-center gap-2 text-base mb-3',
            socialButtonsBlockButton__google: 'va-btn va-btn-primary w-full flex items-center justify-center gap-2 text-base mb-3',
            socialButtonsBlockButton__apple: 'va-btn va-btn-outline w-full flex items-center justify-center gap-2 text-base mb-3',
            socialButtonsBlockButton__facebook: 'va-btn va-btn-outline w-full flex items-center justify-center gap-2 text-base mb-3',
          }
        }} />
      </div>
    </div>
  );
}