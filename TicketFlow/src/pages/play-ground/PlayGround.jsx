import { useRef, useState } from "react";
import { ExampleModal } from "./ExampleModal";
import { Header } from "../../components/Header";

export function PlayGround() {
    const [data] = useState({
        name: 'new test',
        surname: 'new test 2',
    });

    const modalRef = useRef(null);
    return (
        <>
            <Header />
            <div className="container">
                <div className="text-center mt-5">
                    <h1>A Bootstrap 5 Starter Template</h1>
                    <p className="lead">A complete project boilerplate built with Bootstrap</p>
                    <p>Bootstrap v5.2.3</p>
                    <div className="row my-5">
                        <button
                            className="btn btn-primary"
                            onClick={() => modalRef.current.openModal(data)}
                        >
                            Open Modal
                        </button>
                    </div>
                </div>
            </div>
            <ExampleModal ref={modalRef} />
        </>
    );
}