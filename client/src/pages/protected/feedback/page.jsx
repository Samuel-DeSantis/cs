import { useRef, useState } from "react"

import { createFeedback } from "../../../services/feedback"

import Card from "../../components/library/card/component"
import Button from "../../components/library/button/component"
import styles from './styles.module.css'
import Textarea from "../../components/library/textarea/component"

const Feedback = () => {
  const descriptionRef = useRef();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    const user = JSON.parse(localStorage.getItem("user"));
    const user_id = user?.id

    const feedback = {
      description: descriptionRef.current.value.trim(),
      user: user_id,
      date: new Date(),
    }

    console.log("Feedback submitted:", feedback);

    if (!feedback) setError("Please enter your feedback.")

    try {
      await createFeedback(feedback);
      setMessage("Thank you for your feedback!");
      descriptionRef.current.value = "";
    } catch (err) {
      setError("Failed to submit feedback. Please try again later.");
    }
  };

  return (
    <div className={styles.container}>

      <Card>
        <h2>Feedback</h2>
        <p>We value your feedback!</p>
        <form onSubmit={handleSubmit}>
          <Textarea 
            id="feedback"
            placeholder="Please enter your feedback here"
            ref={ descriptionRef }
            required
          />
          {/* <br /> */}
          <Button type="submit">Submit Feedback</Button>
          {message && <p style={{ color: "green" }}>{message}</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
      </Card>
    </div>
  );
};

export default Feedback;