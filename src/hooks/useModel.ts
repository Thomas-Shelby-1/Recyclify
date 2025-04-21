import * as tmImage from '@teachablemachine/image';
import { useEffect, useState } from 'react';

export const useModel = (modelURL: string, metadataURL: string) => {
  const [model, setModel] = useState<any>(null); // <-- fix here

  useEffect(() => {
    const load = async () => {
      const loadedModel = await tmImage.load(modelURL, metadataURL);
      setModel(loadedModel);
    };
    load();
  }, [modelURL, metadataURL]);

  return model;
};
