import { useCallback, useEffect, useState } from "react";

import NavBar from "./components/NavBar";
import CompetitionForm from "./components/CompetitionForm";
import CompetitionList from "./components/CompetitionList";

import "./App.css";

const API_URL = "http://localhost:8081/competitions";

function App() {
    const [competitions, setCompetitions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("success");

    const showMessage = (text, type = "success") => {
        setMessage(text);
        setMessageType(type);
    };

    const loadCompetitions = useCallback(async () => {
        setLoading(true);

        try {
            const response = await fetch(`${API_URL}/displayall`);

            if (!response.ok) {
                throw new Error("Unable to fetch competitions.");
            }

            const data = await response.json();

            if (!Array.isArray(data)) {
                throw new Error("Unexpected response from backend.");
            }

            setCompetitions(data);
        } catch (error) {
            console.error(error);
            showMessage(
                "Unable to load competitions. Check whether your backend is running on port 8081.",
                "danger"
            );
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadCompetitions();
    }, [loadCompetitions]);

    async function addCompetition(competition) {
        setSubmitting(true);
        setMessage("");

        try {
            const response = await fetch(`${API_URL}/add`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(competition)
            });

            if (!response.ok) {
                throw new Error("Failed to add competition.");
            }

            showMessage("Competition added successfully!", "success");

            await loadCompetitions();

            return true;
        } catch (error) {
            console.error(error);

            showMessage(
                "Failed to add competition. Check your backend and database.",
                "danger"
            );

            return false;
        } finally {
            setSubmitting(false);
        }
    }

    async function deleteCompetition(id) {
        const confirmed = window.confirm(
            `Are you sure you want to delete competition ID ${id}?`
        );

        if (!confirmed) {
            return;
        }

        setMessage("");

        try {
            const response = await fetch(
                `${API_URL}/delete/${id}`,
                {
                    method: "DELETE"
                }
            );

            if (!response.ok) {
                throw new Error("Delete operation failed.");
            }

            const result = await response.text();

            if (result.trim() === "Competition not found") {
                showMessage(result, "warning");
                return;
            }

            showMessage(
                result || "Competition deleted successfully!",
                "success"
            );

            await loadCompetitions();
        } catch (error) {
            console.error(error);

            showMessage(
                "Failed to delete competition. Please try again.",
                "danger"
            );
        }
    }

    return (
        <>
            <NavBar />

            <main className="container py-4" id="home">
                <section className="hero-section p-4 p-md-5 rounded-4 mb-4">
                    <h1 className="display-5 fw-bold">
                        Coding Competition Management
                    </h1>

                    <p className="lead">
                        Create coding events, manage participants, and track
                        competition status in one place.
                    </p>

                    <a
                        href="#addCompetition"
                        className="btn btn-primary btn-lg"
                    >
                        Add Competition
                    </a>
                </section>

                {message && (
                    <div
                        className={`alert alert-${messageType} alert-dismissible`}
                        role="alert"
                    >
                        {message}

                        <button
                            type="button"
                            className="btn-close"
                            aria-label="Close"
                            onClick={() => setMessage("")}
                        ></button>
                    </div>
                )}

                <div className="row g-4">
                    <div className="col-12">
                        <div className="card summary-card shadow-sm">
                            <div className="card-body">
                                <h6 className="text-muted">
                                    Total Competitions
                                </h6>

                                <h2 className="fw-bold">
                                    {competitions.length}
                                </h2>
                            </div>
                        </div>
                    </div>

                    <div className="col-12" id="addCompetition">
                        <CompetitionForm
                            onAdd={addCompetition}
                            submitting={submitting}
                        />
                    </div>

                    <div className="col-12" id="competitionList">
                        <div className="d-flex justify-content-end">
                            <button
                                className="btn btn-outline-primary"
                                onClick={loadCompetitions}
                                disabled={loading}
                            >
                                {loading ? "Loading..." : "Refresh Records"}
                            </button>
                        </div>

                        <CompetitionList
                            competitions={competitions}
                            onDelete={deleteCompetition}
                            loading={loading}
                        />
                    </div>
                </div>
            </main>

            <footer className="text-center py-4 mt-4">
                <p className="mb-0">
                    Coding Competition Management System
                </p>
            </footer>
        </>
    );
}

export default App;