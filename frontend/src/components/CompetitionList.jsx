function CompetitionList({ competitions, onDelete, loading }) {
    return (
        <div className="card shadow-sm mt-4">
            <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                <h4 className="mb-0">All Competitions</h4>
                <span className="badge bg-light text-primary">
                    Total: {competitions.length}
                </span>
            </div>

            <div className="card-body">
                {loading ? (
                    <div className="text-center p-4">
                        <div className="spinner-border text-primary"></div>
                        <p className="mt-2">Loading competitions...</p>
                    </div>
                ) : competitions.length === 0 ? (
                    <p className="text-center text-muted p-3">
                        No competitions found. Add your first competition!
                    </p>
                ) : (
                    <div className="table-responsive">
                        <table className="table table-striped table-hover align-middle">
                            <thead className="table-dark">
                                <tr>
                                    <th>ID</th>
                                    <th>Competition Name</th>
                                    <th>Event Date</th>
                                    <th>Participants</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {competitions.map((competition) => (
                                    <tr key={competition.id}>
                                        <td>{competition.id}</td>
                                        <td>{competition.competitionName}</td>
                                        <td>{competition.eventDate}</td>
                                        <td>{competition.participantCount}</td>
                                        <td>
                                            <span
                                                className={`badge ${
                                                    competition.completed
                                                        ? "bg-success"
                                                        : "bg-warning text-dark"
                                                }`}
                                            >
                                                {competition.completed
                                                    ? "Completed"
                                                    : "Upcoming"}
                                            </span>
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() =>
                                                    onDelete(competition.id)
                                                }
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CompetitionList;