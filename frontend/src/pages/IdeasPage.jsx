import { Button, Badge, Card, Loader } from "../components/ui";
import "./IdeasPage.css";
import { useEffect, useState } from "react";
import { getProductIdeas } from "../services/ideasApi";
import IdeaForm from "../components/ideas/IdeaForm";
import { Link } from "react-router-dom";

function IdeasPage() {
  const [apiIdeas, setApiIdeas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isIdeaFormOpen, setIsIdeaFormOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const totalIdeas = apiIdeas.length;

  const draftIdeas = apiIdeas.filter((idea) => idea.status === "draft").length;

  const analyzedIdeas = apiIdeas.filter(
    (idea) => idea.status === "analyzed",
  ).length;

  const ideaStats = [
    {
      label: "Total Ideas",
      value: isLoading ? "—" : totalIdeas,
    },
    {
      label: "Draft Ideas",
      value: isLoading ? "—" : draftIdeas,
    },
    {
      label: "AI Analyzed",
      value: isLoading ? "—" : analyzedIdeas,
    },
  ];
  useEffect(() => {
    async function loadIdeas() {
      try {
        setIsLoading(true);
        setError("");

        const data = await getProductIdeas();

        setApiIdeas(data);

        console.log("Real ideas from Django:", data);
      } catch (error) {
        setError("Could not load product ideas.");
        console.error("Could not load ideas:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadIdeas();
  }, []);

  function formatStatus(status) {
    if (!status) {
      return "Unknown";
    }

    return status.charAt(0).toUpperCase() + status.slice(1);
  }
  function getStatusVariant(status) {
    const statusVariants = {
      draft: "default",
      analyzed: "info",
      validated: "success",
    };

    return statusVariants[status] || "default";
  }
  async function refreshIdeas() {
    const updatedIdeas = await getProductIdeas();
    console.log("Updated Ideas:", updatedIdeas);
    setApiIdeas(updatedIdeas);
  }
  return (
    <div className="ideas-page">
      <div className="ideas-header">
        <div>
          <Badge variant="info">AI Product Workspace</Badge>

          <h1>Product Ideas</h1>

          <p>
            Capture, organize, and evaluate product ideas using AI-assisted
            product management workflows.
          </p>
        </div>

        <Button
          onClick={() => setIsIdeaFormOpen((currentValue) => !currentValue)}
        >
          {isIdeaFormOpen ? "Hide Form" : "Create New Idea"}
        </Button>
      </div>

      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}

      {isIdeaFormOpen && (
        <IdeaForm
          onIdeaCreated={async () => {
            await refreshIdeas();

            setSuccessMessage("✅ Idea created successfully!");

            setTimeout(() => {
              setSuccessMessage("");
            }, 3000);

            setIsIdeaFormOpen(false);
          }}
        />
      )}

      <div className="idea-stats-grid">
        {ideaStats.map((stat) => (
          <Card key={stat.label}>
            {" "}
            {/* This creates a card for each statistic in the ideaStats array. The key prop is used to help React identify which items have changed, are added, or are removed. */}
            <p className="stat-label">{stat.label}</p>
            <h2 className="stat-value">{stat.value}</h2>
          </Card>
        ))}
      </div>
      <section className="ideas-section">
        <div className="ideas-section-header">
          <div>
            <h2>Your Ideas</h2>
            <p>Review and manage all your product ideas.</p>
          </div>
        </div>

        <div className="ideas-list">
          {isLoading && <Loader text="Loading ideas..." />}

          {error && (
            <Card className="ideas-message-card">
              <p>{error}</p>
            </Card>
          )}

          {!isLoading && !error && apiIdeas.length === 0 && (
            <Card className="ideas-message-card">
              <h3>No product ideas yet</h3>
              <p>
                Create your first product idea to start using the workspace.
              </p>
            </Card>
          )}

          {!isLoading &&
            !error &&
            apiIdeas.map((idea) => (
              <Link
                to={`/ideas/${idea.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Card key={idea.id} className="idea-card">
                  <div className="idea-card-header">
                    <div>
                      <h3>{idea.title}</h3>
                      <p>{idea.problem}</p>
                    </div>

                    <Badge variant="info">{idea.target_user}</Badge>
                  </div>

                  <div className="idea-card-footer">
                    <Badge variant={getStatusVariant(idea.status)}>
                      {formatStatus(idea.status)}
                    </Badge>

                    <Button variant="secondary" size="small">
                      View Details
                    </Button>
                  </div>
                </Card>
              </Link>
            ))}
        </div>
      </section>
    </div>
  );
}

export default IdeasPage;
