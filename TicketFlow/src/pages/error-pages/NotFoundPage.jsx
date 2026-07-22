import { Header } from "../../components/Header";

export function NotFoundPage() {
    return (
        <>
            <Header />
            <div className="container">
                <div className="text-center mt-5">
                    <h1>Page Not Found | 404</h1>
                    <p className="lead">A complete project boilerplate built with Bootstrap</p>
                    <p>Bootstrap v5.2.3</p>
                </div>
            </div>
        </>
    );
}