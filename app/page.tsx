import AppBar from "./AppBar";

export async function get() {
    const response = await fetch("http://localhost:3200/");
    const data = response.json();

    return data;
}

export default async function HelloWorld() {
    const data = await get();
    return (
        <div>
            <AppBar />
            <h1>{data.msg}</h1>
        </div>
    );
}
