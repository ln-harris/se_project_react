import "./Profile.css";
import SideBar from "../SideBar/SideBar.jsx";
import ClothesSection from "../ClothesSection/ClothesSection.jsx";

export default function Profile() {
  return (
    <section className="profile">
      <SideBar />
      <ClothesSection />
    </section>
  );
}
