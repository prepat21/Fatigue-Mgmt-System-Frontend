export default function TrainerCard({ trainer }) {
  return (
    <div className="col-md-3">
      <div className="card mb-3">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="card-title">{trainer.name}</h5>
            <a className="btn btn-light" href={`/trainers/${trainer.id}`}>
              View
            </a>
          </div>
          <p className="medium mt-2">
            Training: <strong>{trainer.training}</strong>{" "}
          </p>
        </div>
      </div>
    </div>
  );
}
