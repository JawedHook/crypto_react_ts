import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import { firestore } from '../services/firebase.service';
import { User } from '../models/user.model';
import { setStoragePhoneToken, removeStoragePhoneToken } from './storage.service';
import axios from 'axios';

const NOTIFICATION_URL = 'https://exp.host/--/api/v2/push/send';

const notificationsService = {
  checkNotificationsPerm: async (currentUser: User) => {
    try {
      // Check notification permission
      const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      let final = status;

      // If not allowed, ask for permission
      if (status !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        final = status;
      }

      // If not granted, exit function
      if (final !== 'granted') {
        await this.removePhoneToken(currentUser.id);
        return;
      }
      await this.setPhoneToken(currentUser.id);
    } catch (err) {
      console.log('checkNotificationsPerm: ', err.message || err.toString());
    }
  },
  setPhoneToken: async (currentUserId: string) => {
    try {
      let phoneToken = await Notifications.getExpoPushTokenAsync();
      await firestore.doc(`users/${currentUserId}`).update({ phoneToken });
      await setStoragePhoneToken(phoneToken);
    } catch (err) {
      console.log('setPhoneToken: ', err.message || err.toString());
    }
  },
  removePhoneToken: async (currentUserId: string) => {
    try {
      await firestore.doc(`users/${currentUserId}`).update({ phoneToken: null });
      await removeStoragePhoneToken();
    } catch (err) {
      console.log('removePhoneToken: ', err.message || err.toString());
    }
  },
  sendNotification: async (currentUser: User, { title, body }) => {
    try {
      axios.post(NOTIFICATION_URL, {
        to: currentUser.phoneToken,
        title,
        body,
      });
    } catch (err) {
      console.log('sendNotification: ', err);
    }
  },
};

export default notificationsService;
