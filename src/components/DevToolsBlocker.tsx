import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

const DEV_TOOLS_PASSWORD = 'Smmedy';
const AUTH_KEY = 'devtools_auth';

const DevToolsBlocker = () => {
  const [isBlocked, setIsBlocked] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if already authenticated in this session
    const isAuthenticated = sessionStorage.getItem(AUTH_KEY) === 'true';
    if (isAuthenticated) {
      return;
    }

    let devToolsOpen = false;

    // Method 1: Check console size
    const checkConsole = () => {
      const threshold = 160;
      if (
        window.outerHeight - window.innerHeight > threshold ||
        window.outerWidth - window.innerWidth > threshold
      ) {
        if (!devToolsOpen) {
          devToolsOpen = true;
          setIsBlocked(true);
        }
      } else {
        devToolsOpen = false;
      }
    };


    // Method 3: Check console methods
    const originalLog = console.log;
    const originalError = console.error;
    const originalWarn = console.warn;
    const originalInfo = console.info;

    const detectConsole = () => {
      if (!devToolsOpen) {
        devToolsOpen = true;
        setIsBlocked(true);
      }
    };

    // Override console methods
    console.log = (...args: any[]) => {
      detectConsole();
      originalLog.apply(console, args);
    };
    console.error = (...args: any[]) => {
      detectConsole();
      originalError.apply(console, args);
    };
    console.warn = (...args: any[]) => {
      detectConsole();
      originalWarn.apply(console, args);
    };
    console.info = (...args: any[]) => {
      detectConsole();
      originalInfo.apply(console, args);
    };

    // Method 4: Check for devtools keys
    const handleKeyDown = (e: KeyboardEvent) => {
      // F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U, Ctrl+Shift+C
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
        (e.ctrlKey && e.key === 'U')
      ) {
        e.preventDefault();
        if (!devToolsOpen) {
          devToolsOpen = true;
          setIsBlocked(true);
        }
      }
    };

    // Method 5: Check right-click context menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      if (!devToolsOpen) {
        devToolsOpen = true;
        setIsBlocked(true);
      }
    };


    // Set up interval checks
    const interval = setInterval(() => {
      checkConsole();
    }, 500);

    // Add event listeners
    window.addEventListener('resize', checkConsole);
    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('contextmenu', handleContextMenu);

    // Cleanup
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', checkConsole);
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('contextmenu', handleContextMenu);
      
      // Restore console methods
      console.log = originalLog;
      console.error = originalError;
      console.warn = originalWarn;
      console.info = originalInfo;
    };
  }, []);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === DEV_TOOLS_PASSWORD) {
      sessionStorage.setItem(AUTH_KEY, 'true');
      setIsBlocked(false);
      setPassword('');
      setError('');
    } else {
      setError('Incorrect password. Access denied.');
      setPassword('');
    }
  };

  if (!isBlocked) {
    return null;
  }

  return (
    <Dialog open={isBlocked} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md" onPointerDownOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
              <AlertTriangle className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <DialogTitle>Developer Tools Detected</DialogTitle>
              <DialogDescription className="mt-1">
                Access to developer tools is restricted. Please enter the password to continue.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <form onSubmit={handlePasswordSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              className="rounded-xl"
              autoFocus
            />
            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}
          </div>
          <Button type="submit" className="w-full rounded-xl">
            Verify Access
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DevToolsBlocker;
