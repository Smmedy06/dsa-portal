import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { validateUserAccess } from '@/lib/auth';
import { extractRollNumber } from '@/lib/auth';

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Get the session from the URL hash
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error('Session error:', sessionError);
          navigate('/login?error=session_error');
          return;
        }

        if (!session?.user?.email) {
          navigate('/login?error=no_email');
          return;
        }

        const email = session.user.email;

        // Validate user access
        const validation = await validateUserAccess(email);
        
        if (!validation.valid) {
          // Sign out if not valid
          await supabase.auth.signOut();
          navigate(`/login?error=${encodeURIComponent(validation.error || 'access_denied')}`);
          return;
        }

        // Update user profile with roll number if not set
        const rollNumber = extractRollNumber(email);
        if (rollNumber) {
          const { error: updateError } = await supabase
            .from('users')
            .update({
              roll_number: rollNumber,
              email: email.toLowerCase(),
              last_login: new Date().toISOString(),
            })
            .eq('id', session.user.id);

          if (updateError) {
            console.error('Error updating user:', updateError);
          }
        }

        // Check if user is admin
        const { data: userData } = await supabase
          .from('users')
          .select('is_admin')
          .eq('id', session.user.id)
          .single();

        // Redirect based on role
        if (userData?.is_admin) {
          navigate('/admin');
        } else {
          navigate('/');
        }
      } catch (error) {
        console.error('Auth callback error:', error);
        navigate('/login?error=callback_error');
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-muted-foreground">Completing sign in...</p>
      </div>
    </div>
  );
};

export default AuthCallback;
