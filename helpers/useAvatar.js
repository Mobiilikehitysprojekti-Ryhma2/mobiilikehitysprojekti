import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useAvatar = () => {
  const [avatarUri, setAvatarUri] = useState(null);

  useEffect(() => {
    const loadAvatar = async () => {
      try {
        const uri = await AsyncStorage.getItem('selectedAvatar');
        if (uri) {
          setAvatarUri(uri);
        }
      } catch (err) {
        console.error('Failed to load avatar:', err);
      }
    };

    loadAvatar();
  }, []);

  return avatarUri;
};