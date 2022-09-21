const Notification = (props) => {
  const cssClasses = `notification ${props.status}`;

  return (
    <section className={cssClasses}>
      <p>{props.message}</p>
    </section>
  );
};

export default Notification;