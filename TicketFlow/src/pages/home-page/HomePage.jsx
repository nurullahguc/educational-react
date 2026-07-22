import { Header } from "../../components/Header";

export function HomePage() {
    return (
        <>
            <Header />
            <div className="container">
                <div className="text-center mt-5">
                    <h1>Home Page</h1>
                    <p className="lead">Welcome to the Home Page! We'll be listening your tickets soon!</p>
                    <p>Bootstrap v5.2.3</p>
                </div>
            </div>
        </>
    );
}