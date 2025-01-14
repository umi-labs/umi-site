import { useEffect } from 'react';

export default function Loader() {
  useEffect(() => {
    async function getLoader() {
      const { jelly } = await import('ldrs');
      jelly.register();
    }

    getLoader();
  }, []);
  return <l-jelly color="black" size="100"></l-jelly>;
}
