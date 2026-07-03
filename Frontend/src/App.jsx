import MainSection from "../pages/mainPage";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <>
      <Toaster position="top-right" />
      <MainSection />
    </>
  );
}
