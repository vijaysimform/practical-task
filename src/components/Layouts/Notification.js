const Notification = (props) => {
  let specialClasses = '';

  if (props.status === 'error') {
    specialClasses = "error";
  }
  if (props.status === 'success') {
    specialClasses = "success";
  }

  const cssClasses = `notification ${specialClasses}`;

  return (
    <section className={cssClasses}>
      <p>{props.message}</p>
    </section>
  );
};

export default Notification;