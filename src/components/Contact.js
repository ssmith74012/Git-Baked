const Contact = () => {
  return (
    <div>
      <h1>Contact Us</h1>
      <form className="contact-us">
        <input
          placeholder="Enter Email"
          type="text"
          className="contact-email"
        ></input>
        <input
          placeholder="Give us your feedback!"
          type="text"
          className="contact-message"
        ></input>
        <button type="submit" className="contact-submitBTN">
          Send Message
        </button>
      </form>
    </div>
  );
};
export default Contact;
