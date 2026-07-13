import { useState } from "react";
import { Button } from "../ui";
import { createProductIdea, updateProductIdea } from "../../services/ideasApi";

function IdeaForm({ onIdeaCreated, initialData = null, onIdeaUpdated }) {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    problem: initialData?.problem || "",
    target_user: initialData?.target_user || "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");

  function validateForm() {
    const errors = {};

    if (!formData.title.trim()) {
      errors.title = "Idea title is required.";
    }

    if (!formData.problem.trim()) {
      errors.problem = "Problem is required.";
    }

    if (!formData.target_user.trim()) {
      errors.target_user = "Target user is required.";
    }

    return errors;
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));

    setFormErrors((currentErrors) => ({
      ...currentErrors,
      [name]: "",
    }));

    setApiError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      setIsSubmitting(true);
      setApiError("");

      if (initialData) {
        await updateProductIdea(initialData.id, formData);

        if (onIdeaUpdated) {
          await onIdeaUpdated();
        }
      } else {
        await createProductIdea(formData);

        if (onIdeaCreated) {
          await onIdeaCreated();
        }
      }
    } catch (error) {
      console.error("Failed to create idea:", error);
      setApiError("Could not save idea. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="idea-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Idea Title</label>
        <input
          id="title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter your product idea title"
        />
        {formErrors.title && <p className="form-error">{formErrors.title}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="problem">Problem</label>
        <textarea
          id="problem"
          name="problem"
          value={formData.problem}
          onChange={handleChange}
          placeholder="What problem does this idea solve?"
        />
        {formErrors.problem && (
          <p className="form-error">{formErrors.problem}</p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="target_user">Target User</label>
        <input
          id="target_user"
          name="target_user"
          type="text"
          value={formData.target_user}
          onChange={handleChange}
          placeholder="Who is this product for?"
        />
        {formErrors.target_user && (
          <p className="form-error">{formErrors.target_user}</p>
        )}
      </div>

      {apiError && <p className="form-error">{apiError}</p>}

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Save Idea"}
      </Button>
    </form>
  );
}

export default IdeaForm;
