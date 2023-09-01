import { useNavigate } from "react-router-dom";
function App() {

  const navigate = useNavigate();

  
  return (
    <>
      <div className="max-w-screen-md m-auto font-primary p-4 ">
        <div className="flex gap-12 items-center justify-center h-screen">
          <h1 className="text-3xl font-semibold">Post it</h1>
          <button onClick={()=> navigate("create")} className="my-6 ml-[3px] py-2 px-4 bg-amber-500 text-white uppercase tracking-widest text-xs font-extrabold outline-none border-none hover:scale-110 transition-all duration-300">
            Click Me
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
