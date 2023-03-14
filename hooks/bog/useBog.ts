import { checkBog } from 'helpers/urlUtils';
import { useEffect, useState } from 'react';

const useBog = () => {
  const [isBog, setIsBog] = useState(false);
  useEffect(() => {
    setIsBog(checkBog(window.location.host));
  }, []);

  return { isBog };
};

export default useBog;
