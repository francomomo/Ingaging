import axios from 'axios';

export default ({ req }) => {
  if (typeof window === 'undefined') {
    // On server
    return axios.create({
      baseURL:
        'http://ingress-nginx.ingress-nginx-controller.svc.cluster.local',
      headers: req.headers,
    });
  } else {
    // On browser
    return axios.create({
      baseURL: '/',
    });
  }
};
