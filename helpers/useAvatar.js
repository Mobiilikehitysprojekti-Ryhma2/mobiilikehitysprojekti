import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useAvatar = () => {
  const [avatarUri, setAvatarUri] = useState(null);

  useEffect(() => {
    const loadAvatar = async () => {
      const uri = await AsyncStorage.getItem('selectedAvatar');
      if (uri) {
        setAvatarUri(uri);
      }
    };

    loadAvatar();
  }, []);

  return avatarUri;
};