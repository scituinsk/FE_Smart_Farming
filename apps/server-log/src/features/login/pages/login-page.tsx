import { FieldDescription } from "@/components/ui/field";
import { Link } from "react-router";
import { UserAuthForm } from "../components/user-auth-form";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export const LoginPage = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Login</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <UserAuthForm />
        </CardContent>
        <CardFooter>
          <FieldDescription className="px-6 text-center">
            By clicking continue, you agree to our <Link to="/terms">Terms of Service</Link> and <Link to="/privacy">Privacy Policy</Link>.
          </FieldDescription>
        </CardFooter>
      </Card>
    </div>
  );
};
