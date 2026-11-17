import { useState } from "react";

function CompetitionForm({ onAdd, submitting }) {
    const [competitionName, setCompetitionName] = useState("");
    const [eventDate, setEventDate] = useState("");
    const [participantCount, setParticipantCount] = useState("");
    const [completed, setCompleted] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();

        if (!competitionName.trim()) {
            alert("Please enter the competition name.");
            return;
        }

        if (!eventDate) {
            alert("Please select the event date.");
            return;
        }

        if (
            participantCount === "" ||
            !Number.isInteger(Number(participantCount)) ||
            Number(participantCount) < 1
        ) {
            alert("Participant count must be at least 1.");
            return;
        }

        const competition = {
            competitionName: competitionName.trim(),
            eventDate,
            participantCount: Number(participantCount),
            completed
        };

        const success = await onAdd(competition);

        if (success) {
            setCompetitionName("");
            setEventDate("");
            setParticipantCount("");
            setCompleted(false);
        }
    }

    return (
        <div className="card shadow-sm">
            <div className="card-header bg-success text-white">
                <h4 className="mb-0">Add New Competition</h4>
            </div>

            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label
                            htmlFor="competitionName"
                            className="form-label"
                        >
                            Competition Name
                        </label>

                        <input
                            type="text"
                            id="competitionName"
                            className="form-control"
                            placeholder="Enter competition name"
                            value={competitionName}
                            onChange={(event) =>
                                setCompetitionName(event.target.value)
                            }
                            maxLength={100}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="eventDate" className="form-label">
                            Event Date
                        </label>

                        <input
                            type="date"
                            id="eventDate"
                            className="form-control"
                            value={eventDate}
                            onChange={(event) =>
                                setEventDate(event.target.value)
                            }
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label
                            htmlFor="participantCount"
                            className="form-label"
                        >
                            Participant Count
                        </label>

                        <input
                            type="number"
                            id="participantCount"
                            className="form-control"
                            placeholder="Enter participant count"
                            min="1"
                            step="1"
                            value={participantCount}
                            onChange={(event) =>
                                setParticipantCount(event.target.value)
                            }
                            required
                        />
                    </div>

                    <div className="form-check mb-3">
                        <input
                            type="checkbox"
                            id="completed"
                            className="form-check-input"
                            checked={completed}
                            onChange={(event) =>
                                setCompleted(event.target.checked)
                            }
                        />

                        <label
                            htmlFor="completed"
                            className="form-check-label"
                        >
                            Competition Completed
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-success"
                        disabled={submitting}
                    >
                        {submitting ? "Adding..." : "Add Competition"}
                    </button>

                    <button
                        type="reset"
                        className="btn btn-secondary ms-2"
                        onClick={() => {
                            setCompetitionName("");
                            setEventDate("");
                            setParticipantCount("");
                            setCompleted(false);
                        }}
                    >
                        Clear
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CompetitionForm;