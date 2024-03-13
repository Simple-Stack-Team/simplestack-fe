const Header = () => {
  return (
    <div className="h-screen overflow-hidden relative">
      <div className="w-[1800px] aspect-square bg-black text-white rounded-[100vh] absolute blur-[100px] top-[-1500px] left-[50%] translate-x-[-50%] z-10"></div>
      <div className="absolute inset-0 z-0 css-gradient"></div>
    </div>
  );
};

export default Header;