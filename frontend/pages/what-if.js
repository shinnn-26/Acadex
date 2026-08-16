import { useState } from "react";
import { useRouter } from "next/router";
import { api } from "../lib/api";

export default function WhatIf() {
  const router = useRouter();

  const [attendance, setAttendance] = useState(82);
  const [assignment, setAssignment] = useState(78);
  const [score, setScore] = useState(76);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function calculate() {
    try {
      setLoading(true);

      const data = await api("/what-if", {
        method: "POST",
        body: JSON.stringify({
          attendance: Number(attendance),
          assignment: Number(assignment),
          score: Number(score),
        }),
      });

      setResult(data);
    } catch (error) {
      console.error(error);
      alert(error.message || "Unable to calculate prediction");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page">
      <aside className="sidebar">
        <div className="logo" onClick={() => router.push("/dashboard")}>
          ◆ ACADEX
        </div>

        <div className="menu">
          <button onClick={() => router.push("/dashboard")}>
            Overview
          </button>

          <button onClick={() => router.push("/subjects")}>
            My Subjects
          </button>

          <button onClick={() => router.push("/analytics")}>
            Analytics
          </button>

          <button className="active">
            What-If
          </button>

          <button onClick={() => router.push("/courses")}>
            Courses
          </button>

          <button onClick={() => router.push("/speakit")}>
            Speakit
          </button>
        </div>
      </aside>

      <main className="content">
        <div className="section-label">
          ACADEMIC PREDICTION
        </div>

        <h1>
          What if you improve your <span>performance?</span>
        </h1>

        <p className="subtitle">
          Change your academic values and see your predicted result.
        </p>

        <div className="whatif-grid">
          <div className="card prediction-form">
            <h2>Adjust your performance</h2>

            <div className="input-group">
              <label>Overall Score: {score}%</label>

              <input
                type="range"
                min="0"
                max="100"
                value={score}
                onChange={(e) => setScore(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>Attendance: {attendance}%</label>

              <input
                type="range"
                min="0"
                max="100"
                value={attendance}
                onChange={(e) => setAttendance(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>Assignment Average: {assignment}%</label>

              <input
                type="range"
                min="0"
                max="100"
                value={assignment}
                onChange={(e) => setAssignment(e.target.value)}
              />
            </div>

            <button
              className="primary-btn"
              onClick={calculate}
              disabled={loading}
            >
              {loading ? "Calculating..." : "Calculate Prediction"}
            </button>
          </div>

          <div className="card prediction-result">
            <div className="section-label">
              PREDICTED RESULT
            </div>

            {!result ? (
              <>
                <h2>Try different scenarios</h2>

                <p>
                  Adjust your score, attendance and assignment performance to
                  see how your academic status could change.
                </p>
              </>
            ) : (
              <>
                <h2>{result.status || "Prediction Complete"}</h2>

                <div className="big-score">
                  {result.predictedScore ?? result.score ?? "--"}%
                </div>

                <p>
                  {result.message ||
                    "This is your estimated academic performance based on the selected values."}
                </p>

                <div className="prediction-stats">
                  <div>
                    <span>Score</span>
                    <strong>{score}%</strong>
                  </div>

                  <div>
                    <span>Attendance</span>
                    <strong>{attendance}%</strong>
                  </div>

                  <div>
                    <span>Assignments</span>
                    <strong>{assignment}%</strong>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}