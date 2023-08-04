import React from 'react';
import { useDoctor } from './DoctorContext';

function SomeComponent() {
  const { doctor, setDoctor } = useDoctor();

  // Usar os dados do doctor aqui...
  // Exemplo: console.log(doctor);

  return (
    // JSX do componente SomeComponent...
  );
}