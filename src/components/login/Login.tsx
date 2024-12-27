"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import LoginForm from "@/components/login/ui/LoginForm";
import CreateAccountForm from "@/components/login/ui/CreateAccountForm";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-tl from-black-primary to-black">
      <div className="w-full max-w-md">
        <motion.div
          key={isLogin ? "login" : "create"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {isLogin ? (
            <LoginForm onSwitchToSignUp={() => setIsLogin(false)} />
          ) : (
            <CreateAccountForm onSwitchToLogin={() => setIsLogin(true)} />
          )}
        </motion.div>
      </div>
    </main>
  );
}
