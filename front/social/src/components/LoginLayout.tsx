import React from 'react';

const LoginLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex justify-center items-center h-full bg-gradient-to-r from-purple-300 via-purple-400 to-purple-500">
      {children}
    </div>
  );
};

export default LoginLayout;
