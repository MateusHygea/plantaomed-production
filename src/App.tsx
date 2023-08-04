import { Routes, Route } from "react-router-dom";

import { Dashboard } from "./screens/Dashboard";
import { SignIn } from "./screens/SignIn";
import { Doctors } from "./screens/Doctors";
import { NewDoctors } from "./screens/Doctors/NewDoctors";
import { Local } from "./screens/Local";
import { NewLocal } from "./screens/Local/NewLocal";
import { Profile } from "./screens/Profile";
import { NewProfile } from "./screens/Profile/NewProfile";
import { Ponto } from "./screens/Ponto";
import { Scales } from "./screens/Scales";
import { NewScales } from "./screens/Scales/NewScales";
import { Especialidades } from "./screens/Specialties";
import { NewSpecialties } from "./screens/Specialties/NewSpecialties";
import { Performance } from "./screens/Performance";
import { NewPerformance } from "./screens/Performance/NewPerformance";
import { NewPlantao } from "./screens/NewPlantao";
import { Justification } from "./screens/Justification";
import { NewJustification } from "./screens/Justification/NewJustification";
import { Honda } from "./screens/Honda";
import { NewHonda } from "./screens/Honda/NewHonda";
import { ResponsibleScale } from "./screens/ResponsibleScale";
import { ResponsibleScaleList } from "./screens/ResponsibleScale/ResponsibleScaleList";

function App() {

  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/doctors" element={<Doctors />} />
      <Route path="/newdoctors" element={<NewDoctors />} />
      <Route path="/local" element={<Local />} />
      <Route path="/newlocal" element={<NewLocal />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/newprofile" element={<NewProfile />} />
      <Route path="/ponto" element={<Ponto />} />
      <Route path="/scales" element={<Scales />} />
      <Route path="/newscales" element={<NewScales />} /> 
      <Route path="/newplantao" element={<NewPlantao />} /> 
      <Route path="/especialidades" element={<Especialidades />} /> 
      <Route path="/newspecialties" element={<NewSpecialties />} /> 
      <Route path="/performance" element={<Performance />} /> 
      <Route path="/newperformance" element={<NewPerformance />} /> 
      <Route path="/justification" element={<Justification />} />
      <Route path="/newjustification" element={<NewJustification />} />
      <Route path="/honda" element={<Honda />} />
      <Route path="/newhonda" element={<NewHonda />} />
      <Route path="/responsiblescalelist" element={<ResponsibleScaleList />} />
      <Route path="/responsiblescale" element={<ResponsibleScale />} />
    </Routes>
  );
}

export default App;
