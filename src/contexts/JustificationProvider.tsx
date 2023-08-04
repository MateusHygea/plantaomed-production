import React, { createContext, useContext, useState } from 'react';

type DoctorProps = {
  id: string;
};

type DoctorContextType = {
  doctor: DoctorProps | null;
  setDoctor: (doctor: DoctorProps | null) => void;
};

const DoctorContext = createContext<DoctorContextType>({
  doctor: null,
  setDoctor: () => {},
});

export function DoctorProvider({ children }: { children: React.ReactNode }) {
  const [doctor, setDoctor] = useState<DoctorProps | null>(null);

  return (
    <DoctorContext.Provider value={{ doctor, setDoctor }}>
      {children}
    </DoctorContext.Provider>
  );
}

export function useDoctor() {
  return useContext(DoctorContext);
}
