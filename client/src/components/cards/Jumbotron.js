import React from 'react';
import Typewriter from 'typewriter-effect';

export default function Jumbotron({ text }) {
  return (
    <div>
      <Typewriter options={ {
        strings: text,
        autoStart: true,
        loop: true,
      } } />
    </div>
  )
}
