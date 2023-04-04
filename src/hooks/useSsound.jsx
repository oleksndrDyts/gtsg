import useSound from 'use-sound';

export const useSsound = url => {
  console.log(url);
  const [play, { stop }] = useSound(url);

  return { play, stop };
};
