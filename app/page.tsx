import axios from "axios";

export default function Home() {
  const onClick = async () => {
    const response = await axios.get("http://localhost:3000/hello");
    console.log(response.data);
  };

  return (
    <main>
      <div className="center">
        <button>Hello World</button>
      </div>
    </main>
  );
}
