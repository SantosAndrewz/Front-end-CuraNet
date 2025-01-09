import { Navbar, Button } from "../utils/index"

const HeroSection = () => {
  return (
    <section id="home" className="relative h-screen">
      <Navbar />
      <div className="absolute inset-0 overflow-hidden">
          <video
          className="w-full h-full absolute inset-0 object-cover"
          src="https://raw.githubusercontent.com/Lawrenceku/assets/main/videos/InShot_20241222_183055695.mp4"
          autoPlay
          loop
          muted
          playsInline
        ></video>
      </div>

      {/* Blur Overlay */}
      <div className="absolute inset-0 bg-green-950 bg-opacity-50 backdrop-blur-sm"></div>

      {/* Content */}
      <div className="relative text-3xl container mx-auto h-full flex flex-col justify-center items-center text-center text-white px-4">
        <p className="text-5xl md:text-6xl font-bold text-white">
          Welcome to Curanet
        </p>
        <p className="text-base md:text-md my-6">
        Simplifying pharmacy workflows and provide healthcare professionals with tools to enhance patient safety and optimize daily operations.</p>
        <Button variant="outlined" color="primary" size="lg">
          Get Started
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
