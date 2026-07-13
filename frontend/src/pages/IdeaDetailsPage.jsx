import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Badge, Loader, Button } from "../components/ui";
import {
  getProductIdea,
  deleteProductIdea,
  analyzeProductIdea,
} from "../services/ideasApi";
import { useNavigate } from "react-router-dom";
import IdeaForm from "../components/ideas/IdeaForm";

function IdeaDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [idea, setIdea] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [analysis, setAnalysis] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisError, setAnalysisError] = useState("");

  useEffect(() => {
    async function fetchIdea() {
      try {
        const data = await getProductIdea(id);
        setIdea(data);
      } catch (err) {
        setError("Could not load this idea.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchIdea();
  }, [id]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <p>{error}</p>;
  }
  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this idea?",
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteProductIdea(id);

      navigate("/");
    } catch (error) {
      console.error("Failed to delete idea:", error);

      alert("Could not delete the idea.");
    }
  }
  const handleAnalyze = async () => {
    try {
      setAnalysis("");
      setAnalysisError("");
      setIsAnalyzing(true);

      const result = await analyzeProductIdea(id);

      setAnalysis(result.analysis);
    } catch (error) {
      setAnalysisError(error.message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="page">
      <Card>
        {isEditing ? (
          <IdeaForm
            initialData={idea}
            onIdeaUpdated={async () => {
              const updatedIdea = await getProductIdea(id);
              setIdea(updatedIdea);
              setIsEditing(false);
            }}
          />
        ) : (
          <>
            <h1>{idea.title}</h1>

            <p>
              <strong>Status:</strong>{" "}
              <Badge variant={idea.status === "draft" ? "default" : "info"}>
                {idea.status}
              </Badge>
            </p>

            <p>
              <strong>Problem</strong>
            </p>

            <p>{idea.problem}</p>

            <p>
              <strong>Target User</strong>
            </p>

            <p>{idea.target_user}</p>

            <p>
              <strong>Created</strong>
            </p>

            <p>
              {new Date(idea.created_at).toLocaleString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              })}
            </p>

            <Button onClick={() => setIsEditing(true)}>Edit Idea</Button>

            <Button variant="destructive" onClick={handleDelete}>
              Delete Idea
            </Button>

            <Button onClick={handleAnalyze} disabled={isAnalyzing}>
              {isAnalyzing ? "Analyzing..." : "🤖 Analyze with AI"}
            </Button>

            {analysisError && <p className="error-message">{analysisError}</p>}
          </>
        )}
      </Card>

      {analysis && (
        <Card>
          <h2>🤖 AI Product Analysis</h2>

          <pre
            style={{
              whiteSpace: "pre-wrap",
              lineHeight: "1.7",
            }}
          >
            {analysis}
          </pre>
        </Card>
      )}
    </div>
  );
}

export default IdeaDetailsPage;
