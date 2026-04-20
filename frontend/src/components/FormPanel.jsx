import { useSelector } from "react-redux";

export default function FormPanel() {
  const data = useSelector((state) => state.interaction);

  return (
    <div className="form-container">
      <h2>Log HCP Interaction</h2>

      <div className="card">
        <h3>Interaction Details</h3>

        <div className="grid-2">
          <div>
            <label>HCP Name</label>
            <input value={data.hcp_name || ""} readOnly />
          </div>

          <div>
            <label>Interaction Type</label>
            <input value={data.interaction_type || ""} readOnly />
          </div>

          <div>
            <label>Date</label>
            <input type="date" value={data.date || ""} readOnly />
          </div>

          <div>
            <label>Time</label>
            <input type="time" value={data.time || ""} readOnly />
          </div>
        </div>

        <label>Attendees</label>
        <input value={data.attendees || ""} readOnly />

        <label>Topics Discussed</label>
        <textarea value={data.topics || ""} readOnly />
      </div>

      <div className="card">
        <h3>Materials Shared / Samples Distributed</h3>

        <div className="row">
          <div>
            <p>Materials Shared</p>
            <small>{data.materials || "No materials added"}</small>
          </div>
        </div>

        <div className="row">
          <div>
            <p>Samples Distributed</p>
            <small>{data.samples || "No samples added"}</small>
          </div>
        </div>
      </div>

      <div className="card">
  <h3>Observed/Inferred HCP Sentiment</h3>

  <div className="radio-group">
    <label>
      <input
        type="radio"
        checked={data.sentiment === "Positive"}
        readOnly
      />
      Positive
    </label>

    <label>
      <input
        type="radio"
        checked={data.sentiment === "Neutral"}
        readOnly
      />
      Neutral
    </label>

    <label>
      <input
        type="radio"
        checked={data.sentiment === "Negative"}
        readOnly
      />
      Negative
    </label>
  </div>
</div>

      <div className="card">
        <h3>Outcomes</h3>
        <textarea value={data.outcomes || ""} readOnly />
      </div>

      <div className="card">
        <h3>Follow-up Actions</h3>
        <textarea value={data.followups || ""} readOnly />

        <div className="suggestions">
          <p>AI Suggested Follow-ups:</p>
          <ul>
            {(data.suggestions || []).map((item, i) => (
              <li key={i}>+ {item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}