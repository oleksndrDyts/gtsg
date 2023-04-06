import useSound from 'use-sound';

export const useSsound = url => {
  const [play, { stop }] = useSound(url.url);

  return { play, stop };
};
