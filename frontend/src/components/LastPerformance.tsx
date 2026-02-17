import { getUserById } from '../lib/db/users';
import { getAuthUser } from '../services/authService';
import { type User } from '../types/user';

import { QRCode } from './QRCode';
import { SetPanel } from './SetPanel';

export const LastPerformance = async () => {
  const auth = await getAuthUser();
  if (auth.status !== 'authenticated') return null;  // not authenticated. User should have been redirected by parent component
  const authUser = auth.user;

  // Fetch full user data including promoted_set and qr_code directly from DB
  const user = await getUserById(authUser.id) as User | null;

  return (
    <div className="p-20 bg-surface rounded-md">
      {user?.promoted_set ?
        <SetPanel
          actId={user.promoted_set.act_id}
          set={user.promoted_set}
        />
        :
        <p className="w-200">Select a set to display when people scan your QR code.</p>
      }

      {user?.qr_code && <QRCode uri={user.qr_code} className="bg-graygreen" />}
    </div>
  );
}


