import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

type AppRole = "admin" | "secretary" | "user";

interface AdminAuth {
  loading: boolean;
  role: AppRole | null;
  userEmail: string | null;
  logout: () => Promise<void>;
}

export function useAdminAuth(requiredRoles?: AppRole[]): AdminAuth {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<AppRole | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/admins/login");
        return;
      }

      // Fetch user role from user_roles table
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id);

      if (cancelled) return;

      const userRole = roles?.[0]?.role as AppRole | undefined;
      if (!userRole) {
        // User exists but has no admin role
        navigate("/admins/login");
        return;
      }

      if (requiredRoles && !requiredRoles.includes(userRole)) {
        navigate("/admins/dashboard");
        return;
      }

      setRole(userRole);
      setUserEmail(user.email || null);
      setLoading(false);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate("/admins/login");
      }
    });

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, [navigate, requiredRoles]);

  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/admins/login");
  };

  return { loading, role, userEmail, logout };
}
