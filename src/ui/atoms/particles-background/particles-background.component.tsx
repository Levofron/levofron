import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

export const ParticlesBackground = () => (
  <Particles
    id="tsparticles"
    init={loadFull}
    options={{
      fullScreen: false,
      background: {
        color: {
          value: 'transparent',
        },
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onhover: {
            enable: true,
            mode: 'bubble',
          },
          onclick: {
            enable: true,
            mode: 'push',
          },
        },
        modes: {
          bubble: {
            distance: 250,
            duration: 2,
            size: 6,
            opacity: 0.4,
          },
          push: {
            particles_nb: 5,
          },
        },
        retina_detect: true,
      },
      particles: {
        color: {
          value: '#000',
        },
        links: {
          color: '#000',
          distance: 150,
          enable: true,
          opacity: 0.5,
          width: 1,
        },
        collisions: {
          enable: true,
        },
        move: {
          enable: true,
          outModes: {
            default: 'bounce',
          },
          random: false,
          speed: 0.7,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            area: 800,
          },
          value: 80,
        },
        opacity: {
          value: 0.5,
        },
        shape: {
          type: 'circle',
        },
        size: {
          value: { min: 1, max: 5 },
        },
      },
      detectRetina: true,
    }}
    style={{
      position: 'absolute',
    }}
  />
);
