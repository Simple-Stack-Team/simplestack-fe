import AppBar from "@/app/AppBar";

export async function get() {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL!);
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
