
export const generateToken = () => 'token-' + Date.now() + '-' + Math.random() + '-test-' + Math.random();




const UNIX = {
  '1_HOUR': 60 * 60 * 1000,
  '8_HOUR': 60 * 60 * 1000 * 8,
}


export const getLiveToken = () => Date.now() + UNIX["8_HOUR"];
